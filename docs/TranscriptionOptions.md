# TranscriptionOptions

Configuration options for transcribing audio specified by a remote URL via the `/transcribe-remote` endpoint.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**file_url** | **string** | The publicly accessible URL of the audio file to transcribe. The API server must be able to fetch the audio from this URL. | [default to undefined]
**model** | [**TranscriptionModelIdentifier**](TranscriptionModelIdentifier.md) |  | [default to undefined]
**language** | [**TranscriptLanguageCode**](TranscriptLanguageCode.md) |  | [optional] [default to undefined]
**output_format** | [**TranscriptOutputFormat**](TranscriptOutputFormat.md) |  | [optional] [default to undefined]
**punctuation** | **boolean** | Whether to add punctuation. Support varies by model (e.g., Deepgram, AssemblyAI). Defaults to &#x60;true&#x60;. | [optional] [default to true]
**timestamp_granularity** | **string** | Level of timestamp detail (&#x60;word&#x60; or &#x60;segment&#x60;). Defaults to &#x60;segment&#x60;. | [optional] [default to TimestampGranularityEnum_Segment]
**diarization** | **boolean** | Enable speaker diarization. Defaults to &#x60;false&#x60;. | [optional] [default to false]
**initial_prompt** | **string** | Optional text prompt to guide the transcription model. Support varies (e.g., OpenAI). | [optional] [default to undefined]
**temperature** | **number** | Controls output randomness for supported models (e.g., OpenAI). Value between 0 and 1. | [optional] [default to undefined]
**smart_format** | **boolean** | Enable provider-specific smart formatting (e.g., Deepgram). Defaults vary. | [optional] [default to undefined]
**speakers_expected** | **number** | Hint for the number of expected speakers for diarization (e.g., RevAI, Deepgram). | [optional] [default to undefined]
**custom_vocabulary** | **Array&lt;string&gt;** | List of custom words/phrases to improve recognition (e.g., Deepgram, AssemblyAI). | [optional] [default to undefined]
**replacement_ruleset** | [**Array&lt;ReplacementRule&gt;**](ReplacementRule.md) | An array of replacement rules to be applied directly to this transcription request, in order. This allows defining rules inline instead of using a pre-saved &#x60;ruleset_id&#x60;. | [optional] [default to undefined]

## Example

```typescript
import { TranscriptionOptions } from './api';

const instance: TranscriptionOptions = {
    file_url,
    model,
    language,
    output_format,
    punctuation,
    timestamp_granularity,
    diarization,
    initial_prompt,
    temperature,
    smart_format,
    speakers_expected,
    custom_vocabulary,
    replacement_ruleset,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
