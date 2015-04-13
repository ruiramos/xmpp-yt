/* @flow */
var XMPP = require('stanza.io'),
    ActionTypes = require('../constants').ActionTypes,
    AppDispatcher = require('../dispatcher/AppDispatcher');

var client;

module.exports = {
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

    client.on('session:started', function(opts){
      AppDispatcher.dispatchServerAction({
        type: ActionTypes.CONNECTED,
        payload: {
          jid: opts.full
        }
      });
    });

    client.on('muc:*', function (type, msg) {
      AppDispatcher.dispatchServerAction({
        type: ActionTypes.MUC_INFO,
        actionType: type,
        payload: msg
      });
    });

    // client.on('muc:leave', function (msg) {
    //   console.log('muc_leave', msg);

    //   AppDispatcher.dispatchServerAction({
    //     type: ActionTypes.MUC_LEAVE,
    //     payload: msg
    //   });
    // });

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

  joinRoom: function(opts: object){
    console.warn('joining room', opts);
    client.joinRoom(opts.room, opts.nick);
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

}


