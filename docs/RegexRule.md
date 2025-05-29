# RegexRule

Defines a replacement rule based on matching a regular expression pattern.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**kind** | **string** | Discriminator field identifying the rule type as \&#39;regex\&#39;. | [default to undefined]
**pattern** | **string** | The regular expression pattern to search for. Uses standard regex syntax (implementation specific, often PCRE-like). Remember to escape special characters if needed (e.g., &#x60;\\\\.&#x60; for a literal dot). | [default to undefined]
**replacement** | **string** | The replacement text. Can include backreferences to capture groups from the pattern, like &#x60;$1&#x60;, &#x60;$2&#x60;, etc. A literal &#x60;$&#x60; should be escaped (e.g., &#x60;$$&#x60;). | [default to undefined]
**flags** | **Array&lt;string&gt;** | An array of flags to modify the regex behavior (e.g., \&#39;i\&#39; for case-insensitivity). | [optional] [default to undefined]

## Example

```typescript
import { RegexRule } from './api';

const instance: RegexRule = {
    kind,
    pattern,
    replacement,
    flags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
