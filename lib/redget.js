(function(global){
  'use strict';

  var help      = require('./help').help;
  var redmine   = require('./redmine').redmine;

  // Output version
  function version() {
    var pkg = require('../package.json');
    console.log(pkg.version);
  }

  // Output help.txt
  function usage() {
    console.log(help);
  }

  // Uses minimist parsed argv in bin/seahorse
  function run(argv) {
    var config = {};
  
    var source = argv._[0];
    if (/\.json$/.test(source)) {
      var path = process.cwd() + '/' + source;
      config   = require(path);
    }
    else {
      if (argv.version || argv.v) return version();
      if (argv.help    || argv.h) return usage();

      config.host     = argv.host   || argv.t;
      config.query    = argv.query  || argv.q;
      config.users    = argv.users  || argv.u;
      config.key      = argv.key    || argv.k;
    }
    return redmine.start(config);
  }

  global.run = run;
}(this));
