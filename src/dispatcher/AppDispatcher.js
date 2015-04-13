/* @flow */

var Dispatcher = require('flux').Dispatcher,
    ActionSources = require('../constants/').ActionSources;

module.exports = Object.assign(new Dispatcher(), {

  dispatchViewAction: function(action) {
    action.source = ActionSources.VIEW;
    this.dispatch(action);
  },

  dispatchServerAction: function(action){
    action.source = ActionSources.SERVER;
    this.dispatch(action);
  }

});