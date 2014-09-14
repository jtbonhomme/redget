(function(global){
  'use strict';

  var xhr = require('./ajax.js');

  var redmine = {
    trackers: {total_count: -1},
    url: "",
    download: function(offset, key, success, error) {
        var self = this;
        xhr.ajax(this.url +"&offset=" + offset, function(data) {
            self.trackers.total_count = data.total_count;
            self.trackers[key] = self.trackers[key].concat(data[key]);
            var next_offset = self.trackers[key].length;
            if (self.trackers[key].length < self.trackers.total_count) {
                self.download(next_offset, key, success, error);
            }
            else {
                success(self.trackers);
            }
        }, function(err) { error(err); });
    },
    output: function(res) {
        process.stdout.write(JSON.stringify(res, null, 4));
    },
    start: function(config) {
      var jsonKey = "";
      if( typeof config.key === 'undefined' ) {
        throw "[ERROR] authentication information needed";
      }
      if( config.query ) {
        jsonKey = "issues";
        this.url = config.host + 'issues.json?query_id=' + config.query + '&limit=100&key='+config.key;
      }
      else if( config.users ) {
        jsonKey = "users";
        this.url = config.host + 'users.json' + '?limit=100&key='+config.key;
      }
      this.trackers[jsonKey] = [];
      this.download(0, jsonKey, this.output, function(err){
          throw "[ERROR] " + err;
      });
    }
  };

  global.redmine = redmine;
})(this);
