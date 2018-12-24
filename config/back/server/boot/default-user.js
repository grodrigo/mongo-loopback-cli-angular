'use strict';

module.exports = function(app) {
    var User = app.models.User;

    var count = User.count({username: 'admin'}, function(err, count) {
        if(count == 0){
            console.log('admin no existe aún');
        }else {
            console.log('admin ya existe');
        }
    });

    User.create({username: 'admin', email: 'bob@projects.com', password: 'nimda'}, function(err, userInstance) {
        console.log(userInstance);
        console.log('luego de create');
  });

}
