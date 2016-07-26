"use strict";

var grunt = require("grunt");

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.ui5_version = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    default_options: function (test) {
        var actual   = grunt.file.read("tmp/default_options.json"),
            expected = grunt.file.read("test/expected/default_options.json");

        // 1 test to be done
        test.expect(1);

        // Actual should equal expected
        test.equal(actual, expected, "should describe what the default behavior is.");

        // Signal done to framework
        test.done();
    },
    compress: function (test) {
        var actual  = grunt.file.read("tmp/advanced.json"),
            expected = grunt.file.read("test/expected/advanced.json");

        // 1 test to be done
        test.expect(1);

        // Actual should equal expected
        test.equal(actual, expected, "should describe what the custom option(s) behavior is.");

        // Signal done to framework
        test.done();
    }
};
