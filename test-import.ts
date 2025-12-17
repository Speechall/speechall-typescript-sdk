// Quick test to verify SDK imports work
import { SpeechallClient } from './dist';

console.log('SDK imported successfully');
console.log('SpeechallClient:', typeof SpeechallClient);

// Test basic client initialization
try {
  const client = new SpeechallClient({
    token: 'test-api-token',
  });
  console.log('Client initialized successfully');
  console.log('Client type:', client.constructor.name);
  console.log('Available methods:', Object.keys(Object.getPrototypeOf(client)));
} catch (error) {
  console.error('Failed to initialize client:', error);
}
