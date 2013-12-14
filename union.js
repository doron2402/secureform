  var connect = require('connect')
  , union = require('union');

var server = union.createServer({
  buffer: false,
  before: [
    connect.favicon(),
    connect.logger('dev'),
    connect.static('public'),
    connect.directory('public'),
    connect.cookieParser('my secret here'),
    connect.session({ secret: 'asdf' }),
    connect.bodyParser(),
    connect.csrf(),
    function (req, res) {
      var form = '\n\
  <form action="/" method="post">\n\
    <input type="hidden" name="_csrf" value="{token}" />\n\
    <input type="text" name="user[name]" value="{user}" placeholder="Username" />\n\
    <input type="submit" value="Login" />\n\
  </form>\n\
  '; 
      res.end(form);
      res.setHeader('Content-Type', 'text/html');
      var body = form
      .replace('{token}', req.csrfToken())
      .replace('{user}', req.session.user && req.session.user.name || '');
      res.end(body);
    },
  ]
}).listen(3000);

var app = connect();