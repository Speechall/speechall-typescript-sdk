# CreateReplacementRulesetRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | A user-defined name for this ruleset for easier identification. | [default to undefined]
**rules** | [**Array&lt;ReplacementRule&gt;**](ReplacementRule.md) | An ordered array of replacement rules. Rules are applied in the order they appear in this list. See the &#x60;ReplacementRule&#x60; schema for different rule types (exact, regex, regex_group). | [default to undefined]

## Example

```typescript
import { CreateReplacementRulesetRequest } from './api';

const instance: CreateReplacementRulesetRequest = {
    name,
    rules,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
