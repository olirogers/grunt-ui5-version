/**
 * grunt-ui5-version
 * Simple Versioning utility for SAPUI5 applications by altering manifest file
 * application version component so that we can automate build process.
 *
 * @since  June 2016
 * @author Oliver Rogers
 */

"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "tasks/*.js",
                "<%= nodeunit.tests %>"
            ],
            options: {
                jshintrc: ".jshintrc",
                reporterOutput: ""
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ["tmp"]
        },

        // Configuration to be run (and then tested).
        ui5_version: {
            default_options: {
                options: {},
                src: "test/fixtures/manifest.json",
                dest: "tmp/default_options.json"
            },
            advanced: {
                options: {
                    spacing: 2,
                    defaultTag: "Version X",
                    defaultSha: "default"
                },
                src: "test/fixtures/manifest.json",
                dest: "tmp/advanced.json"
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"]
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask("test", ["clean", "ui5_version", "nodeunit"]);

    // By default, lint and run all tests.
    grunt.registerTask("default", ["jshint", "test"]);

};
