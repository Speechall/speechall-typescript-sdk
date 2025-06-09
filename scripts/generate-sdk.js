#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OPENAPI_URL = 'https://raw.githubusercontent.com/Speechall/speechall-openapi/refs/heads/main/openapi.yaml';
const TEMP_SPEC_FILE = 'temp-openapi.yaml';

async function downloadOpenAPISpec() {
  console.log('📥 Downloading OpenAPI specification...');
  
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(TEMP_SPEC_FILE);
    
    https.get(OPENAPI_URL, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download OpenAPI spec: HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('✅ OpenAPI specification downloaded successfully');
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(TEMP_SPEC_FILE, () => {}); // Delete temp file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function generateSDK() {
  console.log('🔧 Generating TypeScript SDK...');
  
  try {
    execSync(`openapi-generator generate -i ${TEMP_SPEC_FILE} -g typescript-axios -o .`, {
      stdio: 'inherit'
    });
    console.log('✅ SDK generated successfully');
  } catch (error) {
    console.error('❌ Failed to generate SDK:', error.message);
    process.exit(1);
  }
}

function cleanup() {
  console.log('🧹 Cleaning up temporary files...');
  
  if (fs.existsSync(TEMP_SPEC_FILE)) {
    fs.unlinkSync(TEMP_SPEC_FILE);
    console.log('✅ Temporary files cleaned up');
  }
}

async function main() {
  console.log('🚀 Starting SDK generation process...\n');
  
  try {
    await downloadOpenAPISpec();
    generateSDK();
    cleanup();
    console.log('\n🎉 SDK generation completed successfully!');
  } catch (error) {
    console.error('\n❌ SDK generation failed:', error.message);
    cleanup();
    process.exit(1);
  }
}

// Handle process interruption
process.on('SIGINT', () => {
  console.log('\n⚠️  Process interrupted');
  cleanup();
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Process terminated');
  cleanup();
  process.exit(1);
});

main(); 