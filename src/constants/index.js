/* @flow */
var keyMirror = require('keymirror');

module.exports = {
  ActionSources: keyMirror({
    VIEW: null,
    SERVER: null,
  }),

  ActionTypes: keyMirror({
    SET_NICK: null,
    XMPP_DEBUG: null,
    GROUP_MESSAGE_SENT: null,
    GROUP_MESSAGE_RECEIVED: null,
    CONNECTED: null,
    MUC_INFO: null,
    ROOM_ROSTER_RECEIVED: null
  })
};