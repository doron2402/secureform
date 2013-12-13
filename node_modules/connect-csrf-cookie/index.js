var cookies = require('cookies');

module.exports = function (cookie_key, options) {
  cookie_key = cookie_key || 'csrftoken';
  return function middleware (req, res, next) {
    if (!(req.session && req.session._csrf)) 
      return next();

    var setCookie;
    if (res.cookie && typeof res.cookie === 'function') {
      // with express, can use this function
      setCookie = res.cookie.bind(res);
    }
    else {
      // not using express, rely on cookies module
      cookies = new Cookies(req, res);
      setCookie = function (name, value, options) {
        // @todo: convert options from express format to cookies
        // module format (https://github.com/jed/cookies)
        cookies.set(name, value, options);
      }
    }

    setCookie(cookie_key, req.session._csrf, options);  

    next();
  }

}
