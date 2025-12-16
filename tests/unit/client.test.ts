import { SpeechallClient, SpeechallError } from '../../src';

describe('SpeechallClient', () => {
  describe('initialization', () => {
    it('should initialize with token', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
      });
      expect(client).toBeDefined();
      expect(client).toBeInstanceOf(SpeechallClient);
    });

    it('should initialize with token as a function', () => {
      const client = new SpeechallClient({
        token: () => 'test-api-token',
      });
      expect(client).toBeDefined();
      expect(client).toBeInstanceOf(SpeechallClient);
    });

    it('should expose speechToText client', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
      });
      expect(client.speechToText).toBeDefined();
    });

    it('should expose openAiCompatibleSpeechToText client', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
      });
      expect(client.openAiCompatibleSpeechToText).toBeDefined();
    });

    it('should expose replacementRules client', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
      });
      expect(client.replacementRules).toBeDefined();
    });
  });

  describe('configuration', () => {
    it('should accept custom baseUrl', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
        baseUrl: 'https://custom-api.example.com',
      });
      expect(client).toBeDefined();
    });

    it('should accept custom headers', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
        headers: {
          'X-Custom-Header': 'custom-value',
        },
      });
      expect(client).toBeDefined();
    });

    it('should accept timeout configuration', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
        timeoutInSeconds: 30,
      });
      expect(client).toBeDefined();
    });

    it('should accept maxRetries configuration', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
        maxRetries: 5,
      });
      expect(client).toBeDefined();
    });
  });

  describe('lazy initialization', () => {
    it('should lazily initialize speechToText client', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
      });
      const firstAccess = client.speechToText;
      const secondAccess = client.speechToText;
      expect(firstAccess).toBe(secondAccess);
    });

    it('should lazily initialize openAiCompatibleSpeechToText client', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
      });
      const firstAccess = client.openAiCompatibleSpeechToText;
      const secondAccess = client.openAiCompatibleSpeechToText;
      expect(firstAccess).toBe(secondAccess);
    });

    it('should lazily initialize replacementRules client', () => {
      const client = new SpeechallClient({
        token: 'test-api-token',
      });
      const firstAccess = client.replacementRules;
      const secondAccess = client.replacementRules;
      expect(firstAccess).toBe(secondAccess);
    });
  });
});
