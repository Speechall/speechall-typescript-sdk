# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.4] - 2025-12-18

### Fixed

- Updated to npm 11.5.1+ for Trusted Publishing OIDC support

## [2.0.3] - 2025-12-18

### Fixed

- Fixed npm Trusted Publishing workflow configuration

## [2.0.2] - 2025-12-18

### Fixed

- Switched to npm Trusted Publishing (OIDC) for more secure token-less authentication

## [2.0.1] - 2025-12-17

### Fixed

- Fixed auto-release workflow not triggering npm publish due to GITHUB_TOKEN limitation
- Added repository_dispatch event to chain workflows correctly

## [2.0.0] - 2025-12-17

### Changed

- **BREAKING**: Migrated SDK code generator from openapi-generator to [Fern](https://buildwithfern.com)
- Removed OpenAI-compatible endpoints (use the native OpenAI SDK instead)
- Regenerated SDK with improved TypeScript types and error handling

### Migration Guide

The package name remains `@speechall/sdk`. Update your code to remove any OpenAI-compatible endpoint usage:

```typescript
// v1.x OpenAI-compatible (REMOVED)
// client.openaiCompatible.createTranscription(...)

// v2.x - Use native Speechall API
const result = await client.speechToText.transcribe(audioFile, {
  model: 'openai.whisper-1',
  language: 'en',
});
```

## [1.0.0] - 2025-06-09

Initial release of the TypeScript SDK generated with openapi-generator.
