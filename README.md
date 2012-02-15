# zombie.js socket.io eample

This is an example of how you might go about testing a node.js app that uses Socket.IO with Zombie.js. This might not be the best way, but it's a way.

## Installation

    $ git clone https://github.com/justinlatimer/zombie-socket.io-example.git
    $ cd zombie-socket.io-example/
    $ npm install

## Running

You can run the application as a standard express app and browse to it on port 8081 to get a feel for what behaviour is being tested:

	$ npm start

You can run the automated tests with:

	$ npm test

## Behaviour

The following client-side behaviour is implemented by the app, which shows various features of Socket.IO

1. When the client connects, the `connect` event is raised.
2. As soon as the client connects, the server sends `message` event, which is raised on the client.
3. There is a button labeled `Send` which emits a `delay` event. The server waits the specified time period before sending back a `message` event.

The client logs the events raised in an list.

## Testability

There are some changes you need to make on the client side to a standard Socket.IO application to test it in zombie.

1. You need to pass a full URL into the `io.connect` method. The method Socket.IO uses to determine the full URL when a relative URL is provided does not work in zombie.
2. You need to make your socket accessible from the `window` object in order to attach events from your tests.

## References

* Zombie.js - http://zombie.labnotes.org/
* Socket.IO - http://socket.io/
* Vows - http://vowsjs.org/

## License (MIT)

Copyright (c) 2012 Justin Latimer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
