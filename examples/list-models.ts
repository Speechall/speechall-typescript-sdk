/**
 * List Available Models Example
 *
 * This example demonstrates how to retrieve and display all available
 * speech-to-text models from the Speechall API.
 * Use this to discover what models are available and their capabilities.
 */

import { SpeechallClient } from '../src/index.js';

async function main() {
  // Initialize the Speechall client with your API token
  const client = new SpeechallClient({
    token: process.env.SPEECHALL_API_KEY!,
  });

  console.log('Fetching available speech-to-text models...\n');

  try {
    // Get the list of all available models
    const models = await client.speechToText.listSpeechToTextModels();

    console.log(`Found ${models.length} available models:\n`);
    console.log('='.repeat(80));

    // Display each model's information
    models.forEach((model, index) => {
      console.log(`\n${index + 1}. ${model.display_name}`);
      console.log('-'.repeat(80));

      // Display model identifier
      if (model.id) {
        console.log(`   Identifier: ${model.id}`);
      }

      // Display provider
      if (model.provider) {
        console.log(`   Provider: ${model.provider}`);
      }

      // Display description
      if (model.description) {
        console.log(`   Description: ${model.description}`);
      }

      // Display supported languages
      if (model.supported_languages && Array.isArray(model.supported_languages)) {
        console.log(`   Supported Languages: ${model.supported_languages.join(', ')}`);
      }

      // Display cost
      if (model.cost_per_second_usd) {
        console.log(`   Cost per second: $${model.cost_per_second_usd}`);
      }

      // Display availability
      console.log(`   Available: ${model.is_available ? 'Yes' : 'No'}`);

      // Display feature support
      console.log('   Features:');

      if (typeof model.punctuation === 'boolean') {
        console.log(`     - Punctuation: ${model.punctuation ? 'Yes' : 'No'}`);
      }

      if (typeof model.diarization === 'boolean') {
        console.log(`     - Speaker Diarization: ${model.diarization ? 'Yes' : 'No'}`);
      }

      if (typeof model.word_timestamps === 'boolean') {
        console.log(`     - Word Timestamps: ${model.word_timestamps ? 'Yes' : 'No'}`);
      }

      if (typeof model.custom_vocabulary_support === 'boolean') {
        console.log(`     - Custom Vocabulary: ${model.custom_vocabulary_support ? 'Yes' : 'No'}`);
      }

      if (typeof model.streamable === 'boolean') {
        console.log(`     - Streamable: ${model.streamable ? 'Yes' : 'No'}`);
      }

      // Display subtitle format support
      console.log(`     - SRT Format: ${model.supports_srt ? 'Yes' : 'No'}`);
      console.log(`     - VTT Format: ${model.supports_vtt ? 'Yes' : 'No'}`);

      // Display performance characteristics
      if (model.real_time_factor) {
        console.log(`   Real-time Factor: ${model.real_time_factor}x`);
      }

      if (model.accuracy_tier) {
        console.log(`   Accuracy Tier: ${model.accuracy_tier}`);
      }

      if (model.model_type) {
        console.log(`   Model Type: ${model.model_type}`);
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log('\nTo use a model, reference it by its identifier (e.g., "openai.whisper-1")');

  } catch (error) {
    console.error('Failed to fetch models:');
    console.error(error);
    process.exit(1);
  }
}

// Run the example
main();
