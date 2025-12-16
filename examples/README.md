# Speechall SDK Examples

This directory contains example scripts demonstrating how to use the Speechall TypeScript SDK for speech-to-text transcription.

## Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get your API key from [Speechall](https://speechall.com)

3. Create a `.env` file in the project root and add your API key:
   ```bash
   SPEECHALL_API_KEY=your-api-key-here
   ```

   Or alternatively, set it as an environment variable:
   ```bash
   export SPEECHALL_API_KEY=your-api-key
   ```

## Running Examples

Run any example using ts-node:

```bash
npx ts-node examples/basic-transcription.ts
npx ts-node examples/remote-transcription.ts
npx ts-node examples/advanced-options.ts
npx ts-node examples/error-handling.ts
npx ts-node examples/openai-compatible.ts
```

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

### 5. `openai-compatible.ts`
Using OpenAI-compatible endpoints. Demonstrates:
- Drop-in replacement for OpenAI's Whisper API
- Multipart form-data file uploads
- Translation capabilities

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

## Support

If you encounter any issues or have questions:
- Email: support@speechall.com
- GitHub Issues: https://github.com/Speechall/speechall-typescript-sdk/issues
