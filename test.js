var test = require('tape'),
    dox = require('dox'),
    doxme = require('./index.js'),
    fs = require('fs');

test('doxme', function(t) {
    t.test('bare', function(t) {
        var bare = doxme(dox.parseComments(fs.readFileSync('./index.js', 'utf8')));
        if (process.env.UPDATE) { fs.writeFileSync('test/bare.md', bare); }
        t.equal(bare, fs.readFileSync('test/bare.md', 'utf8'));
        t.end();
    });
    t.test('readme', function(t) {
        var readme = doxme(
            dox.parseComments(fs.readFileSync('./index.js', 'utf8')),
            true,
            require('./package.json'));
        if (process.env.UPDATE) { fs.writeFileSync('test/readme.md', readme); }
        t.equal(readme, fs.readFileSync('test/readme.md', 'utf8'));
        t.end();
    });
    t.test('readme + travis', function(t) {
        var readme = doxme(
            dox.parseComments(fs.readFileSync('./index.js', 'utf8')),
            true,
            require('./package.json'),
            true);
        if (process.env.UPDATE) { fs.writeFileSync('test/travis.md', readme); }
        t.equal(readme, fs.readFileSync('test/travis.md', 'utf8'));
        t.end();
    });
    t.test('@return synonym', function(t) {
        var result = doxme(dox.parseComments(fs.readFileSync('./test/return.js', 'utf8')));
        if (process.env.UPDATE) { fs.writeFileSync('test/return.md', result); }
        t.equal(result, fs.readFileSync('test/return.md', 'utf8'));
        t.end();
    });
    t.test('@function tag', function(t) {
        var result = doxme(dox.parseComments(fs.readFileSync('./test/function.js', 'utf8')));
        if (process.env.UPDATE) { fs.writeFileSync('test/function.md', result); }
        t.equal(result, fs.readFileSync('test/function.md', 'utf8'));
        t.end();
    });
    t.test('params', function(t) {
        var result = doxme(dox.parseComments(fs.readFileSync('./test/params.js', 'utf8')));
        if (process.env.UPDATE) { fs.writeFileSync('test/params.md', result); }
        t.equal(result, fs.readFileSync('test/params.md', 'utf8'));
        t.end();
    });
    t.end();
});
