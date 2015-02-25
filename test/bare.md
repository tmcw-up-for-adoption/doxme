
### `doxme(dox, readme, package, travis)`

A Markdown formatter for dox. Takes dox&#39;s JSON output as stdinand writes Markdown to stdout.
Generates API documentation as well as entire READMEs (like this one!)
README generation supports Travis-CI badges

CLI Usage
dox -r &lt; index.js | doxme
The doxme bin supports one important option: --readme. Whenprovided, it generates a full README.md file, including title,description, installation and test instructions, and aTravis-CI badge if the project is testedwith travis.dox -r &lt; index.js | doxme --readme &gt; README.md
See Also

gulp-doxme runs doxme within aGulp pipeline



### Parameters

| parameter | type    | description                                      |
| --------- | ------- | ------------------------------------------------ |
| `dox`     | Object  | the output of dox as a parsed JSON object        |
| `readme`  | boolean | whether to output a readme or just docs          |
| `package` | Object  | a parsed package.json                            |
| `travis`  | boolean | whether to output a travis badge along with docs |


### Example

```js
var fs = require('fs');
var dox = require('dox');
var doxme = require('doxme');

var sourceCode = fs.readFileSync('./index.js', 'utf8');
var documentation = doxme(dox.parseComments(sourceCode));
```


**Returns** `String`, documentation

