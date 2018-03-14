/* global describe, it */
const convertToSemver = require('../src/convertToSemver');
const {expect} = require('chai');

describe('convertToSemver', () => {
    it('should return same version if its a release version (i.e. 1.0.0)', () => {
        const v = '1.0.0';
        expect(convertToSemver(v)).to.equal(v);
    });
    it('should return same version if its a pre-release version (i.e. 1.0.0-beta)', () => {
        const v = '1.0.0-beta';
        expect(convertToSemver(v)).to.equal(v);
    });
    it('should set version as the pre-release version if it doesn\'t match semver (i.e. 0-SNAPSHOT => 0.0.0-SNAPSHOT)', () => {
        expect(convertToSemver('0.0-SNAPSHOT')).to.equal('0.0.0-SNAPSHOT');
    });
    it('should strip out invalid characters (i.e. 0-SN@PSHOT => 0.0.0-SNPSHOT)', () => {
        expect(convertToSemver('0-SN@PSHOT')).to.equal('0.0.0-SNPSHOT');
    });
    it('should add entire version as pre-release if pattern cannot be determined (i.e. beta => 0.0.0-beta)', () => {
        expect(convertToSemver('beta')).to.equal('0.0.0-beta')
    });
    it('should fill out version with build meta data', () => {
        expect(convertToSemver('1+20180301121212')).to.equal('1.0.0+20180301121212');
    });
    it('should strip out invalid characters at the beginning and end', () => {
        expect(convertToSemver('..1.0.0-SNAPSHOT...')).to.equal('1.0.0-SNAPSHOT');
    })
});
