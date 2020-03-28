#!/usr/bin/env node
const syncPomToPackage = require('./syncPomToPackage');
const parser = new (require('argparse').ArgumentParser)({
    addHelp: true,
    description: 'Sync pom.xml version to the package.json.\nUsage: $0'
});
parser.addArgument(['--prerelease-suffix'], { defaultValue: '', help: 'Suffix string to apply to the version if it is a prerelease version' });
parser.addArgument(['--pom-file'], { help: 'Location of the pom.xml file. Defaults to use ./pom.xml' });
parser.addArgument(['--package-file'], { help: 'Location of the package.json file. Defaults to use ./package.json' });
const args = parser.parseArgs();

syncPomToPackage(args.pom_file || undefined, args.package_file || undefined, { prereleaseSuffix: args.prerelease_suffix });
