#!/bin/bash

# Configuration
OPENAPI_URL="https://raw.githubusercontent.com/Speechall/speechall-openapi/refs/heads/main/openapi.yaml"
TEMP_SPEC_FILE="temp-openapi.yaml"
GENERATOR="typescript-axios"
OUTPUT_DIR="."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}$1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to cleanup temporary files
cleanup() {
    if [ -f "$TEMP_SPEC_FILE" ]; then
        rm -f "$TEMP_SPEC_FILE"
        print_success "Temporary files cleaned up"
    fi
}

# Trap to ensure cleanup happens on script exit
trap cleanup EXIT INT TERM

# Check if openapi-generator is installed
if ! command -v openapi-generator &> /dev/null; then
    print_error "openapi-generator is not installed or not in PATH"
    print_status "Please install it with: brew install openapi-generator"
    exit 1
fi

print_status "🚀 Starting SDK generation process...\n"

# Download OpenAPI specification
print_status "📥 Downloading OpenAPI specification..."
if curl -s -f "$OPENAPI_URL" -o "$TEMP_SPEC_FILE"; then
    print_success "OpenAPI specification downloaded successfully"
else
    print_error "Failed to download OpenAPI specification from $OPENAPI_URL"
    exit 1
fi

# Generate SDK
print_status "🔧 Generating TypeScript SDK..."
if openapi-generator generate -i "$TEMP_SPEC_FILE" -g "$GENERATOR" -o "$OUTPUT_DIR"; then
    print_success "SDK generated successfully"
else
    print_error "Failed to generate SDK"
    exit 1
fi

print_success "\n🎉 SDK generation completed successfully!" 