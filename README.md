# Speechall TypeScript SDK

A TypeScript/JavaScript SDK for the Speechall API, providing powerful and flexible speech-to-text capabilities. This SDK allows you to transcribe audio files using various STT providers and models, apply custom text replacement rules, and access results in multiple formats.

## Features

- **Multiple STT Providers**: Access various speech-to-text providers through a unified API
- **Custom Text Replacement**: Apply custom replacement rules to improve transcription accuracy
- **Multiple Output Formats**: Get results in JSON, text, SRT, VTT, or verbose JSON formats
- **OpenAI Compatibility**: Use OpenAI-compatible endpoints for easy migration
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **Promise-based**: Modern async/await support with Axios under the hood

## Installation

```bash
npm install @speechall/sdk
```

## Quick Start

```typescript
import { Configuration, SpeechToTextApi } from '@speechall/sdk';

// Configure the SDK
const config = new Configuration({
  apiKey: 'your-api-key-here',
  basePath: 'https://api.speechall.com' // Replace with actual API base path
});

// Create API instance
const speechApi = new SpeechToTextApi(config);

// Transcribe audio from URL
async function transcribeAudio() {
  try {
    const response = await speechApi.transcribeRemote({
      file_url: 'https://example.com/audio.mp3',
      model: 'deepgram.nova-2-general',
      language: 'en',
      output_format: 'json'
    });
    
    console.log('Transcription:', response.data.text);
  } catch (error) {
    console.error('Transcription failed:', error);
  }
}

transcribeAudio();
```

## API Reference

### Main API Classes

- **SpeechToTextApi**: Core transcription functionality
- **OpenAICompatibleSpeechToTextApi**: OpenAI-compatible endpoints
- **ReplacementRulesApi**: Manage custom text replacement rules

### Configuration

```typescript
const config = new Configuration({
  apiKey: 'your-api-key',           // Your API key
  basePath: 'https://api.speechall.com', // API base URL
  // Optional: custom axios configuration
  baseOptions: {
    timeout: 30000,
    headers: {
      'Custom-Header': 'value'
    }
  }
});
```

### Transcription Options

```typescript
interface TranscriptionOptions {
  file_url: string;                    // Audio file URL
  model: TranscriptionModelIdentifier; // Model to use
  language?: string;                   // Language code (e.g., 'en', 'es')
  output_format?: string;              // 'json', 'text', 'srt', 'vtt'
  punctuation?: boolean;               // Add punctuation
  timestamp_granularity?: string;      // 'word' or 'segment'
  diarization?: boolean;               // Speaker identification
  initial_prompt?: string;             // Transcription hint
  temperature?: number;                // Model randomness (0-1)
  smart_format?: boolean;              // Provider-specific formatting
  speakers_expected?: number;          // Expected number of speakers
  custom_vocabulary?: string[];        // Custom words/phrases
  replacement_ruleset?: ReplacementRule[]; // Custom replacement rules
}
```

## Examples

### Basic Transcription

```typescript
import { Configuration, SpeechToTextApi } from '@speechall/sdk';

const config = new Configuration({ apiKey: 'your-api-key' });
const api = new SpeechToTextApi(config);

const result = await api.transcribeRemote({
  file_url: 'https://example.com/audio.wav',
  model: 'deepgram.nova-2-general'
});

console.log(result.data.text);
```

### File Upload Transcription

```typescript
// For file uploads, you'll need to create a File object
const file = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' });

const result = await api.transcribe(
  'deepgram.nova-2-general', // model
  file,                      // audio file
  'en',                      // language
  'json'                     // output format
);
```

### Advanced Options

```typescript
const result = await api.transcribeRemote({
  file_url: 'https://example.com/meeting.mp3',
  model: 'deepgram.nova-2-meeting',
  language: 'en',
  output_format: 'json',
  diarization: true,           // Identify speakers
  punctuation: true,           // Add punctuation
  timestamp_granularity: 'word', // Word-level timestamps
  speakers_expected: 3,        // Hint for speaker count
  custom_vocabulary: ['API', 'TypeScript', 'Speechall']
});
```

### Custom Replacement Rules

```typescript
import { ReplacementRulesApi } from '@speechall/sdk';

const rulesApi = new ReplacementRulesApi(config);

// Create a replacement ruleset
const ruleset = await rulesApi.createReplacementRuleset({
  name: 'Technical Terms',
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

// Use the ruleset in transcription
const result = await api.transcribeRemote({
  file_url: 'https://example.com/audio.mp3',
  model: 'deepgram.nova-2-general',
  // Reference the created ruleset
  // ruleset_id: ruleset.data.id
});
```

### List Available Models

```typescript
const models = await api.listSpeechToTextModels();

models.data.forEach(model => {
  console.log(`${model.id}: ${model.display_name}`);
  console.log(`  Provider: ${model.provider}`);
  console.log(`  Languages: ${model.supported_languages?.join(', ')}`);
  console.log(`  Cost: $${model.cost_per_second_usd}/second`);
});
```

## Error Handling

```typescript
import { AxiosError } from 'axios';

try {
  const result = await api.transcribeRemote({
    file_url: 'https://example.com/audio.mp3',
    model: 'deepgram.nova-2-general'
  });
} catch (error) {
  if (error instanceof AxiosError) {
    console.error('API Error:', error.response?.data);
    console.error('Status:', error.response?.status);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Types

The SDK includes comprehensive TypeScript types for all API entities:

- `TranscriptionResponse` - Transcription results
- `TranscriptionOptions` - Transcription request options
- `SpeechToTextModel` - Model information
- `ReplacementRule` - Text replacement rules
- `Configuration` - SDK configuration
- And many more...

## Contributing

This SDK is auto-generated from the Speechall OpenAPI specification. Please report issues or feature requests on the [GitHub repository](https://github.com/speechall/speechall-typescript-sdk).

## License

MIT

## Support

For support, please contact [support@speechall.ai](mailto:support@speechall.ai) or visit our [documentation](https://docs.speechall.ai).
