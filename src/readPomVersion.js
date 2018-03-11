const fs = require('fs');
const parse = require('xml-parser');

module.exports = (file) => {
    const xml = fs.readFileSync(file, 'utf8');
    const obj = parse(xml);
    const versionIndex = obj.root.children.findIndex(child => child.name === 'version');
    if (versionIndex >= 0) {
        return obj.root.children[versionIndex].content;
    }
    throw new Error(`Could not find version in pom file ${file}`);
};
