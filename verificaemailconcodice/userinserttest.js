var users = require('./users');
var user = {  
  email: 'g@gmail.com',
  name: 'Pinco Pallo',
  address: 'Viale Regina '
  
};
users.create(user, function(err) {  
  if (err) {
    throw err;
  }
  else {
    console.log('user inserted');
  }
});