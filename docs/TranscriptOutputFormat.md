# TranscriptOutputFormat

Specifies the desired format of the transcription output. - `text`: Plain text containing the full transcription. - `json_text`: A simple JSON object containing the transcription ID and the full text (`TranscriptionOnlyText` schema). - `json`: A detailed JSON object including segments, timestamps (based on `timestamp_granularity`), language, and potentially speaker labels and provider metadata (`TranscriptionDetailed` schema). - `srt`: SubRip subtitle format (returned as plain text). - `vtt`: WebVTT subtitle format (returned as plain text). 

## Enum

* `Text` (value: `'text'`)

* `JsonText` (value: `'json_text'`)

* `Json` (value: `'json'`)

* `Srt` (value: `'srt'`)

* `Vtt` (value: `'vtt'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
