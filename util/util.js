module.exports.APIErr = function(code, debugMessage) {
  this.error = {error: {code: code}};
  this.message = JSON.stringify(this.error);
  this.debugMessage = debugMessage;
  this.name = code;
  
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
};
module.exports.APIErr.prototype.__proto__ = Error.prototype;

module.exports.APIErrorHandler = function(err, req, res, next) {
  
  if (err instanceof util.APIErr) {
    console.log(err.name + ": " + req.url + ", " + err.debugMessage);
    return res.send(err.error);
  }

  next(err);
};