/* @flow */
var XMPP = require('../utils/XMPPClient.js'),
    ActionTypes = require('../constants').ActionTypes,
    XMPPOptions = require('../constants/xmpp'),
    AppDispatcher = require('../dispatcher/AppDispatcher');

var ChatActions = {
  initClient: function(opts){
    XMPP.init(opts);
  },

  setNick: function(nick: string){
    AppDispatcher.dispatchViewAction({
      type: ActionTypes.SET_NICK,
      payload: {
        nick: nick,
      }
    });

    XMPP.changeNick(nick, XMPPOptions.room);
  },

  sendMessage: function(msg: string){
    XMPP.sendGroupMessage(msg, XMPPOptions.room);
  }

};

module.exports = ChatActions;