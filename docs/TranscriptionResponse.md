# TranscriptionResponse

Represents the JSON structure returned when a JSON-based `output_format` (`json` or `json_text`) is requested. It can be either a detailed structure or a simple text-only structure.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | A unique identifier for the transcription job/request. | [default to undefined]
**text** | **string** | The full transcribed text as a single string. | [default to undefined]
**language** | **string** | The detected or specified language of the audio (ISO 639-1 code). | [optional] [default to undefined]
**duration** | **number** | The total duration of the processed audio file in seconds. **Deprecated**: This property may be removed in future versions as duration analysis might occur asynchronously. Rely on segment end times for duration information if needed.  | [optional] [default to undefined]
**segments** | [**Array&lt;TranscriptionSegment&gt;**](TranscriptionSegment.md) | An array of transcribed segments, providing time-coded chunks of the transcription. The level of detail (word vs. segment timestamps) depends on the &#x60;timestamp_granularity&#x60; request parameter. May include speaker labels if diarization was enabled. | [optional] [default to undefined]
**words** | [**Array&lt;TranscriptionWord&gt;**](TranscriptionWord.md) | An array of transcribed words, providing time-coded chunks of the transcription. The level of detail (word vs. segment timestamps) depends on the &#x60;timestamp_granularity&#x60; request parameter. May include speaker labels if diarization was enabled. | [optional] [default to undefined]
**provider_metadata** | **{ [key: string]: any; }** | An optional object containing additional metadata returned directly from the underlying STT provider. The structure of this object is provider-dependent. | [optional] [default to undefined]

## Example

```typescript
import { TranscriptionResponse } from './api';

const instance: TranscriptionResponse = {
    id,
    text,
    language,
    duration,
    segments,
    words,
    provider_metadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
