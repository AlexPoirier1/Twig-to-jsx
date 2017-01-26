const filesystem = require('fs');

const Error = require('./Error.js');

class FileHelper {
    constructor() {
    }

    read(path, callback) {
        const output = [[]];
        let x = 0;
        let chunks = 0;

        const readable = filesystem.createReadStream(path, {
            encoding: 'utf8',
            fd: null,
        });

        let lock = false;
        readable.on('readable', function() {
            if(!lock) {
                let chunk;
                lock = true;
            
                while (null !== (chunk = readable.read(1))) {
                    if(x % 1000 === 0 && x !== 0) { // Separate in 1000 char chunks.
                        chunks++;
                        output.push([]);
                    }
                    output[chunks].push(chunk); 
                    x++;
                }
                callback(output);
            }
            
        });
    }

    output(path, data, callback) {
        filesystem.writeFile(path, data, (err) => {
            if(err) {
                return console.error(err);
            }
            callback(1);
        });
    }
}

module.exports = FileHelper;
