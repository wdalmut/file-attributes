const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = function(basepath) {
  return {
    set: function(filepath, value, callback) {

      if (typeof value === 'function') {
        callback = value;
      }

      if (!callback) {
        callback = function() {};
      }

      var finalPath = path.join(basepath, filepath);

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
    },
    get: function (filepath, callback) {
      var finalPath = path.join(basepath, filepath);

      if (!callback) {
        callback = function() {};
      }

      fs.readFile(finalPath, 'utf8', callback);
    },
  };
};

