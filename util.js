var striptags = require('striptags');

module.exports.getTags = function(tags, type) {
    return tags.filter(function(t) { return t.type === type; });
};

module.exports.getTag = function(tags, type) {
    return tags.filter(function(t) { return t.type === type; })[0];
};

module.exports.reformat = function(str) {
    return striptags(str.replace('<br />', ' ').replace(/{\@\w+\s*([^}]+)\s*}/g, '$1'));
};
