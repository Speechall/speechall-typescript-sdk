# ExactRule

Defines a replacement rule based on finding an exact string match.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**kind** | **string** | Discriminator field identifying the rule type as \&#39;exact\&#39;. | [default to undefined]
**search** | **string** | The exact text string to search for within the transcription. | [default to undefined]
**replacement** | **string** | The text string to replace the found \&#39;search\&#39; text with. | [default to undefined]
**caseSensitive** | **boolean** | If true, the search will match only if the case is identical. If false (default), the search ignores case. | [optional] [default to false]

## Example

```typescript
import { ExactRule } from './api';

const instance: ExactRule = {
    kind,
    search,
    replacement,
    caseSensitive,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
