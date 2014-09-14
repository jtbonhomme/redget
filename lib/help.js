(function(global){
  'use strict';
  var help = [
    "Usage: redget <config> | [options]",
    "",
    "Options:",
    "  --help    -h            display this text",
    "  --version -v            output version",
    "  --host    -t <url>      redmine host url (shall end with /)",
    "  --query   -q <query_id> redmine query id to be used (shall be visible by the specified user)",
    "  --users   -u            get all users (shall be accessible by the specified user)",
    "  --key     -k <apikey>   redmine user api key to be used",
    "",
    "Examples:",
    "  redget config.json (path shall be relative)",
    "  redget -t http://redmine.org/projects/myproject/ -q 1234 -k 1A2E3F4D5C671A2E3F4D5C67"
  ].join("\n");

  global.help = help;
})(this);
