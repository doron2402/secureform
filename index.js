  var flatiron = require('flatiron'),
      connect = require('connect'), 
      fipassport = require('flatiron-passport'),
      app = flatiron.app;  

  console.log('Starting the server: PORT: 9999');
  app.use(flatiron.plugins.http, {
    // HTTP options
    before: [
    connect.favicon(),
    connect.logger('dev'),
    connect.static('public'),
    connect.directory('public'),
    connect.cookieParser(),
    connect.session({ secret: 'asdf' }),
    connect.bodyParser(),
    connect.csrf()
  ]

  });
  

  app.router.get('/', function () {
    token = this.req.csrfToken();
    console.log(token);
    var html = '<h1> flatiron version: ' + flatiron.version;
    this.res.writeHead(200, { 'Content-Type': 'text/html' }) 
    this.res.end(html);
  });
  
  app.router.get('/form', function(){
    token = this.req.csrfToken();
    var html = '<h1>Form:</h1><br /><form method="POST"><input type="text" name="someField" /><input type="hidden" value="'+token+'" name="_csrf" /><input type="submit" value="Submit"/></form>';
    html += '<p>' + token + '</p>';
    this.res.writeHead(200, {'Content-Type': 'text/html'})
    this.res.end(html);
  });
  
  app.router.post('/form', function(){
    console.log(this.req);
    this.res.json({result: this.req.body})
    this.res.end()
  });
  app.start(9999);