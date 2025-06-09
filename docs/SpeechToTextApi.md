# SpeechToTextApi

All URIs are relative to *https://api.speechall.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**listSpeechToTextModels**](#listspeechtotextmodels) | **GET** /speech-to-text-models | Retrieve a list of all available speech-to-text models.|
|[**transcribe**](#transcribe) | **POST** /transcribe | Upload an audio file directly and receive a transcription.|
|[**transcribeRemote**](#transcriberemote) | **POST** /transcribe-remote | Transcribe an audio file located at a remote URL.|

# **listSpeechToTextModels**
> Array<SpeechToTextModel> listSpeechToTextModels()

Returns a detailed list of all STT models accessible through the Speechall API. Each model entry includes its identifier (`provider.model`), display name, description, supported features (languages, formats, punctuation, diarization), and performance characteristics. Use this endpoint to discover available models and their capabilities before making transcription requests. 

### Example

```typescript
import {
    SpeechToTextApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpeechToTextApi(configuration);

const { status, data } = await apiInstance.listSpeechToTextModels();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<SpeechToTextModel>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, text/plain


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of available speech-to-text models and their properties. |  -  |
|**400** | Bad Request - The request was malformed or contained invalid parameters (e.g., invalid language code, missing required field, unsupported option). The response body provides details. |  -  |
|**401** | Unauthorized - Authentication failed. The API key is missing, invalid, or expired. |  -  |
|**402** | Payment Required - There is no credit left on your account. |  -  |
|**404** | Not Found - The requested resource could not be found. This could be an invalid API endpoint path, or a referenced resource ID (like &#x60;ruleset_id&#x60;) that doesn\&#39;t exist. For &#x60;/transcribe-remote&#x60;, it could also mean the &#x60;file_url&#x60; was inaccessible. |  -  |
|**429** | Too Many Requests - The client has exceeded the rate limit for API requests. Check the &#x60;Retry-After&#x60; header for guidance on when to retry. |  * Retry-After - The recommended number of seconds to wait before making another request. <br>  |
|**500** | Internal Server Error - An unexpected error occurred on the server side while processing the request. Retrying the request later might succeed. If the problem persists, contact support. |  -  |
|**503** | Service Unavailable - The server is temporarily unable to handle the request, possibly due to maintenance or overload. Try again later. |  -  |
|**504** | Gateway Timeout - The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server (e.g., the underlying STT provider). This might be a temporary issue with the provider. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **transcribe**
> TranscriptionResponse transcribe(body)

This endpoint allows you to send raw audio data in the request body for transcription. You can specify the desired model, language, output format, and various provider-specific features using query parameters. Suitable for transcribing local audio files. 

### Example

```typescript
import {
    SpeechToTextApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpeechToTextApi(configuration);

let model: TranscriptionModelIdentifier; //The identifier of the speech-to-text model to use for the transcription, in the format `provider.model`. See the `/speech-to-text-models` endpoint for available models. (default to undefined)
let body: File; //The audio file to transcribe. Send the raw audio data as the request body. Supported formats typically include WAV, MP3, FLAC, Ogg, M4A, etc., depending on the chosen model/provider. Check provider documentation for specific limits on file size and duration.
let language: TranscriptLanguageCode; //The language of the audio file in ISO 639-1 format (e.g., `en`, `es`, `fr`). Specify `auto` for automatic language detection (if supported by the model). Defaults to `en` if not provided. Providing the correct language improves accuracy and latency. (optional) (default to undefined)
let outputFormat: TranscriptOutputFormat; //The desired format for the transcription output. Can be plain text, JSON objects (simple or detailed), or subtitle formats (SRT, VTT). Defaults to `text`. (optional) (default to undefined)
let rulesetId: string; //The unique identifier (UUID) of a pre-defined replacement ruleset to apply to the final transcription text. Create rulesets using the `/replacement-rulesets` endpoint. (optional) (default to undefined)
let punctuation: boolean; //Enable automatic punctuation (commas, periods, question marks) in the transcription. Support varies by model/provider (e.g., Deepgram, AssemblyAI). Defaults to `true`. (optional) (default to true)
let timestampGranularity: 'word' | 'segment'; //Specifies the level of detail for timestamps in the response (if `output_format` is `json` or `verbose_json`). `segment` provides timestamps for larger chunks of speech, while `word` provides timestamps for individual words (may increase latency). Defaults to `segment`. (optional) (default to 'segment')
let diarization: boolean; //Enable speaker diarization to identify and label different speakers in the audio. Support and quality vary by model/provider. Defaults to `false`. When enabled, the `speaker` field may be populated in the response segments. (optional) (default to false)
let initialPrompt: string; //An optional text prompt to provide context, guide the model\'s style (e.g., spelling of specific names), or improve accuracy for subsequent audio segments. Support varies by model (e.g., OpenAI models). (optional) (default to undefined)
let temperature: number; //Controls the randomness of the output for certain models (e.g., OpenAI). A value between 0 and 1. Lower values (e.g., 0.2) make the output more deterministic, while higher values (e.g., 0.8) make it more random. Defaults vary by model. (optional) (default to undefined)
let smartFormat: boolean; //Enable provider-specific \"smart formatting\" features, which might include formatting for numbers, dates, currency, etc. Currently supported by Deepgram models. Defaults vary. (optional) (default to undefined)
let speakersExpected: number; //Provides a hint to the diarization process about the number of expected speakers. May improve accuracy for some providers (e.g., RevAI, Deepgram). (optional) (default to undefined)
let customVocabulary: Array<string>; //Provide a list of specific words or phrases (e.g., proper nouns, jargon) to increase their recognition likelihood. Support varies by provider (e.g., Deepgram, AssemblyAI). (optional) (default to undefined)

const { status, data } = await apiInstance.transcribe(
    model,
    body,
    language,
    outputFormat,
    rulesetId,
    punctuation,
    timestampGranularity,
    diarization,
    initialPrompt,
    temperature,
    smartFormat,
    speakersExpected,
    customVocabulary
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **File**| The audio file to transcribe. Send the raw audio data as the request body. Supported formats typically include WAV, MP3, FLAC, Ogg, M4A, etc., depending on the chosen model/provider. Check provider documentation for specific limits on file size and duration. | |
| **model** | **TranscriptionModelIdentifier** | The identifier of the speech-to-text model to use for the transcription, in the format &#x60;provider.model&#x60;. See the &#x60;/speech-to-text-models&#x60; endpoint for available models. | defaults to undefined|
| **language** | **TranscriptLanguageCode** | The language of the audio file in ISO 639-1 format (e.g., &#x60;en&#x60;, &#x60;es&#x60;, &#x60;fr&#x60;). Specify &#x60;auto&#x60; for automatic language detection (if supported by the model). Defaults to &#x60;en&#x60; if not provided. Providing the correct language improves accuracy and latency. | (optional) defaults to undefined|
| **outputFormat** | **TranscriptOutputFormat** | The desired format for the transcription output. Can be plain text, JSON objects (simple or detailed), or subtitle formats (SRT, VTT). Defaults to &#x60;text&#x60;. | (optional) defaults to undefined|
| **rulesetId** | [**string**] | The unique identifier (UUID) of a pre-defined replacement ruleset to apply to the final transcription text. Create rulesets using the &#x60;/replacement-rulesets&#x60; endpoint. | (optional) defaults to undefined|
| **punctuation** | [**boolean**] | Enable automatic punctuation (commas, periods, question marks) in the transcription. Support varies by model/provider (e.g., Deepgram, AssemblyAI). Defaults to &#x60;true&#x60;. | (optional) defaults to true|
| **timestampGranularity** | [**&#39;word&#39; | &#39;segment&#39;**]**Array<&#39;word&#39; &#124; &#39;segment&#39;>** | Specifies the level of detail for timestamps in the response (if &#x60;output_format&#x60; is &#x60;json&#x60; or &#x60;verbose_json&#x60;). &#x60;segment&#x60; provides timestamps for larger chunks of speech, while &#x60;word&#x60; provides timestamps for individual words (may increase latency). Defaults to &#x60;segment&#x60;. | (optional) defaults to 'segment'|
| **diarization** | [**boolean**] | Enable speaker diarization to identify and label different speakers in the audio. Support and quality vary by model/provider. Defaults to &#x60;false&#x60;. When enabled, the &#x60;speaker&#x60; field may be populated in the response segments. | (optional) defaults to false|
| **initialPrompt** | [**string**] | An optional text prompt to provide context, guide the model\&#39;s style (e.g., spelling of specific names), or improve accuracy for subsequent audio segments. Support varies by model (e.g., OpenAI models). | (optional) defaults to undefined|
| **temperature** | [**number**] | Controls the randomness of the output for certain models (e.g., OpenAI). A value between 0 and 1. Lower values (e.g., 0.2) make the output more deterministic, while higher values (e.g., 0.8) make it more random. Defaults vary by model. | (optional) defaults to undefined|
| **smartFormat** | [**boolean**] | Enable provider-specific \&quot;smart formatting\&quot; features, which might include formatting for numbers, dates, currency, etc. Currently supported by Deepgram models. Defaults vary. | (optional) defaults to undefined|
| **speakersExpected** | [**number**] | Provides a hint to the diarization process about the number of expected speakers. May improve accuracy for some providers (e.g., RevAI, Deepgram). | (optional) defaults to undefined|
| **customVocabulary** | **Array&lt;string&gt;** | Provide a list of specific words or phrases (e.g., proper nouns, jargon) to increase their recognition likelihood. Support varies by provider (e.g., Deepgram, AssemblyAI). | (optional) defaults to undefined|


### Return type

**TranscriptionResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: audio/*
 - **Accept**: application/json, text/plain


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful transcription response. The content type and structure depend on the &#x60;output_format&#x60; parameter specified in the request. - &#x60;application/json&#x60;: Returned for &#x60;output_format&#x3D;json&#x60; or &#x60;json_text&#x60;. See &#x60;TranscriptionResponse&#x60; schema (&#x60;TranscriptionDetailed&#x60; or &#x60;TranscriptionOnlyText&#x60;). - &#x60;text/plain&#x60;: Returned for &#x60;output_format&#x3D;text&#x60;.  |  -  |
|**400** | Bad Request - The request was malformed or contained invalid parameters (e.g., invalid language code, missing required field, unsupported option). The response body provides details. |  -  |
|**401** | Unauthorized - Authentication failed. The API key is missing, invalid, or expired. |  -  |
|**402** | Payment Required - There is no credit left on your account. |  -  |
|**404** | Not Found - The requested resource could not be found. This could be an invalid API endpoint path, or a referenced resource ID (like &#x60;ruleset_id&#x60;) that doesn\&#39;t exist. For &#x60;/transcribe-remote&#x60;, it could also mean the &#x60;file_url&#x60; was inaccessible. |  -  |
|**429** | Too Many Requests - The client has exceeded the rate limit for API requests. Check the &#x60;Retry-After&#x60; header for guidance on when to retry. |  * Retry-After - The recommended number of seconds to wait before making another request. <br>  |
|**500** | Internal Server Error - An unexpected error occurred on the server side while processing the request. Retrying the request later might succeed. If the problem persists, contact support. |  -  |
|**503** | Service Unavailable - The server is temporarily unable to handle the request, possibly due to maintenance or overload. Try again later. |  -  |
|**504** | Gateway Timeout - The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server (e.g., the underlying STT provider). This might be a temporary issue with the provider. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **transcribeRemote**
> TranscriptionResponse transcribeRemote(remoteTranscriptionConfiguration)

This endpoint allows you to transcribe an audio file hosted at a publicly accessible URL. Provide the URL and transcription options within the JSON request body. Useful for transcribing files already stored online. 

### Example

```typescript
import {
    SpeechToTextApi,
    Configuration,
    RemoteTranscriptionConfiguration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpeechToTextApi(configuration);

let remoteTranscriptionConfiguration: RemoteTranscriptionConfiguration; //JSON object containing the URL of the audio file and the desired transcription options.

const { status, data } = await apiInstance.transcribeRemote(
    remoteTranscriptionConfiguration
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **remoteTranscriptionConfiguration** | **RemoteTranscriptionConfiguration**| JSON object containing the URL of the audio file and the desired transcription options. | |


### Return type

**TranscriptionResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/plain


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful transcription response. The content type and structure depend on the &#x60;output_format&#x60; parameter specified in the request. - &#x60;application/json&#x60;: Returned for &#x60;output_format&#x3D;json&#x60; or &#x60;json_text&#x60;. See &#x60;TranscriptionResponse&#x60; schema (&#x60;TranscriptionDetailed&#x60; or &#x60;TranscriptionOnlyText&#x60;). - &#x60;text/plain&#x60;: Returned for &#x60;output_format&#x3D;text&#x60;.  |  -  |
|**400** | Bad Request - The request was malformed or contained invalid parameters (e.g., invalid language code, missing required field, unsupported option). The response body provides details. |  -  |
|**401** | Unauthorized - Authentication failed. The API key is missing, invalid, or expired. |  -  |
|**402** | Payment Required - There is no credit left on your account. |  -  |
|**404** | Not Found - The requested resource could not be found. This could be an invalid API endpoint path, or a referenced resource ID (like &#x60;ruleset_id&#x60;) that doesn\&#39;t exist. For &#x60;/transcribe-remote&#x60;, it could also mean the &#x60;file_url&#x60; was inaccessible. |  -  |
|**429** | Too Many Requests - The client has exceeded the rate limit for API requests. Check the &#x60;Retry-After&#x60; header for guidance on when to retry. |  * Retry-After - The recommended number of seconds to wait before making another request. <br>  |
|**500** | Internal Server Error - An unexpected error occurred on the server side while processing the request. Retrying the request later might succeed. If the problem persists, contact support. |  -  |
|**503** | Service Unavailable - The server is temporarily unable to handle the request, possibly due to maintenance or overload. Try again later. |  -  |
|**504** | Gateway Timeout - The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server (e.g., the underlying STT provider). This might be a temporary issue with the provider. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

