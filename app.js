
var express = require('express')
  , crypto = require('crypto');

//var usersController = require('./app/controllers/users');
  
var app = express.createServer();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.bodyDecoder());
app.use(express.cookieDecoder());
app.use(express.logger());
app.use(express.session({ secret: 'universitas' }));


require('./app/controllers/users')(app);
require('./app/controllers/cursos')(app);

app.dynamicHelpers({
  message: function(req){
    var err = req.session.error
      , msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    if (err) return '<p class="msg error">' + err + '</p>';
    if (msg) return '<p class="msg success">' + msg + '</p>';
  }
});

var users = {
    name: 'Milfont', salt: 'randomly-generated-salt', pass: md5('foobar' + 'randomly-generated-salt')
};

// Used to generate a hash of the plain-text password + salt

function md5(str) { return crypto.createHash('md5').update(str).digest('hex'); }

function authenticate(name, pass, fn) {
  var user = users[name];
  if (!user) return fn(new Error('cannot find user'));
  if (user.pass == md5(pass + user.salt)) return fn(null, user);
  fn(new Error('invalid password'));
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

function accessLogger(req, res, next) {
  console.log('/restricted accessed by %s', req.session.user.name);
  next();
}

app.get('/', function(req, res){ 
  res.render(__dirname + '/public/templates/index'); 
});

app.get('/instrutores', function(req, res){ 
console.log('mensagem');	
	var instrutores = [users];
	
  res.send(JSON.stringify(instrutores));
});

app.get('/restricted', restrict, accessLogger, function(req, res){
  res.send('Wahoo! restricted area');
});

app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('home');
  });
});

app.get('/login', function(req, res){
  if (req.session.user) {
    req.session.success = 'Authenticated as ' + req.session.user.name
      + ' click to <a href="/logout">logout</a>. '
      + ' You may now access <a href="/restricted">/restricted</a>.';
  }
  res.render('login');
});

app.post('/login', function(req, res){

console.log('mensagem');

  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        res.redirect('back');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('back');
    }
  });
});

app.use(express.errorHandler({ showStack: false }));
app.use(express.staticProvider(__dirname + '/public'));

app.listen(8000);
console.log('Express started on port 8000');
