const { Configuration, SpeechToTextApi } = require('@speechall/sdk');

// Example usage of the Speechall TypeScript SDK
async function example() {
  // Configure the SDK
  const config = new Configuration({
    apiKey: process.env.SPEECHALL_API_KEY || 'your-api-key-here',
    basePath: 'https://api.speechall.com' // Replace with actual API base path
  });

  // Create API instance
  const speechApi = new SpeechToTextApi(config);

  try {
    // List available models
    console.log('Fetching available models...');
    const models = await speechApi.listSpeechToTextModels();
    console.log('Available models:');
    models.data.slice(0, 3).forEach(model => {
      console.log(`  - ${model.id}: ${model.display_name} (${model.provider})`);
    });

    // Transcribe audio from URL
    console.log('\nTranscribing audio...');
    const response = await speechApi.transcribeRemote({
      file_url: 'https://example.com/sample-audio.mp3', // Replace with actual audio URL
      model: 'deepgram.nova-2-general',
      language: 'en',
      output_format: 'json',
      punctuation: true
    });
    
    console.log('Transcription result:', response.data.text);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  example();
}

module.exports = { example }; 