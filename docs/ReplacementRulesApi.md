# ReplacementRulesApi

All URIs are relative to *https://api.speechall.com/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createReplacementRuleset**](#createreplacementruleset) | **POST** /replacement-rulesets | Create a reusable set of text replacement rules.|

# **createReplacementRuleset**
> CreateReplacementRuleset201Response createReplacementRuleset(createReplacementRulesetRequest)

Defines a named set of replacement rules (exact match, regex) that can be applied during transcription requests using its `ruleset_id`. Rules within a set are applied sequentially to the transcription text. 

### Example

```typescript
import {
    ReplacementRulesApi,
    Configuration,
    CreateReplacementRulesetRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReplacementRulesApi(configuration);

let createReplacementRulesetRequest: CreateReplacementRulesetRequest; //JSON object containing the name for the ruleset and an array of replacement rule objects.

const { status, data } = await apiInstance.createReplacementRuleset(
    createReplacementRulesetRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createReplacementRulesetRequest** | **CreateReplacementRulesetRequest**| JSON object containing the name for the ruleset and an array of replacement rule objects. | |


### Return type

**CreateReplacementRuleset201Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/plain


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Ruleset created successfully. The response body contains the unique ID assigned to the new ruleset. |  -  |
|**400** | Bad Request - The request was malformed or contained invalid parameters (e.g., invalid language code, missing required field, unsupported option). The response body provides details. |  -  |
|**401** | Unauthorized - Authentication failed. The API key is missing, invalid, or expired. |  -  |
|**402** | Payment Required - There is no credit left on your account. |  -  |
|**429** | Too Many Requests - The client has exceeded the rate limit for API requests. Check the &#x60;Retry-After&#x60; header for guidance on when to retry. |  * Retry-After - The recommended number of seconds to wait before making another request. <br>  |
|**500** | Internal Server Error - An unexpected error occurred on the server side while processing the request. Retrying the request later might succeed. If the problem persists, contact support. |  -  |
|**503** | Service Unavailable - The server is temporarily unable to handle the request, possibly due to maintenance or overload. Try again later. |  -  |
|**504** | Gateway Timeout - The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server (e.g., the underlying STT provider). This might be a temporary issue with the provider. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

