'use strict';

module.exports = function(app, cb) {
  var User = app.models.User;
  User.create(
    [{username: 'admin', email: 'bob@projects.com', password: 'nimda'}], 
    function(err, users) {
      if (err) throw  err;
      console.log('Created users:', users);
    }
  );
  process.nextTick(cb); 
};