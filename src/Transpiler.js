const _ = require('lodash');

class Transpiler {
    constructor() {
        // todo: Add support for user defined settings and remove case specific mappings (app)
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
            '%}': '[CLOSE_TAG]',
        };
    }

    toJSX(data) {
        let output_str = '';
        let buffer = '';
        let current_open_tag = false;

        for(let x = 0; x < data.length; x++) {
            for(let y = 0; y < data[x].length; y++) {
                buffer = buffer !== '' ? buffer + data[x][y] : data[x][y];
                const mapped = this.map(buffer, current_open_tag);
                if(!mapped) {
                    if(x === data.length-1 && y === data[x].length-1) {
                        output_str += buffer;
                    }
                    continue;
                }
                else {
                    if(mapped.open_tag) {
                        current_open_tag = mapped.open_tag === '[RESET]' ? false : mapped.open_tag;
                    }

                    output_str += buffer.replace(mapped.original, mapped.new);
                    buffer = '';
                }
            }
        }

        return output_str;
    }

    map(char, current_open_tag) {
        let mapped = false;
        let mappee = '';

        if(this.mapping[char]) {
            // Direct match
            return new Match(char, this.mapping[char], current_open_tag);
        }
        else {
            // Entire string does not match but maybe part of it will
            let found = false;
            _.forEach(Object.keys(this.mapping), (key) => {
                for(let x = 0; x < char.length; x++) {
                    if(char.substr(x) === key) {
                        mapped = true;
                        mappee = char.substr(x);
                        found = true;
                        break;
                    }
                }
                if(found) {
                    return false;
                }
            });
            if(mapped) {
                return new Match(mappee, this.mapping[mappee], current_open_tag);
            }
        }
        
        return false; 
    }
}

class Match {
    constructor(mappee, mapping, current_tag) {
        this.original = mappee;
        this.new = mapping;
        this.open_tag = current_tag || false;

        if(this.new.includes('<')) {
            const tag_start = this.new.indexOf('<');
            const end_of_tag_start = this.new.indexOf(' ', tag_start)-1;
            this.open_tag = this.new.substr(tag_start + 1, end_of_tag_start);
        }

        switch(this.new) {
            case '[CLOSE_TAG]':
                if(this.open_tag) {
                    switch(this.open_tag) {
                        case 'If':
                            this.new = '}>';
                            break;
                        default:
                            this.new = '>';
                            break;
                    }
                }
                else {
                    this.new = this.original;
                    this.open_tag = '[RESET]';
                }
                break;
            default:
                break
        }
    }
}

module.exports = Transpiler;
