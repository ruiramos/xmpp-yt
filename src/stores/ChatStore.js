
var EventEmitter = require('events').EventEmitter,
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ChatConstants = require('../constants'),
    ActionTypes = ChatConstants.ActionTypes,
    CHANGE_EVENT = 'change';

var _nick,
    _messages = [],
    _jid;

var ChatStore = Object.assign({}, EventEmitter.prototype, {
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

  getNick: function(){
    return _nick;
  },

  getMessages: function(){
    return _messages;
  },

  getJid: function(){
    return _jid;
  },

  getAll: function(){
    return {
      nick: _nick,
      messages: _messages,
      jid: _jid
    }
  }

});

AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CONNECTED:
      _jid = action.payload.jid;
      break;

    case ActionTypes.SET_NICK:
      _nick = action.payload.nick;
      console.log('nick set to ', _nick);
      ChatStore.emitChange();
      break;

    case ActionTypes.GROUP_MESSAGE_SENT:
      //action.payload.from = ChatStore.getNick();
      //_messages.push(action.payload);
      //ChatStore.emitChange();
      break;

    case ActionTypes.MUC_INFO:
      var payload = action.payload;

      if(_messages.length &&
        (action.actionType === 'muc:available' ||
        action.actionType === 'muc:unavailable') &&
        payload.from.resource.indexOf('guest') !== 0){
        _messages.push(action);
        ChatStore.emitChange();
       }

      break;


    case ActionTypes.GROUP_MESSAGE_RECEIVED:
      _messages.push({
        messageType: 'chat',
        mine: action.payload.from.resource === _nick,
        payload: action.payload
      });
      ChatStore.emitChange();
      break;

    case ActionTypes.XMPP_DEBUG:
      //console.log(action.payload.name, action.payload.data)
      break;

    default:
      // do nothing
  }

});

module.exports = ChatStore;