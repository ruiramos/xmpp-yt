/* @flow */
var XMPP = require('../utils/XMPPClient.js'),
    ActionTypes = require('../constants').ActionTypes,
    XMPPOptions = require('../constants/xmpp'),
    AppDispatcher = require('../dispatcher/AppDispatcher');

var ChatActions = {
  initClient: function(opts){
    XMPP.init(opts);
  },

  setNick: function(nick: string, roster: array){
    AppDispatcher.dispatchViewAction({
      type: ActionTypes.SET_NICK,
      payload: {
        nick: nick,
      }
    });

    if(roster.length > 1)
      XMPP.changeNick(nick, XMPPOptions.room);
    else
      XMPP.changeNickWhenAlone(nick, XMPPOptions.room);

  },

  sendMessage: function(msg: string){
    XMPP.sendGroupMessage(msg, XMPPOptions.room);
  }

};

module.exports = ChatActions;