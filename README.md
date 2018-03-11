# sync-pom-version-to-package

[![Build Status](https://travis-ci.org/MashupMill/sync-pom-version-to-package.svg?branch=master)](https://travis-ci.org/MashupMill/sync-pom-version-to-package)

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