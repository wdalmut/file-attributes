const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

var FileAttribute = function(path) {
  if (!(this instanceof FileAttribute)) {
    return new FileAttribute(path);
  }

  this.path = path;
};

FileAttribute.prototype.set = function(filepath, value, callback) {
  var finalPath = path.join(this.path, filepath);

  mkdirp(path.dirname(finalPath), function(err) {

    if (err) {
      return callback(err, null);
    }

    fs.writeFile(finalPath, value, (err) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, value);
    });
  });
};

FileAttribute.prototype.get = function(filepath, callback) {
  var finalPath = path.join(this.path, filepath);

  fs.readFile(finalPath, 'utf8', callback);
};

module.exports = FileAttribute;
