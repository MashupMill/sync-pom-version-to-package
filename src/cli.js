#!/usr/bin/env node
const syncPomToPackage = require('./syncPomToPackage');
const parser = new (require('argparse').ArgumentParser)({
    add_help: true,
    description: 'Sync pom.xml version to the package.json.\nUsage: $0'
});
parser.add_argument('--prerelease-suffix', { default: '', help: 'Suffix string to apply to the version if it is a prerelease version' });
parser.add_argument('--pom-file', { help: 'Location of the pom.xml file. Defaults to use ./pom.xml' });
parser.add_argument('--package-file', { help: 'Location of the package.json file. Defaults to use ./package.json' });
parser.add_argument('--use-yarn', { action: 'store_true', help: 'Use Yarn instead of NPM to update the version' });
const args = parser.parse_args();

syncPomToPackage(args.pom_file || undefined, args.package_file || undefined, { prereleaseSuffix: args.prerelease_suffix, useYarn: args.use_yarn });
