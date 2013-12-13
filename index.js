  var flatiron = require('flatiron'),
      connect = require('connect'),
      crypto = require('crypto'),
      csrf = require('csrf'),
      fipassport = require('flatiron-passport'),
      app = flatiron.app;
  

  console.log('Starting the server:');
  app.use(flatiron.plugins.http, {
    // HTTP options
  });
  
  app.use(fipassport);
  app.use(connect.cookieParser());
  app.use(connect.session({ secret: 'keyboard cat' }));
  app.use(connect.csrf());
  app.use(require('connect-csrf-cookie')());


  //
  // app.router is now available. app[HTTP-VERB] is also available
  // as a shortcut for creating routes
  //
  app.router.get('/version', function () {
    var html = '<h1> flatiron version: ' + flatiron.version;
    
    this.res.writeHead(200, { 'Content-Type': 'text/html' }) 
    this.res.end(html);
  });
  
  app.router.get('/form', function(){
    console.log(this.req.session);
    var html = '<h1>Form:</h1><br /><form method="POST"><input type="text" name="someField" /><input type="submit" value="Submit"/></form>';
    this.res.writeHead(200, {'Content-Type': 'text/html'})
    this.res.end(html);
  });
  
  app.router.post('/form', function(){
    console.log(this.req);
    this.res.json({result: this.req.body})
    this.res.end()
  });
  app.start(9999);