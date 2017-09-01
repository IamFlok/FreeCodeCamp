var fs = require("fs");
const path = require('path');

module.exports = function(dir, ext, callback) {

    fs.readdir(dir, function(err, data) {
        if (err) {
            return callback(err);
        }

        var extension = "." + ext;
        data = data.filter(function(elem) {
            return extension === path.extname(elem);
        });

        callback(null, data);
    });
}
