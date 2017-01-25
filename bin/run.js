const FileReader = require('../src/FileReader.js');
const Transpiler = require('../src/Transpiler');
const StringDecoder = require('string_decoder').StringDecoder;

const path = process.argv[2];
const output_path = process.argv[3];
const reader = new FileReader();
const decoder = new StringDecoder('utf8');
const transpiler = new Transpiler();

if(!path) {
    return console.error('Missing file path');
}
if(!output_path) {
    console.log('No output file was specified, output will be printed to console.');
}

reader.read(path, (data) => {
    transpiler.toJSX(data);
});
