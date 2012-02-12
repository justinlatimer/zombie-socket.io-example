var port = 8081;

var app = require('./app').setup();
app.listen(port);

console.log('Listening on http://0.0.0.0:' + port);
