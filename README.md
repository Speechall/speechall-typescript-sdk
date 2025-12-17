# Speechall TypeScript SDK

[![npm version](https://img.shields.io/npm/v/@speechall/sdk.svg)](https://www.npmjs.com/package/@speechall/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official TypeScript SDK for [Speechall](https://speechall.com) - A powerful speech-to-text API with support for multiple providers and advanced features like speaker diarization, custom vocabulary, and replacement rules.

## Features

- Support for multiple speech-to-text providers (OpenAI Whisper, Deepgram, AssemblyAI, RevAI, Amazon Transcribe, and more)
- Speaker diarization
- Custom vocabulary and replacement rules
- Multiple output formats (text, JSON, SRT, VTT)
- Word-level and segment-level timestamps
- TypeScript support with full type definitions

## Installation

```bash
npm install @speechall/sdk
```

Or using other package managers:

```bash
yarn add @speechall/sdk
# or
pnpm add @speechall/sdk
```

## Quick Start

```typescript
import { SpeechallClient } from '@speechall/sdk';
import fs from 'fs';

// Initialize the client with your API token
const client = new SpeechallClient({
  token: 'your-api-token',
});

// Transcribe an audio file
async function transcribeAudio() {
  const audioFile = fs.createReadStream('./audio.mp3');

  const result = await client.speechToText.transcribe(audioFile, {
    model: 'openai.whisper-1',
    language: 'en',
    output_format: 'json',
  });

  console.log('Transcription:', result.text);
}

transcribeAudio();
```

## Configuration Options

### Client Options

```typescript
const client = new SpeechallClient({
  // Required: Your API token for authentication
  token: 'your-api-token',

  // Optional: Custom base URL for self-hosted or custom endpoints
  baseUrl: 'https://api.speechall.com/v1',

  // Optional: Default timeout for requests in seconds (default: 60)
  timeoutInSeconds: 120,

  // Optional: Maximum number of retries for failed requests (default: 2)
  maxRetries: 3,

  // Optional: Additional headers to include in all requests
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

## API Reference

### Speech-to-Text API

#### Transcribe Audio File

Transcribe a local audio file:

```typescript
import { SpeechallClient } from '@speechall/sdk';
import fs from 'fs';

const client = new SpeechallClient({ token: 'your-api-token' });

const result = await client.speechToText.transcribe(
  fs.createReadStream('./audio.mp3'),
  {
    model: 'openai.whisper-1',
    language: 'en',
    output_format: 'json',
    punctuation: true,
    timestamp_granularity: 'word', // 'word' or 'segment'
  }
);

console.log(result.text);
console.log(result.segments); // Time-coded segments
console.log(result.words);    // Word-level timestamps
```

#### Transcribe Remote Audio URL

Transcribe an audio file from a URL:

```typescript
const result = await client.speechToText.transcribeRemote({
  model: 'openai.whisper-1',
  language: 'en',
  output_format: 'json',
  diarization: true, // Enable speaker identification
  file_url: 'https://example.com/path/to/audio.mp3',
});
```

#### List Available Models

Get all available speech-to-text models and their capabilities:

```typescript
const models = await client.speechToText.listSpeechToTextModels();

models.forEach(model => {
  console.log(`${model.identifier}: ${model.name}`);
  console.log(`  Supported languages: ${model.supported_languages?.join(', ')}`);
  console.log(`  Supports diarization: ${model.supports_diarization}`);
});
```

### Advanced Features

#### Speaker Diarization

Identify different speakers in the audio:

```typescript
const result = await client.speechToText.transcribe(audioFile, {
  model: 'deepgram.nova-2',
  language: 'en',
  output_format: 'json',
  diarization: true,
  speakers_expected: 2, // Optional: hint about number of speakers
});

// Access speaker information in segments
result.segments?.forEach(segment => {
  console.log(`Speaker ${segment.speaker}: ${segment.text}`);
});
```

#### Custom Vocabulary

Improve recognition of specific words or phrases:

```typescript
const result = await client.speechToText.transcribe(audioFile, {
  model: 'deepgram.nova-2',
  language: 'en',
  custom_vocabulary: ['Speechall', 'API', 'TypeScript SDK'],
});
```

#### Using an Initial Prompt

Guide the model's style or provide context:

```typescript
const result = await client.speechToText.transcribe(audioFile, {
  model: 'openai.whisper-1',
  language: 'en',
  initial_prompt: 'This is a technical discussion about machine learning and AI.',
});
```

### Replacement Rules

Create and use replacement rulesets to automatically modify transcription output:

```typescript
// Create a replacement ruleset
const ruleset = await client.replacementRules.create({
  name: 'Acme Corp Corrections',
  rules: [
    {
      kind: 'exact',
      search: 'customer X',
      replacement: '[REDACTED CUSTOMER NAME]',
    },
    {
      kind: 'regex',
      pattern: '\\b\\d{4}\\b',
      replacement: '[REDACTED YEAR]',
    },
    {
      kind: 'regex_group',
      pattern: '(API)\\s+(key)',
      replacement: '$1 token',
    },
  ],
});

console.log('Ruleset ID:', ruleset.id);

// Use the ruleset in transcription
const result = await client.speechToText.transcribe(audioFile, {
  model: 'openai.whisper-1',
  language: 'en',
  ruleset_id: ruleset.id,
});
```

## Error Handling

The SDK provides specific error types for different HTTP status codes:

```typescript
import {
  SpeechallClient,
  SpeechallError,
  SpeechallTimeoutError,
  Speechall
} from '@speechall/sdk';

const client = new SpeechallClient({ token: 'your-api-token' });

try {
  const result = await client.speechToText.transcribe(audioFile, {
    model: 'openai.whisper-1',
  });
  console.log(result.text);
} catch (error) {
  if (error instanceof Speechall.UnauthorizedError) {
    console.error('Invalid API token');
  } else if (error instanceof Speechall.PaymentRequiredError) {
    console.error('Insufficient credits');
  } else if (error instanceof Speechall.TooManyRequestsError) {
    console.error('Rate limit exceeded');
  } else if (error instanceof Speechall.BadRequestError) {
    console.error('Invalid request:', error.message);
  } else if (error instanceof SpeechallTimeoutError) {
    console.error('Request timed out');
  } else if (error instanceof SpeechallError) {
    console.error('API error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Available Error Types

- `BadRequestError` (400) - Invalid request parameters
- `UnauthorizedError` (401) - Invalid or missing API token
- `PaymentRequiredError` (402) - Insufficient credits
- `NotFoundError` (404) - Resource not found
- `TooManyRequestsError` (429) - Rate limit exceeded
- `InternalServerError` (500) - Server error
- `ServiceUnavailableError` (503) - Service temporarily unavailable
- `GatewayTimeoutError` (504) - Gateway timeout
- `SpeechallTimeoutError` - Request timeout
- `SpeechallError` - Base error class for all other errors

## Request-Specific Options

You can override client-level configuration for individual requests:

```typescript
const result = await client.speechToText.transcribe(
  audioFile,
  {
    model: 'openai.whisper-1',
  },
  {
    timeoutInSeconds: 180,
    maxRetries: 5,
    headers: {
      'X-Request-ID': 'custom-request-id',
    },
  }
);
```

## TypeScript Support

The SDK is fully typed with TypeScript definitions. All types are exported and can be imported:

```typescript
import {
  SpeechallClient,
  Speechall,
  type SpeechallClient as SpeechallClientTypes
} from '@speechall/sdk';

// Access types
type TranscriptionResponse = Speechall.TranscriptionResponse;
type TranscribeRequest = Speechall.TranscribeRequest;
type SpeechToTextModel = Speechall.SpeechToTextModel;
type ClientOptions = SpeechallClientTypes.Options;
```

## Supported Audio Formats

- MP3
- MP4
- MPEG
- MPGA
- M4A
- WAV
- WEBM
- OGG
- FLAC

Note: Actual format support may vary by provider. Check the model capabilities using `listSpeechToTextModels()`.

## Output Formats

- `text` - Plain text output
- `json` - Detailed JSON with segments and metadata
- `json_text` - Simple JSON with text only
- `srt` - SubRip subtitle format
- `vtt` - WebVTT subtitle format

## Development

### Regenerating the SDK

This SDK is auto-generated using [Fern](https://buildwithfern.com) from the Speechall OpenAPI specification. To regenerate the SDK after API changes:

```bash
./regenerate.sh
```

Or manually:

```bash
# Validate the OpenAPI spec
fern check

# Generate the SDK
fern generate --local --force

# Verify TypeScript compilation
npx tsc --noEmit
```

### Building the SDK

```bash
npm install
npm run build
```

### Running Tests

```bash
npm test
```

## Support

- Documentation: [https://docs.speechall.com](https://docs.speechall.com)
- API Reference: [https://api.speechall.com/docs](https://api.speechall.com/docs)
- GitHub Issues: [https://github.com/Speechall/speechall-typescript-sdk/issues](https://github.com/Speechall/speechall-typescript-sdk/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Note: This SDK is auto-generated. For API changes, please open an issue first to discuss the proposed changes.
