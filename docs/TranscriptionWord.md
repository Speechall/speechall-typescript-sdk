# TranscriptionWord

Represents a word in the transcription, providing time-coded chunks of the transcription.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**start** | **number** | The start time of the word in seconds from the beginning of the audio. | [default to undefined]
**end** | **number** | The end time of the word in seconds from the beginning of the audio. | [default to undefined]
**word** | **string** | The transcribed word. | [default to undefined]
**speaker** | **string** | An identifier for the speaker of this word, present if diarization was enabled and successful. | [optional] [default to undefined]
**confidence** | **number** | The model\&#39;s confidence score for the transcription of this word, typically between 0 and 1 (if provided by the model). | [optional] [default to undefined]

## Example

```typescript
import { TranscriptionWord } from './api';

const instance: TranscriptionWord = {
    start,
    end,
    word,
    speaker,
    confidence,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
