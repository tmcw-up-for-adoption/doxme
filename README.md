# doxme

[![build status](https://secure.travis-ci.org/tmcw/doxme.png)](http://travis-ci.org/tmcw/doxme)

create markdown docs for dox output


### `doxme([example="foo"])`

A [Markdown](http://daringfireball.net/projects/markdown/) formatter
for [dox](https://github.com/tj/dox). Takes dox's JSON output as stdin
and writes Markdown to stdout.

## usage

    dox -r < index.js | doxme


### Parameters

| parameter         | type   | description                                   |
| ----------------- | ------ | --------------------------------------------- |
| `[example="foo"]` | String | _optional:_ this is just an example parameter |


### Example

```js
// this is just an example example
var foo = 2 * 2;
```

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install doxme
```

## Tests

```sh
$ npm test
```

