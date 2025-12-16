/**
 * Advanced Options Example
 *
 * This example demonstrates how to use advanced transcription features including:
 * - Speaker diarization (identifying different speakers)
 * - Word-level timestamps
 * - Custom vocabulary
 * - Temperature control
 * - Initial prompts for context
 * - Different output formats (SRT, VTT)
 */

import 'dotenv/config';
import { SpeechallClient } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const client = new SpeechallClient({
    token: process.env.SPEECHALL_API_KEY!,
  });

  const audioFilePath = path.join(__dirname, 'sample-audio.wav');

  if (!fs.existsSync(audioFilePath)) {
    console.error(`Audio file not found at: ${audioFilePath}`);
    console.error('Please provide a valid audio file path.');
    process.exit(1);
  }

  console.log('=== Advanced Transcription Examples ===\n');

  // Example 1: Transcription with speaker diarization and word-level timestamps
  console.log('1. Transcription with Speaker Diarization and Word Timestamps');
  console.log('-----------------------------------------------------------');

  try {
    const audioFile1 = fs.createReadStream(audioFilePath);

    const response1 = await client.speechToText.transcribe(
      audioFile1,
      {
        model: 'deepgram.nova-2', // Deepgram supports advanced features
        language: 'en',
        output_format: 'json', // Detailed output with timestamps
        diarization: true, // Enable speaker identification
        timestamp_granularity: 'word', // Word-level timestamps (vs 'segment')
        punctuation: true,
      }
    );

    console.log('Result:', JSON.stringify(response1, null, 2));
    console.log('\n');

  } catch (error) {
    console.error('Example 1 failed:', error);
  }

  // Example 2: Using custom vocabulary for better recognition
  console.log('2. Transcription with Custom Vocabulary');
  console.log('----------------------------------------');

  try {
    const audioFile2 = fs.createReadStream(audioFilePath);

    const response2 = await client.speechToText.transcribe(
      audioFile2,
      {
        model: 'assemblyai.best',
        language: 'en',
        output_format: 'json',
        // Provide domain-specific words for better recognition
        custom_vocabulary: ['Speechall', 'API', 'TypeScript', 'SDK'],
        punctuation: true,
      }
    );

    console.log('Result:', JSON.stringify(response2, null, 2));
    console.log('\n');

  } catch (error) {
    console.error('Example 2 failed:', error);
  }

  // Example 3: Using initial prompt for context and style
  console.log('3. Transcription with Initial Prompt (Context)');
  console.log('-----------------------------------------------');

  try {
    const audioFile3 = fs.createReadStream(audioFilePath);

    const response3 = await client.speechToText.transcribe(
      audioFile3,
      {
        model: 'openai.whisper-1',
        language: 'en',
        output_format: 'text',
        // Provide context to improve accuracy and style
        initial_prompt: 'This is a technical discussion about software development and APIs.',
        temperature: 0.2, // Lower temperature for more deterministic output
      }
    );

    console.log('Result:', response3);
    console.log('\n');

  } catch (error) {
    console.error('Example 3 failed:', error);
  }

  // Example 4: Generate SRT subtitles
  console.log('4. Generate SRT Subtitles');
  console.log('-------------------------');

  try {
    const audioFile4 = fs.createReadStream(audioFilePath);

    const response4 = await client.speechToText.transcribe(
      audioFile4,
      {
        model: 'openai.whisper-1',
        language: 'en',
        output_format: 'srt', // SRT subtitle format
      }
    );

    console.log('SRT Output:');
    console.log(response4);
    console.log('\n');

    // You can save this to a file
    // fs.writeFileSync('subtitles.srt', response4 as string);

  } catch (error) {
    console.error('Example 4 failed:', error);
  }

  // Example 5: Generate VTT subtitles
  console.log('5. Generate VTT Subtitles');
  console.log('-------------------------');

  try {
    const audioFile5 = fs.createReadStream(audioFilePath);

    const response5 = await client.speechToText.transcribe(
      audioFile5,
      {
        model: 'openai.whisper-1',
        language: 'en',
        output_format: 'vtt', // WebVTT subtitle format
      }
    );

    console.log('VTT Output:');
    console.log(response5);
    console.log('\n');

  } catch (error) {
    console.error('Example 5 failed:', error);
  }

  // Example 6: Using smart formatting (Deepgram feature)
  console.log('6. Transcription with Smart Formatting');
  console.log('---------------------------------------');

  try {
    const audioFile6 = fs.createReadStream(audioFilePath);

    const response6 = await client.speechToText.transcribe(
      audioFile6,
      {
        model: 'deepgram.nova-2',
        language: 'en',
        output_format: 'json',
        smart_format: true, // Format numbers, dates, currency, etc.
        punctuation: true,
      }
    );

    console.log('Result:', JSON.stringify(response6, null, 2));
    console.log('\n');

  } catch (error) {
    console.error('Example 6 failed:', error);
  }

  // Example 7: Specify expected number of speakers
  console.log('7. Transcription with Expected Speaker Count');
  console.log('---------------------------------------------');

  try {
    const audioFile7 = fs.createReadStream(audioFilePath);

    const response7 = await client.speechToText.transcribe(
      audioFile7,
      {
        model: 'deepgram.nova-2',
        language: 'en',
        output_format: 'json',
        diarization: true,
        speakers_expected: 2, // Hint: expect 2 speakers in the audio
      }
    );

    console.log('Result:', JSON.stringify(response7, null, 2));

  } catch (error) {
    console.error('Example 7 failed:', error);
  }
}

// Run the examples
main();
