 /**
  * @jsx React.DOM
  * @flow
 **/

var React         = require('react'),
    RoomRoster    = require('./RoomRoster').RoomRoster,
    ChatArea      = require('./ChatArea').ChatArea,
    ChatControls  = require('./ChatControls').ChatControls;

require('../less/chat-component.less');

export class ChatComponent extends React.Component {

  render() {
    return (
      <div id="chat-component">
        <RoomRoster
          roster={this.props.roster} />

        <ChatArea
          messages={this.props.messages} />

        <ChatControls
          nick={this.props.nick}
          roster={this.props.roster}
          />
      </div>
    );
  }

};
