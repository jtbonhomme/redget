(function(global){
  'use strict';

  var xhr = require('./ajax.js');

  var redmine = {
    issues: {total_count: -1, issues: []},
    url: "",
    download: function(offset, success, error) {
        var self = this;
        xhr.ajax(this.url +"&offset=" + offset, function(data) {
            self.issues.total_count = data.total_count;
            self.issues.issues = self.issues.issues.concat(data.issues);
            var next_offset = self.issues.issues.length;
            if (self.issues.issues.length < self.issues.total_count) {
                self.download(next_offset, success, error);
            }
            else {
                success(self.issues);
            }
        }, function(err) { error(err); });
    },
    output: function(res) {
        process.stdout.write(JSON.stringify(res, null, 4));
    },
    start: function(config) {
      this.url = config.host + 'issues.json?query_id=' + config.query+'&limit=100&key='+config.key;
      if( typeof config.key === 'undefined' ) {
        throw "[ERROR] authentication information needed";
      }
      this.download(0, this.output, function(err){
          throw "[ERROR] " + err;
      });
    }
  };

  global.redmine = redmine;
})(this);
