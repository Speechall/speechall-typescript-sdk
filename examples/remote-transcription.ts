/**
 * Remote Transcription Example
 *
 * This example demonstrates how to transcribe an audio file from a publicly accessible URL.
 * This is useful when your audio files are already hosted online (e.g., on S3, CDN, etc.).
 */

import 'dotenv/config';
import { SpeechallClient } from '../src/index';

async function main() {
  // Initialize the Speechall client with your API token
  const client = new SpeechallClient({
    token: process.env.SPEECHALL_API_KEY!,
  });

  // URL of the audio file to transcribe
  // Replace this with your own publicly accessible audio URL
  const audioUrl = 'https://example.com/path/to/audio.mp3';

  console.log('Transcribing remote audio file...');
  console.log(`URL: ${audioUrl}`);

  try {
    // Transcribe the remote audio file
    const response = await client.speechToText.transcribeRemote({
      file_url: audioUrl,
      model: 'openai.whisper-1',
      language: 'en',
      output_format: 'json', // Request JSON output for detailed information
      punctuation: true, // Enable automatic punctuation
    });

    console.log('\n--- Transcription Result ---');

    // When using JSON output format, the response contains detailed information
    if (typeof response === 'string') {
      console.log(response);
    } else {
      // The response object structure depends on the output format
      // For 'json' format, it includes the text and metadata
      console.log('Full response:');
      console.log(JSON.stringify(response, null, 2));

      // If the response has a text property, display it separately
      if ('text' in response) {
        console.log('\n--- Text Only ---');
        console.log(response.text);
      }
    }

  } catch (error) {
    console.error('Transcription failed:');
    console.error(error);
    process.exit(1);
  }
}

// Run the example
main();
