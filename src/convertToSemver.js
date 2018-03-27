const semverRegex = require('semver-regex');

module.exports = (version) => {
    // already matches semver...lets use it
    if (semverRegex().test(version)) {
        // apparently semver-regex allows the period at the beginning and end (i.e. it sees ".1.0.0-SNAPSHOT." as valid)
        // ...so adding cleanVersion in here as well
        return cleanVersion(version);
    }

    const newVersion = parseNewVersion(version);

    if (newVersion) {
        return cleanVersion(newVersion);
    }

    // no match ^ found, we'll juse use the version as the pre-release tag and use 0.0.0 as the version
    return cleanVersion(`0.0.0-${version}`);
};

const cleanVersion = (version) => {
    return version
        .replace(/^[^0-9]*/, '')
        .replace(/[^0-9A-Za-z]*$/, '')
        .replace(/[^0-9A-Za-z-.+]/, '');
};

const parseNewVersion = (version) => {
    // match against a pattern where we could extract a semver and label (i.e. 1-SNAPSHOT, 1.0-SNAPSHOT, etc)
    const match = version.match(/^(\d+)(\.\d+)?(\.\d+)?(-.+)?(\+.+)?/);
    if (!match) {
        return null;
    }
    // we were able to parse out some stuff to get a major and possibly a minor and patch and a pre-release label
    // note: elision lets us skip unused parameters: http://2ality.com/2015/01/es6-destructuring.html#elision
    const [, major, minor = '.0', patch = '.0', prerelease = '', buildMeta = ''] = match;

    // construct a new version using `major.minor.patch-label` (and strip out invalid characters)
    return `${major}${minor}${patch}${prerelease}${buildMeta}`.replace(/[^0-9A-Za-z-.+]/, '');
};
