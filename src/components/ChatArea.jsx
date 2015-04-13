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
  componentDidUpdate() {
    this._scrollToBottom();
  }

  render() {
    var messages = this.props.messages.map((msg) =>
      msg.messageType === 'chat' ?
        <li className="entry">
          <div className={"message " + (msg.mine ? 'mine' : '')}>
            <div className="from">{msg.payload.from.resource}</div>
            <div className="message">{msg.payload.message}</div>
          </div>
        </li> :
        <li className="entry">
          <div className="info">
            {msg.payload.from.resource} {verbForAction[msg.actionType]}
          </div>
        </li>
    )

    return (
      <ul ref="messageList" className="chat-area">
        { messages }
      </ul>
    );
  }

  _scrollToBottom() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  }

};

ChatArea.propTypes = {
  messages: React.PropTypes.array
}
