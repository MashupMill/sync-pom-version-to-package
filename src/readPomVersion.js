const fs = require('fs');
const parse = require('xml-parser');

module.exports = (file) => {
    const xml = fs.readFileSync(file, 'utf8');
    const obj = parse(xml);
    const versionIndex = obj.root.children.findIndex(child => child.name === 'version');
    if (versionIndex >= 0) {
        return obj.root.children[versionIndex].content;
    }

    // If version does not exists in a child maven module, it means version comes from parent.
    const parentIndex = obj.root.children.findIndex(child => child.name === 'parent');
    if (parentIndex >= 0) {
        const parentVersionIndex = obj.root.children[parentIndex].children.findIndex(child => child.name === 'version');
        return obj.root.children[parentIndex].children[parentVersionIndex].content;
    }
    
    throw new Error(`Could not find version in pom file ${file}`);
};
