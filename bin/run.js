const FileHelper = require('../src/FileHelper.js');
const Transpiler = require('../src/Transpiler');
const StringDecoder = require('string_decoder').StringDecoder;

const path = process.argv[2];
const output_path = process.argv[3];
const helper = new FileHelper();
const decoder = new StringDecoder('utf8');
const transpiler = new Transpiler();

if(!path) {
    return console.error('Missing file path');
}
if(!output_path) {
    console.log('No output file was specified, output will be input path + ".jsx" .');
}

helper.read(path, (data) => {
    
    const converted_str = transpiler.toJSX(data);
    helper.output(path + '.jsx', converted_str, (code) => {
        if(code === 1) {
            console.log('Conversion successful, output to file : ' + path + '.jsx');
        }
    })
    
});
