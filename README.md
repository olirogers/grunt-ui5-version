# grunt-ui5-version

> Versioning for UI5

Add a version to the UI5 manifest file based on the current GIT version. It will create a version similar to "1.2.3 (991ABCD9)" where "1.2.3" is the last tag in the version history and "991ABCD9" is the first 8 characters of the current commit SHA.

This will allow you to automatically version UI5 applications when deploying through a continuous integration framework (like Gitlab CI or Jenkins).

## Getting Started
This plugin requires Grunt `~1.0.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ui5-version --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ui5-version');
```

## The "ui5_version" task

### Overview
In your project's Gruntfile, add a section named `ui5_version` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ui5_version: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.spacing
Type: `Number`
Default value: `0`

A numeric value for JSON.stringify call to pretty print the outputted JSON file.

#### options.defaultTag
Type: `String`
Default value: `No Tag Found`

What to display if no tag is found. This could be used to detect any error in the deployment process.

#### options.defaultSha
Type: `String`
Default value: `Not GIT?`

What to display if no GIT commit SHA is found (limit 8 characters). If you are not using GIT, I am not sure why you would use this grunt task?


### Usage Examples

#### Default Options
In this example, the default options are used to add the current git commit sha and git version to the src manifest.json and write in the dest manifest.json file.

```js
grunt.initConfig({
  ui5_version: {
    src: "src/manifest.json",
    dest: "dest/manifest.json"
  },
});
```

#### Advanced Options
The same example as above however we specify what to output in case of no tag or sha found. Additionally the output is formatted with 2 spaces.

```js
grunt.initConfig({
  ui5_version: {
    options: {
        spacing: 2,
        defaultTag: "Version X",
        defaultSha: "default"
    },
    src: "src/manifest.json",
    dest: "dest/manifest.json"
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.1.1 Properly add and document additional options for tag/commit.

0.1.0 Initial Version
