var assert = require('assert');
var vscode = require('vscode');
var mocha = require('mocha');
var myExtension = require('../extension');

mocha.suite("Extension Tests", function() {

    // Defines a Mocha unit test
    mocha.test("Something 1", function() {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });
});