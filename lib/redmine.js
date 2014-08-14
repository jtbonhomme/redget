(function(global){
  'use strict';

  var xhr = require('./ajax.js');

  var redmine = {
    issues: {total_count: -1, issues: []},

    download: function(url, offset, key, all_issues, success, error) {
        this.url=url;
        this.offset = offset;
        this.key=key;
        xhr.ajax(this.url +"&offset=" + this.offset, this.key, function(data) {
            all_issues.total_count = data.total_count;
            all_issues.issues = all_issues.issues.concat(data.issues);
            var next_offset = all_issues.issues.length;
            if (all_issues.issues.length < all_issues.total_count) {
                this.download(this.url, next_offset, this.key, all_issues, success, error);
            }
            else {
                success();
            }
        }, function(err) { error(err); });
    },
    
    output: function() {
        process.stdout.write(JSON.stringify(this.issues, null, 4));
    },

    start: function(config) {
      var base_url = config.host + 'issues?query_id=' + config.query;
      if( typeof config.user === 'undefined' && typeof config.passwd === 'undefined' || typeof config.key === 'undefined' ) {
        throw "[ERROR] authentication information needed";
      }
      this.download(base_url, 0, config.key, this.issues, this.output, function(err){
          throw "[ERROR] " + err;
      });
    }
  };

  global.redmine = redmine;
})(this);
