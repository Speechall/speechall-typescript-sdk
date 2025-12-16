/**
 * OpenAI-Compatible API Example
 *
 * This example demonstrates how to use Speechall's OpenAI-compatible endpoints.
 * These endpoints mimic OpenAI's Whisper API, making it easy to switch from
 * OpenAI to Speechall without changing much code.
 */

import { SpeechallClient } from '../src/index.js';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const client = new SpeechallClient({
    token: process.env.SPEECHALL_API_KEY!,
  });

  console.log('=== OpenAI-Compatible API Examples ===\n');

  // Example 1: Basic transcription using OpenAI-compatible endpoint
  console.log('1. Basic Transcription (OpenAI-compatible)');
  console.log('-------------------------------------------');

  try {
    const audioFilePath = path.join(__dirname, 'sample-audio.wav');

    if (!fs.existsSync(audioFilePath)) {
      console.error(`Audio file not found at: ${audioFilePath}`);
      console.error('Skipping this example...\n');
    } else {
      const audioFile = fs.createReadStream(audioFilePath);

      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranscription({
        file: audioFile,
        model: 'openai.whisper-1', // Use Speechall model identifier
      });

      console.log('Transcription:', response);
      console.log('\n');
    }
  } catch (error) {
    console.error('Example 1 failed:', error);
    console.log('\n');
  }

  // Example 2: Transcription with language and prompt
  console.log('2. Transcription with Language and Prompt');
  console.log('------------------------------------------');

  try {
    const audioFilePath = path.join(__dirname, 'sample-audio.wav');

    if (fs.existsSync(audioFilePath)) {
      const audioFile = fs.createReadStream(audioFilePath);

      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranscription({
        file: audioFile,
        model: 'openai.whisper-1',
        language: 'en', // Specify language
        prompt: 'This is a discussion about technology and APIs.', // Context prompt
      });

      console.log('Transcription:', response);
      console.log('\n');
    }
  } catch (error) {
    console.error('Example 2 failed:', error);
    console.log('\n');
  }

  // Example 3: Transcription with different response formats
  console.log('3. Transcription with JSON Response Format');
  console.log('-------------------------------------------');

  try {
    const audioFilePath = path.join(__dirname, 'sample-audio.wav');

    if (fs.existsSync(audioFilePath)) {
      const audioFile = fs.createReadStream(audioFilePath);

      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranscription({
        file: audioFile,
        model: 'openai.whisper-1',
        response_format: 'json', // Request JSON format
      });

      console.log('JSON Response:');
      console.log(JSON.stringify(response, null, 2));
      console.log('\n');
    }
  } catch (error) {
    console.error('Example 3 failed:', error);
    console.log('\n');
  }

  // Example 4: Transcription with verbose JSON (includes timestamps)
  console.log('4. Transcription with Verbose JSON (Timestamps)');
  console.log('------------------------------------------------');

  try {
    const audioFilePath = path.join(__dirname, 'sample-audio.wav');

    if (fs.existsSync(audioFilePath)) {
      const audioFile = fs.createReadStream(audioFilePath);

      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranscription({
        file: audioFile,
        model: 'openai.whisper-1',
        response_format: 'verbose_json', // Detailed JSON with timestamps
        'timestamp_granularities[]': ['word', 'segment'], // Request word and segment timestamps
      });

      console.log('Verbose JSON Response:');
      console.log(JSON.stringify(response, null, 2));
      console.log('\n');
    }
  } catch (error) {
    console.error('Example 4 failed:', error);
    console.log('\n');
  }

  // Example 5: Transcription with temperature control
  console.log('5. Transcription with Temperature Control');
  console.log('------------------------------------------');

  try {
    const audioFilePath = path.join(__dirname, 'sample-audio.wav');

    if (fs.existsSync(audioFilePath)) {
      const audioFile = fs.createReadStream(audioFilePath);

      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranscription({
        file: audioFile,
        model: 'openai.whisper-1',
        temperature: 0.2, // Lower temperature for more deterministic output (0-1)
      });

      console.log('Transcription:', response);
      console.log('\n');
    }
  } catch (error) {
    console.error('Example 5 failed:', error);
    console.log('\n');
  }

  // Example 6: Translation to English
  console.log('6. Translation to English');
  console.log('-------------------------');

  try {
    const audioFilePath = path.join(__dirname, 'sample-audio.wav');

    if (fs.existsSync(audioFilePath)) {
      const audioFile = fs.createReadStream(audioFilePath);

      // The translation endpoint translates audio from any language to English
      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranslation({
        file: audioFile,
        model: 'openai.whisper-1',
        prompt: 'Technical discussion', // Optional context prompt
      });

      console.log('Translation to English:', response);
      console.log('\n');
    }
  } catch (error) {
    console.error('Example 6 failed:', error);
    console.log('\n');
  }

  // Example 7: Translation with JSON response format
  console.log('7. Translation with JSON Response Format');
  console.log('-----------------------------------------');

  try {
    const audioFilePath = path.join(__dirname, 'sample-audio.wav');

    if (fs.existsSync(audioFilePath)) {
      const audioFile = fs.createReadStream(audioFilePath);

      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranslation({
        file: audioFile,
        model: 'openai.whisper-1',
        response_format: 'verbose_json', // Request detailed JSON with metadata
        temperature: 0.0, // Most deterministic output
      });

      console.log('Translation JSON Response:');
      console.log(JSON.stringify(response, null, 2));
      console.log('\n');
    }
  } catch (error) {
    console.error('Example 7 failed:', error);
    console.log('\n');
  }

  // Example 8: Generate SRT subtitles (OpenAI-compatible)
  console.log('8. Generate SRT Subtitles');
  console.log('-------------------------');

  try {
    const audioFilePath = path.join(__dirname, 'sample-audio.wav');

    if (fs.existsSync(audioFilePath)) {
      const audioFile = fs.createReadStream(audioFilePath);

      const response = await client.openAiCompatibleSpeechToText.openaiCompatibleCreateTranscription({
        file: audioFile,
        model: 'openai.whisper-1',
        response_format: 'srt', // SRT subtitle format
      });

      console.log('SRT Subtitles:');
      console.log(response);
      console.log('\n');
    }
  } catch (error) {
    console.error('Example 8 failed:', error);
    console.log('\n');
  }
}

// Run the examples
main().catch(error => {
  console.error('Example script failed:');
  console.error(error);
  process.exit(1);
});
