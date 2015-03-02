var util = require('./util.js'),
    repoPathParse = require('repo-path-parse'),
    table = require('markdown-table'),
    reformat = util.reformat,
    escape = util.escape,
    getTag = util.getTag,
    getTags = util.getTags,
    u = require('util');

/**
 * A [Markdown](http://daringfireball.net/projects/markdown/) formatter
 * for [dox](https://github.com/tj/dox). Takes dox's JSON output as stdin
 * and writes Markdown to stdout.
 *
 * * Generates API documentation as well as entire READMEs (like this one!)
 * * README generation supports [Travis-CI](https://travis-ci.org/) badges
 *
 * ## CLI Usage
 *
 *     dox -r < index.js | doxme
 *
 * The `doxme` bin supports one important option: `--readme`. When
 * provided, it generates a full README.md file, including title,
 * description, installation and test instructions, and a
 * [Travis-CI](https://travis-ci.org/) badge if the project is tested
 * with travis.
 *
 *     dox -r < index.js | doxme --readme > README.md
 *
 * ## See Also
 *
 * * [gulp-doxme](https://github.com/tomekwi/gulp-doxme) runs doxme within a
 *   [Gulp](http://gulpjs.com/) pipeline
 *
 * @module doxme
 * @param {Object} dox the output of dox as a parsed JSON object
 * @param {boolean} readme whether to output a readme or just docs
 * @param {Object} package a parsed package.json
 * @param {boolean} travis whether to output a travis badge along with docs
 * @returns {String} documentation
 * @example
 * var fs = require('fs');
 * var dox = require('dox');
 * var doxme = require('doxme');
 *
 * var sourceCode = fs.readFileSync('./index.js', 'utf8');
 * var documentation = doxme(dox.parseComments(sourceCode));
 */

module.exports = function(dox, readme, pkg, travis) {

    var output = '';

    function log() {
        output += u.format.apply(u, arguments) + '\n';
    }

    if (readme) {
        log('# ' + pkg.name + '\n');

        if (travis) {
            var repoInfo = repoPathParse(pkg.repository.url);
            log('[![build status](https://secure.travis-ci.org/%s/%s.png)](http://travis-ci.org/%s/%s)\n',
                 repoInfo.owner, repoInfo.repo, repoInfo.owner, repoInfo.repo);
        }

        log(pkg.description + '\n');
    }

    dox.forEach(function(d) {
        var access = getTag(d.tags, 'access');
        // do not generate documentation for private members
        if (access && access.string === 'private') return;
        var name = '';
        var alias = getTag(d.tags, ['alias', 'function', 'func', 'method']);
        var mod = getTag(d.tags, 'module');
        if (alias) {
            name = alias.string;
        } else if (mod) {
            name = mod.string.replace('/', '.');
        } else {
            name = d.ctx && d.ctx.name;
        }
        if (name !== '') {
            var args = getTags(d.tags, 'param').map(function(p) {
                return p.name;
            }).join(', ');
            if (args) {
                log('\n### `%s(%s)`\n', name, args);
            } else {
                log('\n### `%s`\n', name);
            }
            if (d.description) {
                log('%s\n', reformat(d.description.full));
            }

            var params = getTags(d.tags, 'param');

            if (params.length) {
                log('### Parameters\n');
                log(table(
                    [['parameter', 'type', 'description']]
                        .concat(params.map(function(p) {
                            var type = p.typesDescription.match(/^{/) ?
                                p.typesDescription.replace(/\|/g, '/') :
                                escape(p.types.join(','));
                            return ['`' + p.name + '`', type,
                                (p.optional ? '_optional:_ ' : '') +
                                reformat(p.description)];
                        }))
                ));
                log('\n');
            }

            var examples = getTags(d.tags, 'example');
            if (examples.length) {
                log('### Example');
                examples.forEach(function(p) {
                    log('\n```js\n%s\n```\n', p.string);
                });
            }

            var returns = getTag(d.tags, ['returns', 'return']);
            if (returns) {
                log('\n**Returns** `%s`, %s\n', returns.types.join(','), reformat(returns.description));
            }
        }
    });

    if (readme) {
        log('## Installation\n');
        log('Requires [nodejs](http://nodejs.org/).\n');
        log('```sh\n$ npm install ' + pkg.name + '\n```\n');

        if (pkg.scripts && pkg.scripts.test) {
            log('## Tests\n\n```sh\n$ npm test\n```\n');
        }
    }

    return output;
};
