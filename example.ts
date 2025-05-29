import { 
  Configuration, 
  SpeechToTextApi, 
  // OpenAICompatibleSpeechToTextApi,
  ReplacementRulesApi,
  TranscriptionOptions,
  TranscriptionModelIdentifier
} from './index';

// Example usage of the Speechall TypeScript SDK
async function main(): Promise<void> {
  // Configure the SDK
  const config = new Configuration({
    apiKey: process.env.SPEECHALL_API_KEY || 'your-api-key-here',
    basePath: 'https://api.speechall.com' // Replace with actual API base path
  });

  // Create API instances
  const speechApi = new SpeechToTextApi(config);
  // const openaiApi = new OpenAICompatibleSpeechToTextApi(config);
  const rulesApi = new ReplacementRulesApi(config);

  try {
    // List available models
    console.log('Fetching available models...');
    const models = await speechApi.listSpeechToTextModels();
    console.log('Available models:');
    models.data.slice(0, 3).forEach(model => {
      console.log(`  - ${model.id}: ${model.display_name} (${model.provider})`);
      console.log(`    Languages: ${model.supported_languages?.join(', ')}`);
      console.log(`    Cost: $${model.cost_per_second_usd}/second\n`);
    });

    // Example 1: Basic transcription
    console.log('Example 1: Basic transcription...');
    const basicOptions: TranscriptionOptions = {
      file_url: 'https://example.com/sample-audio.mp3',
      model: TranscriptionModelIdentifier.DeepgramNova2General,
      language: 'en',
      output_format: 'json'
    };

    const basicResult = await speechApi.transcribeRemote(basicOptions);
    console.log('Basic transcription:', basicResult.data.text);

    // Example 2: Advanced transcription with options
    console.log('\nExample 2: Advanced transcription...');
    const advancedOptions: TranscriptionOptions = {
      file_url: 'https://example.com/meeting-audio.mp3',
      model: TranscriptionModelIdentifier.DeepgramNova2Meeting,
      language: 'en',
      output_format: 'json',
      diarization: true,
      punctuation: true,
      timestamp_granularity: 'word',
      speakers_expected: 3,
      custom_vocabulary: ['API', 'TypeScript', 'Speechall']
    };

    const advancedResult = await speechApi.transcribeRemote(advancedOptions);
    console.log('Advanced transcription:', advancedResult.data.text);

    // Example 3: Custom replacement rules
    console.log('\nExample 3: Creating replacement rules...');
    const rulesetResponse = await rulesApi.createReplacementRuleset({
      name: 'Technical Terms Enhancement',
      rules: [
        {
          kind: 'exact',
          search: 'API',
          replacement: 'A.P.I.',
          caseSensitive: false
        },
        {
          kind: 'regex',
          pattern: '\\b(\\d+)\\s*dollars?\\b',
          replacement: '$$$1',
          flags: ['i']
        }
      ]
    });

    console.log('Created ruleset with ID:', rulesetResponse.data.id);

    // Example 4: OpenAI-compatible endpoint
    console.log('\nExample 4: OpenAI-compatible transcription...');
    // Note: This would require a File object in a real implementation
    // const file = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' });
    // const openaiResult = await openaiApi.openaiCompatibleCreateTranscription(
    //   file,
    //   TranscriptionModelIdentifier.DeepgramNova2General,
    //   'en',
    //   'Transcribe this audio file',
    //   'json',
    //   0.2
    // );
    console.log('OpenAI-compatible endpoint would be used here with file upload');

    // Example 5: Direct file upload transcription
    console.log('\nExample 5: Direct file upload transcription...');
    // This example shows how to transcribe a local file or file from HTML form
    // In a real browser environment, you might get the file from:
    // const fileInput = document.getElementById('audio-file') as HTMLInputElement;
    // const file = fileInput.files[0];
    
    // For this example, we'll simulate creating a File object
    // In practice, you'd have actual audio data from a file input or local file
    try {
      // Simulating file creation - in real use, you'd have actual audio data
      const audioData = new Uint8Array(1024); // Placeholder for actual audio data
      const audioFile = new File([audioData], 'sample-audio.wav', { 
        type: 'audio/wav' 
      });

      console.log('Transcribing uploaded file:', audioFile.name);
      
      const fileResult = await speechApi.transcribe(
        TranscriptionModelIdentifier.DeepgramNova2General, // model
        audioFile,                 // File object
        'en',                     // language
        'json',                   // output format
        undefined,                // ruleset_id
        true,                     // punctuation
        'word',                   // timestamp granularity
        false,                    // diarization
        'Please transcribe this audio file clearly', // initial prompt
        0.1                       // temperature
      );

      console.log('Direct file transcription result:', fileResult.data);
    } catch (error: any) {
      console.log('File transcription example (simulated file):', error.message);
      console.log('In a real implementation, you would provide actual audio file data');
    }

    // Example of how you might handle file input in a browser environment:
    console.log('\n--- Browser File Input Example ---');
    console.log(`
// HTML:
// <input type="file" id="audioFile" accept="audio/*" />
// <button onclick="transcribeFile()">Transcribe</button>

async function transcribeFile() {
  const fileInput = document.getElementById('audioFile') as HTMLInputElement;
  const file = fileInput.files?.[0];
  
  if (!file) {
    alert('Please select an audio file');
    return;
  }

  try {
    const result = await speechApi.transcribe(
      TranscriptionModelIdentifier.DeepgramNova2General,
      file,
      'en',
      'json',
      undefined, // no ruleset
      true,      // punctuation
      'segment', // timestamp granularity
      true,      // diarization
      'Transcribe this uploaded audio file' // prompt
    );
    
    console.log('Transcription:', result.data.text);
    
    // Handle detailed response if format is 'json'
    if ('segments' in result.data) {
      result.data.segments?.forEach((segment, index) => {
        console.log(\`Segment \${index + 1}: \${segment.text}\`);
        if (segment.speaker) {
          console.log(\`  Speaker: \${segment.speaker}\`);
        }
        if (segment.start && segment.end) {
          console.log(\`  Time: \${segment.start}s - \${segment.end}s\`);
        }
      });
    }
  } catch (error) {
    console.error('Transcription failed:', error);
  }
}
    `);

  } catch (error: any) {
    console.error('Error occurred:', error.response?.data || error.message);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { main as example }; 