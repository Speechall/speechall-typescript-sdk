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

# Preserve the public namespace for callers upgrading from inline catalog enums.
MODEL_FILE="$SRC_DIR/api/types/SpeechToTextModel.ts"
if ! grep -q '^export namespace SpeechToTextModel' "$MODEL_FILE"; then
    cat >> "$MODEL_FILE" <<'EOF'

import { SpeechToTextModelAccuracyTier } from "./SpeechToTextModelAccuracyTier.js";
import { SpeechToTextModelModelType } from "./SpeechToTextModelModelType.js";

export namespace SpeechToTextModel {
    export const ModelType = SpeechToTextModelModelType;
    export type ModelType = SpeechToTextModelModelType;
    export const AccuracyTier = SpeechToTextModelAccuracyTier;
    export type AccuracyTier = SpeechToTextModelAccuracyTier;
}
EOF
fi

echo "Post-generation fixes applied successfully."
