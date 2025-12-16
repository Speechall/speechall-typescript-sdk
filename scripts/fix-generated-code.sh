#!/bin/bash
# Post-generation fix script for Fern TypeScript SDK
# Fixes known bugs in the generated code
#
# This script is automatically run by regenerate.sh after fern generate

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SRC_DIR="$PROJECT_ROOT/src"

echo "Applying post-generation fixes..."

# Fix 1: Remove spurious "*/" before JSDoc comments (Fern generator bug)
# This bug appears when a method without @example is followed by a method with @example
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS requires different sed syntax
    find "$SRC_DIR" -name "*.ts" -exec sed -i '' 's/^\([[:space:]]*\)\*\/\/\*\*/\1\/\*\*/g' {} +
else
    # Linux
    find "$SRC_DIR" -name "*.ts" -exec sed -i 's/^\([[:space:]]*\)\*\/\/\*\*/\1\/\*\*/g' {} +
fi

echo "Post-generation fixes applied successfully."
