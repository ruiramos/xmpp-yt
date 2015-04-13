 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react');

require('../less/chat-area.less');

var verbForAction = {
  'muc:available': 'joined',
  'muc:unavailable': 'left'
};

export class ChatArea extends React.Component {
  render() {
    var messages = this.props.messages.map((msg) =>
      msg.messageType === 'chat' ?
        <div className="entry">
          <div className={"message " + (msg.mine ? 'mine' : '')}>
            <div className="from">{msg.payload.from.resource}</div>
            <div className="message">{msg.payload.message}</div>
          </div>
        </div> :
        <div className="entry">
          <div className="info">
            {msg.payload.from.resource} {verbForAction[msg.actionType]}
          </div>
        </div>
    )

    return (
      <div className="chat-area">
        { messages }
      </div>
    );
  }

};

ChatArea.propTypes = {
  messages: React.PropTypes.array
}
