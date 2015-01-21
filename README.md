# doxme

[![build status](https://secure.travis-ci.org/tmcw/doxme.png)](http://travis-ci.org/tmcw/doxme)

create markdown docs for dox output


### `doxme`

A [Markdown](http://daringfireball.net/projects/markdown/) formatter
for [dox](https://github.com/tj/dox). Takes dox's JSON output as stdin
and writes Markdown to stdout.

## usage

    dox -r < index.js | doxme


## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install doxme
```

## Tests

```sh
$ npm test
```

