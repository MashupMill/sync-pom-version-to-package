#!/usr/bin/env node
const syncPomToPackage = require('./syncPomToPackage');
const parser = new (require('argparse').ArgumentParser)({
    addHelp: true,
    description: 'Sync pom.xml version to the package.json.\nUsage: $0'
});
parser.addArgument(['--prerelease-suffix'], { defaultValue: '', help: 'Suffix string to apply to the version if it is a prerelease version' });
const args = parser.parseArgs();

syncPomToPackage(undefined, undefined, { prereleaseSuffix: args.prerelease_suffix });
