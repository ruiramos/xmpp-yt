/* @flow */
var XMPP = require('stanza.io'),
    ActionTypes = require('../constants').ActionTypes,
    AppDispatcher = require('../dispatcher/AppDispatcher');

var client;

var XMPPClient = {
  init: function(opts: object){
    client = XMPP.createClient({
      jid: opts.jid,
      password: opts.password,
      wsURL: opts.url,
      transports: ['websocket']
    });

    client.on('*', function(name, data){
      AppDispatcher.dispatchServerAction({
        type: ActionTypes.XMPP_DEBUG,
        payload: {
          name: name,
          data: data
        }
      });
    });

    client.on('session:started', function(sessionData){
      AppDispatcher.dispatchServerAction({
        type: ActionTypes.CONNECTED,
        payload: {
          jid: sessionData.full
        }
      });

      XMPPClient.joinRoom(opts.room);

    });

    client.on('muc:*', function (type, msg) {
      AppDispatcher.dispatchServerAction({
        type: ActionTypes.MUC_INFO,
        actionType: type,
        payload: msg
      });
    });

    client.on('groupchat', function (msg) {
      AppDispatcher.dispatchServerAction({
        type: ActionTypes.GROUP_MESSAGE_RECEIVED,
        payload: {
          from: msg.from,
          message: msg.body
        }
      });
    });

    client.connect();
  },

  joinRoom: function(room: string, nick: string){
    console.warn('joining room', room, nick);
    nick = nick || 'guest'+(Math.round(Math.random() * 10000));
    client.joinRoom(room, nick);
  },

  changeNick: function(nick: string, room: string){
    console.warn('change nick', nick, room);
    client.changeNick(room, nick);
  },

  sendGroupMessage: function(message: string, room:string){
    client.sendMessage({
      body: message,
      type: 'groupchat',
      to: room
    });

    AppDispatcher.dispatchServerAction({
      type: ActionTypes.GROUP_MESSAGE_SENT,
      payload: {
        message: message,
      }
    });


  },

};

module.exports = XMPPClient;


