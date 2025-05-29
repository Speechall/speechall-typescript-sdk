# SpeechToTextModel

Describes an available speech-to-text model, its provider, capabilities, and characteristics.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | [**TranscriptionModelIdentifier**](TranscriptionModelIdentifier.md) |  | [default to undefined]
**display_name** | **string** | A user-friendly name for the model. | [default to undefined]
**provider** | [**TranscriptionProvider**](TranscriptionProvider.md) |  | [default to undefined]
**description** | **string** | A brief description of the model, its intended use case, or version notes. | [optional] [default to undefined]
**cost_per_second_usd** | **number** | The cost per second of audio processed in USD. | [optional] [default to undefined]
**is_available** | **boolean** | Indicates whether the model is currently available for use. | [default to true]
**supported_languages** | **Array&lt;string&gt;** | A list of language codes (preferably BCP 47, e.g., \&quot;en-US\&quot;, \&quot;en-GB\&quot;, \&quot;es-ES\&quot;) supported by this model. May include &#x60;auto&#x60; if automatic language detection is supported across multiple languages within a single audio file.  | [optional] [default to undefined]
**punctuation** | **boolean** | Indicates whether the model generally supports automatic punctuation insertion. | [optional] [default to undefined]
**diarization** | **boolean** | Indicates whether the model generally supports speaker diarization (identifying different speakers). | [optional] [default to undefined]
**streamable** | **boolean** | Indicates whether the model can be used for real-time streaming transcription via a WebSocket connection (if offered by Speechall). | [optional] [default to undefined]
**real_time_factor** | **number** | An approximate measure of processing speed for batch processing. Defined as (audio duration) / (processing time). A higher value means faster processing (e.g., RTF&#x3D;2 means it processes 1 second of audio in 0.5 seconds). May not be available for all models or streaming scenarios.  | [optional] [default to undefined]
**max_duration_seconds** | **number** | The maximum duration of a single audio file (in seconds) that the model can reliably process in one request. May vary by provider or plan. | [optional] [default to undefined]
**max_file_size_bytes** | **number** | The maximum size of a single audio file (in bytes) that can be uploaded for processing by this model. May vary by provider or plan. | [optional] [default to undefined]
**version** | **string** | The specific version identifier for the model. | [optional] [default to undefined]
**release_date** | **string** | The date when this specific version of the model was released or last updated. | [optional] [default to undefined]
**model_type** | **string** | The primary type or training domain of the model. Helps identify suitability for different audio types. | [optional] [default to undefined]
**accuracy_tier** | **string** | A general indication of the model\&#39;s expected accuracy level relative to other models. Not a guaranteed metric. | [optional] [default to undefined]
**supported_audio_encodings** | **Array&lt;string&gt;** | A list of audio encodings that this model supports or is optimized for (e.g., LINEAR16, FLAC, MP3, Opus). | [optional] [default to undefined]
**supported_sample_rates** | **Array&lt;number&gt;** | A list of audio sample rates (in Hz) that this model supports or is optimized for. | [optional] [default to undefined]
**speaker_labels** | **boolean** | Indicates whether the model can provide speaker labels for the transcription. | [optional] [default to undefined]
**word_timestamps** | **boolean** | Indicates whether the model can provide timestamps for individual words. | [optional] [default to undefined]
**confidence_scores** | **boolean** | Indicates whether the model provides confidence scores for the transcription or individual words. | [optional] [default to undefined]
**language_detection** | **boolean** | Indicates whether the model supports automatic language detection for input audio. | [optional] [default to undefined]
**custom_vocabulary_support** | **boolean** | Indicates if the model can leverage a custom vocabulary or language model adaptation. | [optional] [default to undefined]
**profanity_filtering** | **boolean** | Indicates if the model supports filtering or masking of profanity. | [optional] [default to undefined]
**noise_reduction** | **boolean** | Indicates if the model supports noise reduction. | [optional] [default to undefined]
**supports_srt** | **boolean** | Indicates whether the model supports SRT subtitle format output. | [default to false]
**supports_vtt** | **boolean** | Indicates whether the model supports VTT subtitle format output. | [default to false]
**voice_activity_detection** | **boolean** | Indicates whether the model supports voice activity detection (VAD) to identify speech segments. | [optional] [default to undefined]

## Example

```typescript
import { SpeechToTextModel } from './api';

const instance: SpeechToTextModel = {
    id,
    display_name,
    provider,
    description,
    cost_per_second_usd,
    is_available,
    supported_languages,
    punctuation,
    diarization,
    streamable,
    real_time_factor,
    max_duration_seconds,
    max_file_size_bytes,
    version,
    release_date,
    model_type,
    accuracy_tier,
    supported_audio_encodings,
    supported_sample_rates,
    speaker_labels,
    word_timestamps,
    confidence_scores,
    language_detection,
    custom_vocabulary_support,
    profanity_filtering,
    noise_reduction,
    supports_srt,
    supports_vtt,
    voice_activity_detection,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
