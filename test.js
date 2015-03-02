var test = require('tape'),
    dox = require('dox'),
    doxme = require('./index.js'),
    fs = require('fs');

test('doxme', function(t) {
    t.test('bare', function(tt) {
        var bare = doxme(dox.parseComments(fs.readFileSync('./index.js', 'utf8')));
        if (process.env.UPDATE) { fs.writeFileSync('test/bare.md', bare); }
        tt.equal(bare, fs.readFileSync('test/bare.md', 'utf8'));
        tt.end();
    });
    t.test('readme', function(tt) {
        var readme = doxme(
            dox.parseComments(fs.readFileSync('./index.js', 'utf8')),
            true,
            require('./package.json'));
        if (process.env.UPDATE) { fs.writeFileSync('test/readme.md', readme); }
        tt.equal(readme, fs.readFileSync('test/readme.md', 'utf8'));
        tt.end();
    });
    t.test('readme + travis', function(tt) {
        var readme = doxme(
            dox.parseComments(fs.readFileSync('./index.js', 'utf8')),
            true,
            require('./package.json'),
            true);
        if (process.env.UPDATE) { fs.writeFileSync('test/travis.md', readme); }
        tt.equal(readme, fs.readFileSync('test/travis.md', 'utf8'));
        tt.end();
    });
    t.test('@return synonym', function(tt) {
        var result = doxme(dox.parseComments(fs.readFileSync('./test/return.js', 'utf8')));
        if (process.env.UPDATE) { fs.writeFileSync('test/return.md', result); }
        tt.equal(result, fs.readFileSync('test/return.md', 'utf8'));
        tt.end();
    });
    t.test('@function tag', function(tt) {
        var result = doxme(dox.parseComments(fs.readFileSync('./test/function.js', 'utf8')));
        if (process.env.UPDATE) { fs.writeFileSync('test/function.md', result); }
        tt.equal(result, fs.readFileSync('test/function.md', 'utf8'));
        tt.end();
    });
    t.test('params', function(tt) {
        var result = doxme(dox.parseComments(fs.readFileSync('./test/params.js', 'utf8')));
        if (process.env.UPDATE) { fs.writeFileSync('test/params.md', result); }
        tt.equal(result, fs.readFileSync('test/params.md', 'utf8'));
        tt.end();
    });
    t.test('private', function(tt) {
        var result = doxme(dox.parseComments(fs.readFileSync('./test/private.js', 'utf8')));
        if (process.env.UPDATE) { fs.writeFileSync('test/private.md', result); }
        tt.equal(result, fs.readFileSync('test/private.md', 'utf8'));
        tt.end();
    });
    t.end();
});
