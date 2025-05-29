# ReplacementRule

Defines a single rule for finding and replacing text in a transcription. Use one of the specific rule types (`ExactRule`, `RegexRule`, `RegexGroupRule`). The `kind` property acts as a discriminator.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**kind** | **string** | Discriminator field identifying the rule type as \&#39;regex_group\&#39;. | [default to undefined]
**search** | **string** | The exact text string to search for within the transcription. | [default to undefined]
**replacement** | **string** | The replacement text. Can include backreferences to capture groups from the pattern, like &#x60;$1&#x60;, &#x60;$2&#x60;, etc. A literal &#x60;$&#x60; should be escaped (e.g., &#x60;$$&#x60;). | [default to undefined]
**caseSensitive** | **boolean** | If true, the search will match only if the case is identical. If false (default), the search ignores case. | [optional] [default to false]
**pattern** | **string** | The regular expression pattern containing capture groups &#x60;(...)&#x60;. The entire pattern must match for replacements to occur. | [default to undefined]
**flags** | **Array&lt;string&gt;** | An array of flags to modify the regex behavior. | [optional] [default to undefined]
**groupReplacements** | **{ [key: string]: string; }** | An object where keys are capture group numbers (as strings, e.g., \&quot;1\&quot;, \&quot;2\&quot;) and values are the respective replacement strings for those groups. Groups not listed are kept as matched. The entire match is reconstructed using these replacements. | [default to undefined]

## Example

```typescript
import { ReplacementRule } from './api';

const instance: ReplacementRule = {
    kind,
    search,
    replacement,
    caseSensitive,
    pattern,
    flags,
    groupReplacements,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
