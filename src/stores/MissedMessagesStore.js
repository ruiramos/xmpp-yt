
var EventEmitter = require('events').EventEmitter,
    ActionTypes = require('../constants').ActionTypes,
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    WindowFocus  = require('../utils/WindowFocus'),
    CHANGE_EVENT = 'change';

var _missedMessages = 0,
    _showMissedMessages = false;

var MissedMessagesStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  increase: function(){
    _missedMessages++;
  },

  reset: function(){
    _missedMessages = 0;
  },

  getShowMissedMessages: function(){
    return _showMissedMessages;
  },

  getAll: function(){
    return {
      showMissedMessages: _showMissedMessages,
      missedMessagesCount: _missedMessages
    }
  }

});

AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.GROUP_MESSAGE_RECEIVED:
      if(MissedMessagesStore.getShowMissedMessages()){
        MissedMessagesStore.increase();
        MissedMessagesStore.emitChange();
      }
      break;


    case ActionTypes.HIDE_MISSED_MESSAGES:
      console.log('HIDE_MISSED_MESSAGES')
      _showMissedMessages = false;
      MissedMessagesStore.reset();
      MissedMessagesStore.emitChange();
      break;

    case ActionTypes.SHOW_MISSED_MESSAGES:
      _showMissedMessages = true;
      MissedMessagesStore.emitChange();
      break;


  }
});

module.exports = MissedMessagesStore;