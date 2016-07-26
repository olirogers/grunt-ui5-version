/**
 * grunt-ui5-version
 * Simple Versioning utility for SAPUI5 applications by altering manifest file
 * application version component so that we can automate build process.
 *
 * @since  June 2016
 * @author Oliver Rogers
 */

"use strict";

var async = require("async"),
    Git   = require("git-wrapper");


module.exports = function (grunt) {

    // Register our task
    grunt.registerMultiTask('ui5_version', 'Versioning for UI5', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
                defaultTag: "No Tag Found",
                defaultSha: "Not GIT?",
                spacing: 0
            }),
            done    = this.async(),
            files   = this.files,
            git     = new Git();

        // Grab info from GIT Commit
        async.auto({
            sha: async.apply(git.exec.bind(git), "rev-parse", ["--verify HEAD"]),
            tag: async.apply(git.exec.bind(git), "describe", ["--abbrev=0"])
        }, function (err, result) {
            if (err) {
                grunt.log.writeln("UI5 Version: potential error detected, please check configuration.");
                grunt.log.writeln(err);
            }

            // Use the current tag
            result = result || {};
            result.tag = result.tag || options.defaultTag;
            result.tag = result.tag.trim();

            // Use the current commit SHA
            result.sha = result.sha || options.defaultSha;
            result.sha = result.sha.slice(0, 8);
            result.version  = result.tag + " (" + result.sha + ")";
            grunt.log.writeln("UI5 Version: calculated version as \"" + result.version + "\"");

            // Iterate over all specified file groups.
            files.forEach(function (fGroup) {

                // Read each JSON file in
                fGroup.src.forEach(function (filePath) {
                    // Read the file in
                    var file = grunt.file.readJSON(filePath) || {};
                    grunt.log.writeln("UI5 Version: processing file \"" + filePath + "\"");

                    // Ensure file contains the valid sap.app JSON
                    file["sap.app"]  =  file["sap.app"] || {};
                    file["sap.app"].applicationVersion = file["sap.app"].applicationVersion || {};
                    file["sap.app"].applicationVersion.version = result.version;

                    // Write the destination file.
                    grunt.file.write(fGroup.dest, JSON.stringify(file, null, options.spacing));
                });

                // Print a success message.
                grunt.log.writeln("UI5 Version: writing file \"" + fGroup.dest + "\"");
            });

            // Signal done to Grunt
            done();
        });
    });
};
