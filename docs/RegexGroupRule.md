# RegexGroupRule

Defines a replacement rule that uses regex capture groups to apply different replacements to different parts of the matched text.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**kind** | **string** | Discriminator field identifying the rule type as \&#39;regex_group\&#39;. | [default to undefined]
**pattern** | **string** | The regular expression pattern containing capture groups &#x60;(...)&#x60;. The entire pattern must match for replacements to occur. | [default to undefined]
**groupReplacements** | **{ [key: string]: string; }** | An object where keys are capture group numbers (as strings, e.g., \&quot;1\&quot;, \&quot;2\&quot;) and values are the respective replacement strings for those groups. Groups not listed are kept as matched. The entire match is reconstructed using these replacements. | [default to undefined]
**flags** | **Array&lt;string&gt;** | An array of flags to modify the regex behavior. | [optional] [default to undefined]

## Example

```typescript
import { RegexGroupRule } from './api';

const instance: RegexGroupRule = {
    kind,
    pattern,
    groupReplacements,
    flags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
