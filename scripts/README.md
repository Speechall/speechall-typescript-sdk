# SDK Generation Scripts

This directory contains scripts to automatically generate the TypeScript SDK from the OpenAPI specification.

## Available Scripts

### 1. Node.js Script (`generate-sdk.js`)
- **Usage**: `npm run generate` or `node scripts/generate-sdk.js`
- **Language**: JavaScript (Node.js)
- **Features**:
  - Downloads OpenAPI spec from remote URL
  - Generates TypeScript SDK using openapi-generator
  - Proper error handling and cleanup
  - Process interruption handling

### 2. Bash Script (`generate-sdk.sh`)
- **Usage**: `npm run generate:bash` or `bash scripts/generate-sdk.sh`
- **Language**: Bash
- **Features**:
  - Simple and lightweight
  - Colorized output
  - Dependency checking
  - Automatic cleanup

## Prerequisites

- **openapi-generator**: Must be installed and available in PATH
  ```bash
  # Install with Homebrew (macOS)
  brew install openapi-generator
  
  # Or with npm globally
  npm install -g @openapitools/openapi-generator-cli
  ```

## Configuration

Both scripts are configured to:
- Download from: `https://raw.githubusercontent.com/Speechall/speechall-openapi/refs/heads/main/openapi.yaml`
- Generate: TypeScript Axios client
- Output to: Current directory (.)

To modify these settings, edit the configuration variables at the top of either script.

## Generated Files

The scripts will generate/update:
- `api.ts` - API client classes
- `base.ts` - Base classes and utilities
- `common.ts` - Common types and utilities
- `configuration.ts` - Configuration classes
- `index.ts` - Main export file
- `docs/` - Documentation files
- `.openapi-generator/` - Generator metadata

## Best Practices

1. **Always commit before regenerating** - The scripts will overwrite existing files
2. **Review changes** - Check the generated code for any breaking changes
3. **Run tests** - Ensure the generated SDK works as expected
4. **Update version** - Consider updating the package version after regeneration

## Troubleshooting

### Common Issues

1. **"openapi-generator command not found"**
   - Install openapi-generator using the methods above
   - Verify installation: `openapi-generator version`

2. **"Failed to download OpenAPI specification"**
   - Check internet connection
   - Verify the OpenAPI URL is accessible
   - Check if the repository is public

3. **"Permission denied"**
   - Make scripts executable: `chmod +x scripts/*.sh`

### Manual Generation

If the scripts fail, you can generate manually:

```bash
# Download the spec
curl -o temp-openapi.yaml https://raw.githubusercontent.com/Speechall/speechall-openapi/refs/heads/main/openapi.yaml

# Generate the SDK
openapi-generator generate -i temp-openapi.yaml -g typescript-axios -o .

# Clean up
rm temp-openapi.yaml
``` 