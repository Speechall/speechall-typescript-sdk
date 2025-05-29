# OpenaiCompatibleCreateTranscription200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**language** | **string** | The language of the input audio. | [default to undefined]
**duration** | **number** | The duration of the input audio. | [default to undefined]
**text** | **string** | The transcribed text. | [default to undefined]
**words** | [**Array&lt;OpenAITranscriptionWord&gt;**](OpenAITranscriptionWord.md) | Extracted words and their corresponding timestamps. | [optional] [default to undefined]
**segments** | [**Array&lt;OpenAITranscriptionSegment&gt;**](OpenAITranscriptionSegment.md) | Segments of the transcribed text and their corresponding details. | [optional] [default to undefined]

## Example

```typescript
import { OpenaiCompatibleCreateTranscription200Response } from './api';

const instance: OpenaiCompatibleCreateTranscription200Response = {
    language,
    duration,
    text,
    words,
    segments,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
