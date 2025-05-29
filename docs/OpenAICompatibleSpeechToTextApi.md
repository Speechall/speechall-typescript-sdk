# OpenAICompatibleSpeechToTextApi

All URIs are relative to *https://api.speechall.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**openaiCompatibleCreateTranscription**](#openaicompatiblecreatetranscription) | **POST** /openai-compatible/audio/transcriptions | Transcribes audio into the input language, using OpenAI-compatible request format.|
|[**openaiCompatibleCreateTranslation**](#openaicompatiblecreatetranslation) | **POST** /openai-compatible/audio/translations | Translates audio into English, using OpenAI-compatible request format.|

# **openaiCompatibleCreateTranscription**
> OpenaiCompatibleCreateTranscription200Response openaiCompatibleCreateTranscription()

Mimics the OpenAI `/audio/transcriptions` endpoint. Accepts audio file uploads via `multipart/form-data`. Allows specifying model, language, prompt, response format, temperature, and timestamp granularity similar to OpenAI. Note: The `model` parameter should use Speechall\'s `provider.model` format. 

### Example

```typescript
import {
    OpenAICompatibleSpeechToTextApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OpenAICompatibleSpeechToTextApi(configuration);

let file: File; //The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.  (default to undefined)
let model: TranscriptionModelIdentifier; // (default to undefined)
let language: string; //The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.  (optional) (default to undefined)
let prompt: string; //An optional text to guide the model\\\'s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.  (optional) (default to undefined)
let responseFormat: OpenAIAudioResponseFormat; // (optional) (default to undefined)
let temperature: number; //The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.  (optional) (default to 0)
let timestampGranularities: Array<string>; //The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.  (optional) (default to undefined)

const { status, data } = await apiInstance.openaiCompatibleCreateTranscription(
    file,
    model,
    language,
    prompt,
    responseFormat,
    temperature,
    timestampGranularities
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] | The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.  | defaults to undefined|
| **model** | **TranscriptionModelIdentifier** |  | defaults to undefined|
| **language** | [**string**] | The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.  | (optional) defaults to undefined|
| **prompt** | [**string**] | An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.  | (optional) defaults to undefined|
| **responseFormat** | **OpenAIAudioResponseFormat** |  | (optional) defaults to undefined|
| **temperature** | [**number**] | The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.  | (optional) defaults to 0|
| **timestampGranularities** | **Array<&#39;word&#39; &#124; &#39;segment&#39;>** | The timestamp granularities to populate for this transcription. &#x60;response_format&#x60; must be set &#x60;verbose_json&#x60; to use timestamp granularities. Either or both of these options are supported: &#x60;word&#x60;, or &#x60;segment&#x60;. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.  | (optional) defaults to undefined|


### Return type

**OpenaiCompatibleCreateTranscription200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json, text/plain


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Transcription successful. The response body format depends on the &#x60;response_format&#x60; parameter specified in the request: - &#x60;json&#x60;: Returns &#x60;OpenAI_CreateTranscriptionResponseJson&#x60;. - &#x60;verbose_json&#x60;: Returns &#x60;OpenAI_CreateTranscriptionResponseVerboseJson&#x60; with detailed segments and optional word timestamps. - &#x60;text&#x60;, &#x60;srt&#x60;, &#x60;vtt&#x60;: Returns the transcription as plain text in the specified format.  |  -  |
|**400** | Bad Request - The request was malformed or contained invalid parameters (e.g., invalid language code, missing required field, unsupported option). The response body provides details. |  -  |
|**401** | Unauthorized - Authentication failed. The API key is missing, invalid, or expired. |  -  |
|**402** | Payment Required - There is no credit left on your account. |  -  |
|**404** | Not Found - The requested resource could not be found. This could be an invalid API endpoint path, or a referenced resource ID (like &#x60;ruleset_id&#x60;) that doesn\&#39;t exist. For &#x60;/transcribe-remote&#x60;, it could also mean the &#x60;file_url&#x60; was inaccessible. |  -  |
|**429** | Too Many Requests - The client has exceeded the rate limit for API requests. Check the &#x60;Retry-After&#x60; header for guidance on when to retry. |  * Retry-After - The recommended number of seconds to wait before making another request. <br>  |
|**500** | Internal Server Error - An unexpected error occurred on the server side while processing the request. Retrying the request later might succeed. If the problem persists, contact support. |  -  |
|**503** | Service Unavailable - The server is temporarily unable to handle the request, possibly due to maintenance or overload. Try again later. |  -  |
|**504** | Gateway Timeout - The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server (e.g., the underlying STT provider). This might be a temporary issue with the provider. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **openaiCompatibleCreateTranslation**
> OpenaiCompatibleCreateTranslation200Response openaiCompatibleCreateTranslation()

Mimics the OpenAI `/audio/translations` endpoint. Accepts audio file uploads via `multipart/form-data` and translates the speech into English text. Allows specifying model, prompt, response format, and temperature similar to OpenAI. Note: The `model` parameter should use Speechall\'s `provider.model` format (ensure the selected model supports translation). 

### Example

```typescript
import {
    OpenAICompatibleSpeechToTextApi,
    Configuration,
    OpenAICreateTranslationRequestModel
} from './api';

const configuration = new Configuration();
const apiInstance = new OpenAICompatibleSpeechToTextApi(configuration);

let file: File; //The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.  (default to undefined)
let model: OpenAICreateTranslationRequestModel; // (default to undefined)
let prompt: string; //An optional text to guide the model\\\'s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.  (optional) (default to undefined)
let responseFormat: OpenAIAudioResponseFormat; // (optional) (default to undefined)
let temperature: number; //The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.  (optional) (default to 0)

const { status, data } = await apiInstance.openaiCompatibleCreateTranslation(
    file,
    model,
    prompt,
    responseFormat,
    temperature
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] | The audio file object (not file name) translate, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.  | defaults to undefined|
| **model** | **OpenAICreateTranslationRequestModel** |  | defaults to undefined|
| **prompt** | [**string**] | An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.  | (optional) defaults to undefined|
| **responseFormat** | **OpenAIAudioResponseFormat** |  | (optional) defaults to undefined|
| **temperature** | [**number**] | The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.  | (optional) defaults to 0|


### Return type

**OpenaiCompatibleCreateTranslation200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json, text/plain


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Translation successful. The output is always English text. The response body format depends on the &#x60;response_format&#x60; parameter: - &#x60;json&#x60;: Returns &#x60;OpenAI_CreateTranslationResponseJson&#x60;. - &#x60;verbose_json&#x60;: Returns &#x60;OpenAI_CreateTranslationResponseVerboseJson&#x60; with detailed segments. - &#x60;text&#x60;, &#x60;srt&#x60;, &#x60;vtt&#x60;: Returns the translated English text as plain text in the specified format.  |  -  |
|**400** | Bad Request - The request was malformed or contained invalid parameters (e.g., invalid language code, missing required field, unsupported option). The response body provides details. |  -  |
|**401** | Unauthorized - Authentication failed. The API key is missing, invalid, or expired. |  -  |
|**402** | Payment Required - There is no credit left on your account. |  -  |
|**404** | Not Found - The requested resource could not be found. This could be an invalid API endpoint path, or a referenced resource ID (like &#x60;ruleset_id&#x60;) that doesn\&#39;t exist. For &#x60;/transcribe-remote&#x60;, it could also mean the &#x60;file_url&#x60; was inaccessible. |  -  |
|**429** | Too Many Requests - The client has exceeded the rate limit for API requests. Check the &#x60;Retry-After&#x60; header for guidance on when to retry. |  * Retry-After - The recommended number of seconds to wait before making another request. <br>  |
|**500** | Internal Server Error - An unexpected error occurred on the server side while processing the request. Retrying the request later might succeed. If the problem persists, contact support. |  -  |
|**503** | Service Unavailable - The server is temporarily unable to handle the request, possibly due to maintenance or overload. Try again later. |  -  |
|**504** | Gateway Timeout - The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server (e.g., the underlying STT provider). This might be a temporary issue with the provider. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

