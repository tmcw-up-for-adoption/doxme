var striptags = require('striptags');

function find (array, func) {
    if (!Array.isArray(array)) return undefined;

    var index = 0, length = array.length;
    while (index < length) {
        if (func(array[index], index, array)) return array[index];
        index++;
    }
}

module.exports.getTags = function(tags, type) {
    return tags.filter(function(t) { return t.type === type; });
};

module.exports.getTag = function getTag (tags, type) {
    if (Array.isArray(type)) return getTag(
        tags,
        find(type, function (singleType) { return getTag(tags, singleType); })
    );
    return find(tags, function(t) { return t.type === type; });
};

module.exports.reformat = function(str) {
    return striptags(str.replace('<br />', ' ').replace(/{\@\w+\s*([^}]+)\s*}/g, '$1'));
};

module.exports.escape = function(str) {
    return str.replace(/([\\`*_{}\[\]()<>#+-.!])/g, '\\$1');
};
