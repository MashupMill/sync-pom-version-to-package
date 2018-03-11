/* global describe, it */
const readPomVersion = require('../src/readPomVersion');
const fs = require('fs');
const path = require('path');
const {expect} = require('chai');

const VALID_POM = '<project xmlns="http://maven.apache.org/POM/4.0.0"><version>0.0.1-SNAPSHOT</version></project>';
const INVALID_POM = '<project xmlns="http://maven.apache.org/POM/4.0.0"></project>';
const FILE = path.join(__dirname, 'pom.xml');

describe('readPomVersion', () => {
    before(() => {
        fs.writeFileSync(FILE, VALID_POM);
    });
    after(() => {
        fs.unlinkSync(FILE);
    });
    it('should read version from pom', () => {
        expect(readPomVersion(FILE)).to.equal('0.0.1-SNAPSHOT');
    });
    it('should throw an error if pom doesn\'t exist', () => {
        expect(readPomVersion.bind(this, 'non-existing-pom.xml')).to.throw();
    });
    it('should throw an error if the pom doesn\'t have a version', () => {
        fs.writeFileSync(FILE, INVALID_POM);
        expect(readPomVersion.bind(this, FILE)).to.throw();
    });
});
