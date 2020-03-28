const path = require('path');
const { spawn } = require('child_process');
const convertToSemver = require('./convertToSemver');
const readPomVersion = require('./readPomVersion');

module.exports = (pomFile = './pom.xml', packageFile = './package.json', options = {}) => {
    const pomVersion = readPomVersion(path.resolve(pomFile));
    const version = convertToSemver(pomVersion);
    const packageJson = require(path.resolve(packageFile));
    packageJson.version = version;

    if (typeof options.prereleaseSuffix !== 'undefined' && packageJson.version.indexOf('-') >= 0) {
        packageJson.version += options.prereleaseSuffix.replace(/[^0-9A-Za-z]*$/, '');
    }

    return new Promise((resolve, reject) => {
        spawn(
            'npm',
            ['version', packageJson.version, '--force', '--no-git-tag-version', '--allow-same-version'],
            { cwd: path.dirname(packageFile), stdio: 'inherit', shell : true }
        ).on('exit', code => {
            code ? reject(code) : resolve();
        });
    });
};
