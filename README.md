# sync-pom-version-to-package


[![npm](https://img.shields.io/npm/v/sync-pom-version-to-package.svg?style=for-the-badge)](https://www.npmjs.com/package/sync-pom-version-to-package)
[![npm](https://img.shields.io/npm/dm/sync-pom-version-to-package.svg?style=for-the-badge)](https://npmjs.org/package/sync-pom-version-to-package)
[![GitHub issues](https://img.shields.io/github/issues-raw/MashupMill/sync-pom-version-to-package.svg?style=for-the-badge)](https://github.com/MashupMill/sync-pom-version-to-package/issues)

[![Travis](https://img.shields.io/travis/MashupMill/sync-pom-version-to-package.svg?style=for-the-badge)](https://travis-ci.org/MashupMill/sync-pom-version-to-package)
[![Coveralls github](https://img.shields.io/coveralls/github/MashupMill/sync-pom-version-to-package.svg?style=for-the-badge)](https://coveralls.io/github/MashupMill/sync-pom-version-to-package)
[![David](https://img.shields.io/david/MashupMill/sync-pom-version-to-package.svg?style=for-the-badge)](https://david-dm.org/MashupMill/sync-pom-version-to-package)

Synchronizes the pom version to the package.json. Useful for applications that rely on maven pom's for building the application.

## Usage

### Auto sync version on `postinstall`
```json
{
    "scripts": {
        "postinstall": "sync-pom-version"
    }
}
```


### Auto sync from maven using the `frontend-maven-plugin`

#### First add script to `package.json`

```json
{
    "scripts": {
        "sync-pom-version": "sync-pom-version"
    }
}
```

#### Setup the `frontend-maven-plugin`

```xml
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.6</version>
    <configuration>
        <nodeVersion>v6.9.1</nodeVersion>
        <yarnVersion>v0.16.1</yarnVersion>
    </configuration>
    <executions>
        <execution>
            <id>install node and yarn</id>
            <goals>
                <goal>install-node-and-yarn</goal>
            </goals>
        </execution>
        <execution>
            <id>sync version to package.json</id>
            <goals>
                <goal>yarn</goal>
            </goals>
            <configuration>
                <arguments>sync-pom-version</arguments>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### Options
| Name | Description |
| --- | --- |
| `--prerelease-suffix` | Suffix string to apply to the version if it is a prerelease version. If the pom version is a release version, this value is ignored. This can be useful if you want your maven build to append a build number or timestamp to the version, so each build would push up a unique version for `SNAPSHOT` versions. So if I added `--prerelease-suffix '.0'` and the pom version is something like `1.0.0-SNAPSHOT`, the resulting version would be `1.0.0-SNAPSHOT.0`. But if the pom version was `1.0.0`, the resulting version would still be `1.0.0`.  |
| `--pom-file` | Location of the `pom.xml` file. Defaults to use `./pom.xml` |
| `--package-file` | Location of the `package.json` file. Defaults to use `./package.json` |
| `--use-yarn` | Use yarn to update version instead of npm |

> Adding options in the `frontend-maven-plugin` can be done by setting the `arguments` like this: 
> `<arguments>sync-pom-version -- --prerelease-version=.0</arguments>`
> or
> `<arguments>sync-pom-version -- --prerelease-version=.${BUILD_NUMBER}</arguments>`
