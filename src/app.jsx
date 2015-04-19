/* @flow */

require('./object-assign.js');
require('./less/app.less');
require('./components/App');

var React = require('react');
// export for http://fb.me/react-devtools
window.React = React;

// var client = XMPP.createClient({
//   jid: 'guest@ruiramos.com',
//   password: '',
//   wsURL: 'wss://ruiramos.com:5281/xmpp-websocket',
//   transports: ['websocket']
// });

// client.on('*', function(name, data){
//   var p = document.createElement('p');
//   p.innerText = name + ': ' + data;
//   dump.appendChild(p);
// });

// client.on('groupchat', function (msg) {
//   var p = document.createElement('p');
//   p.innerText = msg.from + ': ' + msg.body;
//   chat.appendChild(p);
// });

// client.on('session:started', function () {
//   client.joinRoom('test@chat.ruiramos.com', 'kyle'+Math.round(Math.random()*1000));
// });

// client.connect();

// window.sendMessage = function(msg){
//   client.sendMessage({
//     body: msg,
//     type: 'groupchat',
//     to: 'test@chat.ruiramos.com'
//   })

//}

