# OpenAITranscriptionWord

Represents a single word identified during transcription, including its start and end times. Included in `verbose_json` response when `word` granularity is requested.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**word** | **string** | The text content of the word. | [default to undefined]
**start** | **number** | Start time of the word in seconds. | [default to undefined]
**end** | **number** | End time of the word in seconds. | [default to undefined]

## Example

```typescript
import { OpenAITranscriptionWord } from './api';

const instance: OpenAITranscriptionWord = {
    word,
    start,
    end,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
