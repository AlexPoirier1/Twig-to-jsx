const filesystem = require('fs');

const Error = require('./Error.js');

class FileReader {
    constructor() {
        this.files = [];
    }

    read(path, callback) {
        this.files.push(path);

        const output = [];
        const readable = filesystem.createReadStream(path, {
            encoding: 'utf8',
            fd: null,
        });
        readable.on('readable', function() {
            let chunk;
            while (null !== (chunk = readable.read(1))) {
                output.push(chunk); 
            }
            callback(output);
        });
    }
}

module.exports = FileReader;
