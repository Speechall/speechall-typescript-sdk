# TranscriptionSegment

Represents a time-coded segment of the transcription, typically corresponding to a phrase, sentence, or speaker turn.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**start** | **number** | The start time of the segment in seconds from the beginning of the audio. | [optional] [default to undefined]
**end** | **number** | The end time of the segment in seconds from the beginning of the audio. | [optional] [default to undefined]
**text** | **string** | The transcribed text content of this segment. | [optional] [default to undefined]
**speaker** | **string** | An identifier for the speaker of this segment, present if diarization was enabled and successful. | [optional] [default to undefined]
**confidence** | **number** | The model\&#39;s confidence score for the transcription of this segment, typically between 0 and 1 (if provided by the model). | [optional] [default to undefined]

## Example

```typescript
import { TranscriptionSegment } from './api';

const instance: TranscriptionSegment = {
    start,
    end,
    text,
    speaker,
    confidence,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
