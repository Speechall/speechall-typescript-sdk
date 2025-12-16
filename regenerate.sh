#!/bin/bash
set -e

echo "Validating OpenAPI spec..."
# Check if OpenAPI file exists - UPDATE PATH AS NEEDED
if [ ! -f "../speechall-openapi/openapi.yaml" ]; then
    echo "Error: OpenAPI spec not found at ../speechall-openapi/openapi.yaml"
    exit 1
fi

echo "OpenAPI spec found"

echo "Generating TypeScript SDK with Fern..."
fern generate --local --force

echo "SDK generation complete!"

# Optional: Run type checking
if [ -f "tsconfig.json" ]; then
    echo "Running TypeScript type check..."
    if command -v npx &> /dev/null; then
        npx tsc --noEmit
    else
        echo "npx not available, skipping type check"
    fi
fi

# Optional: Run tests
if [ -d "tests" ] || [ -d "__tests__" ]; then
    echo "Running tests..."
    if command -v npm &> /dev/null; then
        npm test
    else
        echo "npm not available, skipping tests"
    fi
fi

echo "Regeneration complete!"
