import { describe, beforeEach, afterEach, it } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';

import FileReader from '../src/FileReader.js';

function setup() {
    	
}

describe('FileReader:', function() {
    it('Given a valid path, should read the entire file.', function() {
        const fr = new FileReader();
        const data = fr.read('./testfile.twig');
        expect(data.code).to.equal(0);
    });
});
