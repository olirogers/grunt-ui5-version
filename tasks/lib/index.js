/**
 * Created by orogers on 18/06/2016.
 */

"use strict";

var async = require("async"),
    git   = new (require("git-wrapper"))();


function version(done) {

    async.auto({
        hash: async.apply(git.exec.bind(git), "rev-parse", ["--verify HEAD"]),
        tag:  async.apply(git.exec.bind(git), "describe", ["--abbrev=0"])
    }, function (err, results) {
        console.log(results);
        done();
    });
}

version(function () {
    console.log("done");
});