class Transpiler {
    constructor() {
        this.map = {
            '{% if': '<If',
            'app.': '$.app.',
            '==': '===',
            '{% endif %}': '</If>',
            'class': 'className',
            'onclick': 'onClick',
            'not': '!',
            'and': '&&',
            'or': '||',
            '{#': '{/*',
            '#}': '*/}',
            '{{ ': '{',
            ' }}': '}',
            '|join': '.join',
        };
    }

    toJSX(read_file) {
        let new_file;
        return new_file;
    }

    map(char) {
        
    }
}

module.exports = Transpiler;
