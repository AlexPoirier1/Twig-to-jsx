const _ = require('lodash');

class Transpiler {
    constructor() {
        this.mapping = {
            '{% if': '<If condition={',
            ' app.': ' $.app.',
            '==': '===',
            '{% endif %}': '</If>',
            'class=': 'className=',
            'onclick': 'onClick',
            ' not ': '!',
            ' and ': '&&',
            ' or ': '||',
            '{#': '{/*',
            '#}': '*/}',
            '{{ ': '{',
            ' }}': '}',
            '|join': '.join',
        };
    }

    toJSX(data) {
        let output_str = '';
        let buffer = '';
        for(let x = 0; x < data.length; x++) {
            for(let y = 0; y < data[x].length; y++) {
                buffer = buffer !== '' ? buffer + data[x][y] : data[x][y];
                const mapped = this.map(buffer);
                if(!mapped) {
                    if(x === data.length-1 && y === data[x].length-1) {
                        output_str += buffer;
                    }
                    continue;
                }
                else {
                    output_str += buffer.replace(mapped.original, mapped.new);
                    buffer = '';
                }
            }
        }

        return output_str;
    }

    map(char) {
        let mapped = false;
        let mappee = '';
        if(this.mapping[char]) {
            return new Match(char, this.mapping[char]);
        }
        else {
            _.forEach(Object.keys(this.mapping), (key) => {
                for(let x = 0; x < char.length; x++) {
                    if(char.substr(x) === key) {
                        mapped = true;
                        mappee = char.substr(x);
                    }
                }
            });
            if(mapped) {
                return new Match(mappee, this.mapping[mappee]);
            }
        }
        
        return false; 
    }
}

class Match {
    constructor(mappee, mapping) {
        this.original = mappee;
        this.new = mapping;
    }
}

module.exports = Transpiler;
