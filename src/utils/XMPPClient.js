/* @flow */
var XMPP = require('stanza.io'),
    ActionTypes = require('../constants').ActionTypes,
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    messageCommands = require('./messageCommands');

var client;

function _handleCommand(msg){
  var cmd = msg.match(/^\/(\w+)(?:\s(.*))?/);
  if(messageCommands[cmd[1]+'Handler'])
    messageCommands[cmd[1]+'Handler'](cmd[2]);
}

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
      var cmd;
      if(cmd = msg.body.match(/^\/(\w+)(?:\s(.*))?/)){

        _handleCommand(msg.body);
        console.log(cmd)

        AppDispatcher.dispatchServerAction({
          type: ActionTypes.GROUP_COMMAND_RECEIVED,
          payload: {
            actionType: 'action:' + cmd[1],
            from: msg.from,
            message: msg.body,
            timestamp: new Date()
          }
        });

      } else {
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.GROUP_MESSAGE_RECEIVED,
          payload: {
            from: msg.from,
            message: msg.body,
            timestamp: new Date()
          }
        });
      }
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

  changeNickWhenAlone: function(nick: string, room: string){
    console.warn('change nick alone', nick, room);
    client.leaveRoom(room);
    client.joinRoom(room, nick);
  },

  getRoomRoster: function(room){
    client.once('iq', function (msg) {
      AppDispatcher.dispatchServerAction({
        type: ActionTypes.ROOM_ROSTER_RECEIVED,
        payload: {
          roster: msg.discoItems.items
        }
      });
    });

    client.getDiscoItems(room, '', function(){});
  },

  sendGroupMessage: function(message: string, room:string){
    client.sendMessage({
      body: message,
      type: 'groupchat',
      to: room,
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


