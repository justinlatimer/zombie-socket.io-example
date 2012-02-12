var express = require('express');

module.exports.setup = function() {
  var app = express.createServer();

  app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname);
    app.set('view options', {
      layout: false
    });
    app.use(express.static(__dirname + '/scripts'));
  });
  
  app.get('/', function(req, res) {
    res.render('index');
  })
  
  var io = require('socket.io').listen(app, { 'log level': 1 });
  
  io.of('/test').on('connection', function(socket) {
    socket.emit('message', { message: 'first message' });
    socket.on('delay', function(data) {
      setTimeout(function() {
        socket.emit('message', { message: 'delay response' });
      }, data.time);
    });
  });
  
  return app;
};
