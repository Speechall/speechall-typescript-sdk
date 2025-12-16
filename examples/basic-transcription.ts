/**
 * Basic Transcription Example
 *
 * This example demonstrates how to transcribe a local audio file using the Speechall SDK.
 * It shows the simplest way to get started with speech-to-text transcription.
 */

import { SpeechallClient } from '../src/index.js';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  // Initialize the Speechall client with your API token
  const client = new SpeechallClient({
    token: process.env.SPEECHALL_API_KEY!,
  });

  // Path to your audio file
  // Replace this with the path to your actual audio file
  const audioFilePath = path.join(__dirname, 'sample-audio.wav');

  // Check if file exists
  if (!fs.existsSync(audioFilePath)) {
    console.error(`Audio file not found at: ${audioFilePath}`);
    console.error('Please provide a valid audio file path.');
    process.exit(1);
  }

  console.log('Transcribing audio file...');
  console.log(`File: ${audioFilePath}`);

  try {
    // Read the audio file
    const audioFile = fs.createReadStream(audioFilePath);

    // Transcribe the audio using the default settings
    // This will return plain text output
    const response = await client.speechToText.transcribe(
      audioFile,
      {
        model: 'openai.whisper-1', // Using OpenAI's Whisper model
        language: 'en', // English language
        output_format: 'text', // Plain text output
      }
    );

    // Display the transcription result
    console.log('\n--- Transcription Result ---');

    // The response can be either a string (text format) or an object (json format)
    if (typeof response === 'string') {
      console.log(response);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }

  } catch (error) {
    console.error('Transcription failed:');
    console.error(error);
    process.exit(1);
  }
}

// Run the example
main();
