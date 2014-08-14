#!/usr/bin/env node

var minimist   = require('minimist');
var redget       = require('./lib/redget');

var argv = minimist(process.argv.slice(2));
redget.run(argv);
