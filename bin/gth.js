#! /usr/bin/env node
require('../lib/');
var version = require('../package.json').version;
var program = require('commander');


program.version(version)
    .parse(process.argv);

