# TranscriptionOnlyText

A simplified JSON response format containing only the transcription ID and the full transcribed text. Returned when `output_format` is `json_text`.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | A unique identifier for the transcription job/request. | [default to undefined]
**text** | **string** | The full transcribed text as a single string. | [default to undefined]

## Example

```typescript
import { TranscriptionOnlyText } from './api';

const instance: TranscriptionOnlyText = {
    id,
    text,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
