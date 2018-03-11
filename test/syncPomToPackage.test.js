/* global describe, it */
const syncPomToPackage = require('../index');
const fs = require('fs');
const path = require('path');
const {expect} = require('chai');

const PACKAGE = '{"version":"0.0.0"}';
const PACKAGE_FILE = path.join(__dirname, 'package.json');
const POM = '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"><version>0.0.1-SNAPSHOT</version></project>';
const POM_FILE = path.join(__dirname, 'pom.xml');

describe('syncPomToPackage', () => {
    let cwd = process.cwd();
    before(() => {
        process.chdir(__dirname);
        fs.writeFileSync(PACKAGE_FILE, PACKAGE);
        fs.writeFileSync(POM_FILE, POM);
    });
    after(() => {
        process.chdir(cwd);
        fs.unlinkSync(PACKAGE_FILE);
        fs.unlinkSync(POM_FILE);
    })
    it('should sync pom.xml version to package.json version', () => {
        syncPomToPackage(POM_FILE, PACKAGE_FILE);
        expect(require(PACKAGE_FILE).version).to.equal('0.0.1-SNAPSHOT');
    });
    it('should use pom.xml in current directory if value is undefined', () => {
        syncPomToPackage(undefined, PACKAGE_FILE);
        expect(require(PACKAGE_FILE).version).to.equal('0.0.1-SNAPSHOT');
    });
    it('should use package.json in current directory if value is undefined', () => {
        syncPomToPackage(POM_FILE, undefined);
        expect(require(PACKAGE_FILE).version).to.equal('0.0.1-SNAPSHOT');
    });
    it('should throw an error if pom.xml doesnt exist', () => {
        expect(syncPomToPackage.bind(this, 'non-existing-pom.xml', PACKAGE_FILE)).to.throw();
    });
    it('should throw an error if package.json doesnt exist', () => {
        expect(syncPomToPackage.bind(this, POM_FILE, 'non-existing-package.json')).to.throw();
    });
})
