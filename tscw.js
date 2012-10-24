#!/usr/bin/env node
/**
 * tscw binary file for usage with node.js via npm
 *
 * @author Pavel Ptacek
 */

/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

/**
 * Get libraries & global vars
 */
var fs     = require('fs'),
    crypto = require('crypto'),
    exec   = require('child_process').exec;

// Needed variables
var args = process.argv.slice(2),
    tsc = 'tsc ' + args.join(' '),
    changed = [],
    timer = null;

/**
 * onWatch event
 */
function onWatch(event, filename) {
    filename = filename || '*unknown file*';

    // Log message
    var now = new Date();
    changed[filename] = '[' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ']: ';

    // Set timeout
    if(timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(recompile, 250);
}

/**
 * Recompile event
 */
function recompile() {
    for(i in changed) {
        console.log(changed[i] + 'change detected in file ' + i);
    }
    changed = [];
    timer = null;

    process.stdout.write("  -> recompiling... ");
    exec(tsc, function execDone(error, stdout, stderr) {
        console.log('done!');
        console.log(stderr);
    });
}

/**
 * Bind watches
 */
args.forEach(function(val, index) {
    if(val.substr(val.length - 3, 3).toLowerCase() == '.ts') {
        fs.watch(val, onWatch);
    }
});