# Speechall SDK Examples

This directory contains example scripts demonstrating how to use the Speechall TypeScript SDK for speech-to-text transcription.

## Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the SDK (required before running examples):
   ```bash
   npm run build
   ```

3. Get your API key from [Speechall](https://speechall.com)

4. Create a `.env` file in the project root and add your API key:
   ```bash
   SPEECHALL_API_KEY=your-api-key-here
   ```

   Or alternatively, set it as an environment variable:
   ```bash
   export SPEECHALL_API_KEY=your-api-key
   ```

## Running Examples

Run any example using `tsx` (not `ts-node`):

```bash
npx tsx examples/basic-transcription.ts
npx tsx examples/remote-transcription.ts
npx tsx examples/advanced-options.ts
npx tsx examples/error-handling.ts
npx tsx examples/list-models.ts
```

**Note:** We use `tsx` instead of `ts-node` because the SDK uses `.js` extensions in TypeScript imports for ESM compatibility. `tsx` handles these extensions correctly, while `ts-node` will fail with "Cannot find module" errors.

## Examples Overview

### 1. `basic-transcription.ts`
Simple transcription of a local audio file. Demonstrates:
- Basic client initialization with API token
- Transcribing a local audio file
- Getting text output

### 2. `remote-transcription.ts`
Transcribing an audio file from a URL. Demonstrates:
- Transcribing remote audio files
- Using JSON output format
- Accessing detailed transcription data

### 3. `advanced-options.ts`
Using advanced transcription features. Demonstrates:
- Language specification
- Custom output formats (JSON, SRT, VTT)
- Timestamp granularity (word-level vs segment-level)
- Speaker diarization
- Custom vocabulary
- Temperature and prompts

### 4. `error-handling.ts`
Proper error handling patterns. Demonstrates:
- Catching and handling SDK-specific errors
- Error types (BadRequestError, UnauthorizedError, etc.)
- Accessing error details and status codes

## Audio File Requirements

The Speechall API supports various audio formats including:
- WAV, MP3, FLAC, OGG, M4A
- Sample rate: 8kHz to 48kHz recommended
- Channels: Mono or stereo

For testing, you can:
1. Use your own audio files
2. Download sample audio from [Speechall Documentation](https://docs.speechall.com)
3. Record a short audio clip using your device

## Available Models

To see all available models and their capabilities:

```typescript
import { SpeechallClient } from 'speechall';

const client = new SpeechallClient({ token: process.env.SPEECHALL_API_KEY! });
const models = await client.speechToText.listSpeechToTextModels();
console.log(models);
```

Popular models include:
- `openai.whisper-1` - OpenAI's Whisper model
- `amazon.transcribe` - Amazon Transcribe
- `deepgram.nova-2` - Deepgram Nova 2
- `assemblyai.best` - AssemblyAI's best model

## Documentation

For complete API documentation, visit:
- [Speechall API Documentation](https://docs.speechall.com)
- [GitHub Repository](https://github.com/Speechall/speechall-typescript-sdk)

## Troubleshooting

### "Cannot find module './api/index.js'" Error

If you see this error when running examples:
```
Error: Cannot find module './api/index.js'
```

**Solution:**
1. Make sure you've built the SDK first: `npm run build`
2. Use `npx tsx` instead of `npx ts-node` to run examples
3. The SDK uses `.js` extensions in imports for ESM compatibility, which `tsx` handles correctly

### "SPEECHALL_API_KEY is not defined" Error

**Solution:**
- Create a `.env` file in the project root with your API key
- Or set the environment variable: `export SPEECHALL_API_KEY=your-api-key`

### Example Uses Fake/Placeholder URLs

Some examples (like `remote-transcription.ts`) use placeholder URLs like `https://example.com/path/to/audio.mp3`. Replace these with real audio file URLs for testing.

## Support

If you encounter any issues or have questions:
- Email: support@speechall.com
- GitHub Issues: https://github.com/Speechall/speechall-typescript-sdk/issues
