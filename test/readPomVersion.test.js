const readPomVersion = require('../src/readPomVersion');
const fs = require('fs');
const path = require('path');
const {expect} = require('chai');

const VALID_POM = '<project xmlns="http://maven.apache.org/POM/4.0.0"><version>0.0.1-SNAPSHOT</version></project>';
const VALID_POM_CHILD = '<project xmlns="http://maven.apache.org/POM/4.0.0"><parent><version>0.0.2-SNAPSHOT</version></parent></project>';
const VALIDE_POM_CHILD_OVERRIDE = '<project xmlns="http://maven.apache.org/POM/4.0.0"><parent><version>0.0.2-SNAPSHOT</version></parent><version>0.0.3-SNAPSHOT</version></project>';
const INVALID_POM = '<project xmlns="http://maven.apache.org/POM/4.0.0"></project>';
const FILE = path.join(__dirname, 'pom.xml');
const FILE_MODULE_CHILD = path.join(__dirname, 'pom-child.xml');
const FILE_MODULE_OVERRIDE = path.join(__dirname, 'pom-child-override.xml')

describe('readPomVersion', () => {
    before(() => {
        fs.writeFileSync(FILE, VALID_POM);
        fs.writeFileSync(FILE_MODULE_CHILD, VALID_POM_CHILD);
        fs.writeFileSync(FILE_MODULE_OVERRIDE, VALIDE_POM_CHILD_OVERRIDE);
    });
    after(() => {
        fs.unlinkSync(FILE);
        fs.unlinkSync(FILE_MODULE_CHILD);
        fs.unlinkSync(FILE_MODULE_OVERRIDE);
    });
    it('should read version from pom', () => {
        expect(readPomVersion(FILE)).to.equal('0.0.1-SNAPSHOT');
    });
    it('should read parent version from pom', () => {
        expect(readPomVersion(FILE_MODULE_CHILD)).to.equal('0.0.2-SNAPSHOT');
    });
    it('should read version override from pom', () => {
        expect(readPomVersion(FILE_MODULE_OVERRIDE)).to.equal('0.0.3-SNAPSHOT');
    });
    it('should throw an error if pom doesn\'t exist', () => {
        expect(readPomVersion.bind(this, 'non-existing-pom.xml')).to.throw();
    });
    it('should throw an error if the pom doesn\'t have a version', () => {
        fs.writeFileSync(FILE, INVALID_POM);
        expect(readPomVersion.bind(this, FILE)).to.throw();
    });
});
