var zombie = require('zombie'),
    vows = require('vows'),
    assert = require('assert');

var app = require('../app');

var _port = 8099;
function getPort() {
  return _port++;
}

var start = function(app, port) {
  port = port || getPort();
  return function() {
    var vows = this;
    app.listen(port, '127.0.0.1', function(err) {
      vows.callback(err, port);
    });
  };
}

var visit = function(url) {
  return function(lastTopic) {
    var vow = this;
    // try to find port number
    var port = Array.prototype.slice.call(arguments, -1)[0];
    var path = '';
    if (url)
      path = url;
    else
      path = vow.context.name.split(/ +/)[1];
    zombie.visit('http://127.0.0.1:' + port + path, vow.callback);
  }
}

vows
.describe('Socket.IO')
.addBatch({
  '': {
    topic: start(app.setup()),
    'when / is requested': {
      topic: visit(),
      'should get a page': function(browser) {
        assert.equal(browser.statusCode, 200);
      },
      'should not have connected yet': function(browser) {
        assert.equal(browser.text('#events'), '');
      },
      'and the page has loaded': {
        topic: function(browser) {
          var self = this;
          browser.window.socket.once('connect', function() {
              self.callback(null, browser);
          });
        },
        'should have the connection event output': function(browser) {
          assert.equal(browser.text('#events'), '1');
          assert.equal(browser.text('#history li:eq(0)'), '0: connected');
        },
        'and the socket has connected': {
          topic: function(browser) {
            var self = this;
            browser.window.socket.once('message', function() {
              self.callback(null, browser);
            });
          },
          'should have the test event output': function(browser) {
            assert.equal(browser.text('#events'), '2');
            assert.equal(browser.text('#history li:eq(1)'), '1: first message');
          },
          'and the delay button is pushed': {
            topic: function(browser) {
              var self = this;
              browser.window.socket.once('message', function() {
                self.callback(null, browser);
              });
              browser.evaluate('jQuery("#delay").click()');
            },
            'should have the delay event output': function(browser) {
              assert.equal(browser.text('#events'), '3');
              assert.equal(browser.text('#history li:eq(2)'), '2: delay response');
            }
          }
        }
      }
    }
  }
})
.export(module);
