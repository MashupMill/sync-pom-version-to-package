const convertToSemver = require('./convertToSemver');
const readPomVersion = require('./readPomVersion');
const fs = require('fs');
const path = require('path');

module.exports = (pomFile = path.resolve('./pom.xml'), packageFile = path.resolve('./package.json'), options = {}) => {
    const pomVersion = readPomVersion(pomFile);
    const version = convertToSemver(pomVersion);
    const packageJson = require(packageFile);
    packageJson.version = version;

    if (typeof options.prereleaseSuffix !== 'undefined' && packageJson.version.indexOf('-') >= 0) {
        packageJson.version += options.prereleaseSuffix.replace(/[^0-9A-Za-z]*$/, '');
    }

    fs.writeFileSync(packageFile, JSON.stringify(packageJson, null, 2), 'utf8');
};
