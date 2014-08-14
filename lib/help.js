(function(global){
  'use strict';
  var help = [
    "Usage: redget <config> | [options]",
    "",
    "Options:",
    "  --help    -h            display this text",
    "  --version -v            output version",
    "  --host    -t <url>      redmine host url",
    "  --query   -q <query_id> redmine query id to be used (shall be visible by the user specified)",
    "  --key     -k <apikey>   redmine user api key to be used (to be used instead of user/passwd options)",
    "  --user    -u <user>     redmine user (to be used instead of api key options)",
    "  --passwd  -p <passwd>   user password (to be used instead of api key options)",
    "",
    "Examples:",
    "  redget ./config.json",
    "  redget -t http://redmine.org -q 1234 -u foo -p bar",
    "  redget -t http://redmine.org -q 1234 -k 1A2E3F4D5C67"
  ].join("\n");

  global.help = help;
})(this);
