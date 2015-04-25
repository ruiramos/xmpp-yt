/* @flow */

require('./object-assign.js');
require('./less/app.less');

var React = require('react');
var page  = require('page');
var App   = require('./components/App').App;
var routes = {};

window.React = React;


//--- Routes!

routes.chat = function(){
  React.render(<App room={'world'} />, document.body);
}

routes.chatWithRoom = function(ctx){
  React.render(<App room={ctx.params.room} />, document.body);
}

routes.notfound = function(ctx){
  page.redirect('/');
}

page('/', routes.chat);
page('/j/:room', routes.chatWithRoom);
page('*', routes.notfound);
page();


