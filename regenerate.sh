#!/bin/bash
set -e

echo "Validating Fern configuration..."

if [ ! -f "fern/generators.yml" ]; then
    echo "Error: fern/generators.yml not found"
    exit 1
fi

echo "Using OpenAPI spec configured in fern/generators.yml"
echo "Note: The OpenAPI spec path is configured in fern/generators.yml"
echo "For local OpenAPI changes, edit fern/generators.yml to use your local path."

echo "Generating TypeScript SDK with Fern..."
fern generate --local --force

echo "SDK generation complete!"

# Apply post-generation fixes for known Fern generator bugs
if [ -f "scripts/fix-generated-code.sh" ]; then
    ./scripts/fix-generated-code.sh
fi

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
