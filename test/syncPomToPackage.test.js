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
    beforeEach(() => {
        process.chdir(__dirname);
        fs.writeFileSync(PACKAGE_FILE, PACKAGE);
        fs.writeFileSync(POM_FILE, POM);
    });
    afterEach(() => {
        process.chdir(cwd);
        fs.unlinkSync(PACKAGE_FILE);
        fs.unlinkSync(POM_FILE);
    });
    it('should sync pom.xml version to package.json version', () => {
        return syncPomToPackage(POM_FILE, PACKAGE_FILE).then(() => {
            expect(require(PACKAGE_FILE).version).to.equal('0.0.1-SNAPSHOT');
        });

    });
    it('should use pom.xml in current directory if value is undefined', () => {
        return syncPomToPackage(undefined, PACKAGE_FILE).then(() => {
            expect(require(PACKAGE_FILE).version).to.equal('0.0.1-SNAPSHOT');
        });

    });
    it('should use package.json in current directory if value is undefined', () => {
        return syncPomToPackage(POM_FILE, undefined).then(() => {
            expect(require(PACKAGE_FILE).version).to.equal('0.0.1-SNAPSHOT');
        });

    });
    it('should throw an error if pom.xml doesnt exist', () => {
        expect(syncPomToPackage.bind(this, 'non-existing-pom.xml', PACKAGE_FILE)).to.throw();
    });
    it('should throw an error if package.json doesnt exist', () => {
        expect(syncPomToPackage.bind(this, POM_FILE, 'non-existing-package.json')).to.throw();
    });
    it('should append the prerelease suffix if provided and the version already contains a prerelease label', () => {
        return syncPomToPackage(POM_FILE, PACKAGE_FILE, { prereleaseSuffix: '.0' }).then(() => {
            expect(require(PACKAGE_FILE).version).to.equal('0.0.1-SNAPSHOT.0');
        });
    });
    it('should not append the prerelease suffix if the version is a release version', () => {
        fs.writeFileSync(POM_FILE, POM.replace('0.0.1-SNAPSHOT', '1.0.0'));
        return syncPomToPackage(POM_FILE, PACKAGE_FILE, { prereleaseSuffix: '.0' }).then(() => {
            expect(require(PACKAGE_FILE).version).to.equal('1.0.0');
        });
    });
    it('should strip invalid characters from the end of the version', () => {
        return syncPomToPackage(POM_FILE, PACKAGE_FILE, { prereleaseSuffix: '...' }).then(() => {
            expect(require(PACKAGE_FILE).version).to.equal('0.0.1-SNAPSHOT');
        });
    });
});
