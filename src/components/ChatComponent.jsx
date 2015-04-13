 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react'),
    ChatArea = require('./ChatArea').ChatArea,
    ChatControls = require('./ChatControls').ChatControls;

require('../less/chat-component.less');

export class ChatComponent extends React.Component {

  render() {
    return (
      <div id="chat-component">
        <ChatArea messages={this.props.messages} />
        <ChatControls nick={this.props.nick} />
      </div>
    );
  }

};
