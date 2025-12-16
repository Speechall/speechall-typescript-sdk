import { SpeechallClient } from '../../src';
import * as fs from 'fs';
import * as path from 'path';

// Skip integration tests if no API token is provided
const runIntegration = process.env.SPEECHALL_API_TOKEN !== undefined;
const describeIntegration = runIntegration ? describe : describe.skip;

describeIntegration('API Integration Tests', () => {
  let client: SpeechallClient;

  beforeAll(() => {
    client = new SpeechallClient({
      token: process.env.SPEECHALL_API_TOKEN!,
    });
  });

  describe('SpeechToText API', () => {
    it('should transcribe audio file', async () => {
      // This test requires an actual audio file and API token
      // Skip if no audio fixture is available
      const audioPath = path.join(__dirname, '../fixtures/audio-sample.wav');

      if (!fs.existsSync(audioPath)) {
        console.log('Skipping: No audio fixture available');
        return;
      }

      const audioBuffer = fs.readFileSync(audioPath);
      const audioFile = new File([audioBuffer], 'audio-sample.wav', {
        type: 'audio/wav',
      });

      const response = await client.speechToText.transcribe(
        audioFile,
        {
          model: 'openai.whisper-1',
        }
      );

      expect(response).toBeDefined();
      // Add more specific assertions based on your API response structure
    }, 30000); // 30 second timeout for API calls

    it('should list available speech-to-text models', async () => {
      const models = await client.speechToText.listSpeechToTextModels();

      expect(models).toBeDefined();
      expect(Array.isArray(models)).toBe(true);
    }, 30000);
  });

  describe('OpenAI Compatible API', () => {
    it('should transcribe using OpenAI-compatible endpoint', async () => {
      const audioPath = path.join(__dirname, '../fixtures/audio-sample.wav');

      if (!fs.existsSync(audioPath)) {
        console.log('Skipping: No audio fixture available');
        return;
      }

      const audioBuffer = fs.readFileSync(audioPath);
      const audioFile = new File([audioBuffer], 'audio-sample.wav', {
        type: 'audio/wav',
      });

      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranscription({
        file: audioFile,
        model: 'openai.whisper-1',
      });

      expect(response).toBeDefined();
    }, 30000);

    it('should translate using OpenAI-compatible endpoint', async () => {
      const audioPath = path.join(__dirname, '../fixtures/audio-sample.wav');

      if (!fs.existsSync(audioPath)) {
        console.log('Skipping: No audio fixture available');
        return;
      }

      const audioBuffer = fs.readFileSync(audioPath);
      const audioFile = new File([audioBuffer], 'audio-sample.wav', {
        type: 'audio/wav',
      });

      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranslation({
        file: audioFile,
        model: 'openai.whisper-1',
      });

      expect(response).toBeDefined();
    }, 30000);
  });

  describe('Replacement Rules API', () => {
    it('should create replacement ruleset', async () => {
      const ruleset = await client.replacementRules.createReplacementRuleset({
        name: 'Test Ruleset',
        rules: [
          {
            kind: 'exact',
            search: 'test',
            replacement: 'TEST',
          },
        ],
      });

      expect(ruleset).toBeDefined();
      expect(ruleset.id).toBeDefined();
    });
  });
});

// Mock integration tests that always run
describe('API Integration Tests (Mocked)', () => {
  let client: SpeechallClient;

  beforeEach(() => {
    client = new SpeechallClient({
      token: 'mock-api-token',
    });
  });

  it('should have speechToText client available', () => {
    expect(client.speechToText).toBeDefined();
    expect(typeof client.speechToText.transcribe).toBe('function');
    expect(typeof client.speechToText.transcribeRemote).toBe('function');
    expect(typeof client.speechToText.listSpeechToTextModels).toBe('function');
  });

  it('should have openAiCompatibleSpeechToText client available', () => {
    expect(client.openAiCompatibleSpeechToText).toBeDefined();
    expect(typeof client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranscription).toBe('function');
    expect(typeof client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranslation).toBe('function');
  });

  it('should have replacementRules client available', () => {
    expect(client.replacementRules).toBeDefined();
    expect(typeof client.replacementRules.createReplacementRuleset).toBe('function');
  });
});
