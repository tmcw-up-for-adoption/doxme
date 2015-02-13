
### `doxme(dox, readme, package, travis)`

A Markdown formatter for dox. Takes dox&#39;s JSON output as stdinand writes Markdown to stdout.usage
dox -r &lt; index.js | doxme


### Parameters

| parameter | type    | description                                      |
| --------- | ------- | ------------------------------------------------ |
| `dox`     | Object  | the output of dox as a parsed JSON object        |
| `readme`  | boolean | whether to output a readme or just docs          |
| `package` | Object  | a parsed package.json                            |
| `travis`  | boolean | whether to output a travis badge along with docs |


### Example

```js
// this is just an example example
var foo = 2 * 2;
```


**Returns** `String`, documentation

