/**
 * Error Handling Example
 *
 * This example demonstrates proper error handling when using the Speechall SDK.
 * It shows how to catch and handle different types of errors that may occur
 * during API calls.
 */

import 'dotenv/config';
import { SpeechallClient, SpeechallError } from '../src/index';
import * as Speechall from '../src/api/index';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('=== Error Handling Examples ===\n');

  // Example 1: Handling authentication errors
  console.log('1. Authentication Error');
  console.log('-----------------------');

  try {
    const clientWithBadToken = new SpeechallClient({
      token: 'invalid-token',
    });

    const audioFile = fs.createReadStream(path.join(__dirname, 'sample-audio.wav'));

    await clientWithBadToken.speechToText.transcribe(
      audioFile,
      {
        model: 'openai.whisper-1',
      }
    );

  } catch (error) {
    if (error instanceof Speechall.UnauthorizedError) {
      console.error('Authentication failed!');
      console.error('Status:', error.statusCode);
      console.error('Message:', error.message);
      console.error('Details:', error.body);
    } else {
      console.error('Unexpected error:', error);
    }
  }
  console.log('\n');

  // Example 2: Handling bad request errors (invalid parameters)
  console.log('2. Bad Request Error');
  console.log('--------------------');

  try {
    const client = new SpeechallClient({
      token: process.env.SPEECHALL_API_KEY!,
    });

    const audioFile = fs.createReadStream(path.join(__dirname, 'sample-audio.wav'));

    // Intentionally use an invalid model to trigger an error
    await client.speechToText.transcribe(
      audioFile,
      {
        model: 'invalid.model' as any,
      }
    );

  } catch (error) {
    if (error instanceof Speechall.BadRequestError) {
      console.error('Bad request!');
      console.error('Status:', error.statusCode);
      console.error('Message:', error.message);
      console.error('Details:', error.body);
    } else if (error instanceof SpeechallError) {
      console.error('API Error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
  console.log('\n');

  // Example 3: Handling rate limit errors
  console.log('3. Rate Limit Error');
  console.log('-------------------');

  try {
    const client = new SpeechallClient({
      token: process.env.SPEECHALL_API_KEY!,
    });

    // Make multiple rapid requests to potentially trigger rate limiting
    // (In real scenarios, you'd implement proper rate limiting on your side)
    const audioFile = fs.createReadStream(path.join(__dirname, 'sample-audio.wav'));

    await client.speechToText.transcribe(
      audioFile,
      {
        model: 'openai.whisper-1',
      }
    );

  } catch (error) {
    if (error instanceof Speechall.TooManyRequestsError) {
      console.error('Rate limit exceeded!');
      console.error('Status:', error.statusCode);
      console.error('Message:', error.message);
      console.error('Please wait before retrying.');
      // In production, implement exponential backoff
    } else {
      console.error('Error:', error);
    }
  }
  console.log('\n');

  // Example 4: Handling file not found errors
  console.log('4. File Not Found Error');
  console.log('-----------------------');

  try {
    const client = new SpeechallClient({
      token: process.env.SPEECHALL_API_KEY!,
    });

    // Try to transcribe a non-existent remote file
    await client.speechToText.transcribeRemote({
      file_url: 'https://dss-kiel.de/images/media_center/signals/lombard/male_0_kmh.mp3',
      model: 'openai.whisper-1',
    });

  } catch (error) {
    if (error instanceof Speechall.NotFoundError) {
      console.error('Resource not found!');
      console.error('Status:', error.statusCode);
      console.error('Message:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
  console.log('\n');

  // Example 5: Comprehensive error handling with retry logic
  console.log('5. Comprehensive Error Handling with Retry');
  console.log('-------------------------------------------');

  await transcribeWithRetry(
    path.join(__dirname, 'sample-audio.wav'),
    3 // Max retries
  );
}

/**
 * Helper function demonstrating retry logic with exponential backoff
 */
async function transcribeWithRetry(
  audioPath: string,
  maxRetries: number = 3
): Promise<void> {
  const client = new SpeechallClient({
    token: process.env.SPEECHALL_API_KEY!,
  });

  let retries = 0;
  let delay = 1000; // Start with 1 second delay

  while (retries < maxRetries) {
    try {
      if (!fs.existsSync(audioPath)) {
        console.log('Audio file not found. Creating a dummy request for demonstration.');
        // For demo purposes, just show the error handling structure
        throw new Error('File not found');
      }

      const audioFile = fs.createReadStream(audioPath);

      const response = await client.speechToText.transcribe(
        audioFile,
        {
          model: 'openai.whisper-1',
          language: 'en',
        }
      );

      console.log('Transcription successful!');
      console.log('Result:', response);
      return; // Success, exit the function

    } catch (error) {
      retries++;

      // Handle different error types
      if (error instanceof Speechall.TooManyRequestsError) {
        console.error(`Rate limited. Retry ${retries}/${maxRetries} after ${delay}ms...`);

        if (retries < maxRetries) {
          await sleep(delay);
          delay *= 2; // Exponential backoff
        }

      } else if (error instanceof Speechall.InternalServerError ||
                 error instanceof Speechall.ServiceUnavailableError ||
                 error instanceof Speechall.GatewayTimeoutError) {
        console.error(`Server error. Retry ${retries}/${maxRetries} after ${delay}ms...`);
        console.error('Error:', error.message);

        if (retries < maxRetries) {
          await sleep(delay);
          delay *= 2; // Exponential backoff
        }

      } else if (error instanceof Speechall.UnauthorizedError) {
        console.error('Authentication failed. Cannot retry.');
        console.error('Please check your API key.');
        throw error; // Don't retry authentication errors

      } else if (error instanceof Speechall.BadRequestError) {
        console.error('Bad request. Cannot retry.');
        console.error('Please check your request parameters.');
        throw error; // Don't retry bad requests

      } else if (error instanceof Speechall.PaymentRequiredError) {
        console.error('Payment required. Cannot retry.');
        console.error('Please check your account billing.');
        throw error; // Don't retry payment errors

      } else if (error instanceof SpeechallError) {
        console.error('API Error:', error.message);
        throw error;

      } else {
        console.error('Unexpected error:', error);
        throw error;
      }
    }
  }

  console.error(`Max retries (${maxRetries}) exceeded. Giving up.`);
  throw new Error('Transcription failed after retries');
}

/**
 * Helper function to sleep for a given duration
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the examples
main().catch(error => {
  console.error('Example script failed:');
  console.error(error);
  process.exit(1);
});
