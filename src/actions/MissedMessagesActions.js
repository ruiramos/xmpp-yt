
var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants').ActionTypes;

var MissedMessagesActions = {
  hideMissedMessages: function(){
    AppDispatcher.dispatchViewAction({
      type: ActionTypes.HIDE_MISSED_MESSAGES
    });
  },

  showMissedMessages: function(){
    AppDispatcher.dispatchViewAction({
      type: ActionTypes.SHOW_MISSED_MESSAGES
    });
  }

};

module.exports = MissedMessagesActions;