 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react'),
    moment = require('moment');

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
    var messages = [],
        msgsStack = [];

    for (var i = 1; i <= this.props.messages.length; i++) {
      var msg = this.props.messages[i-1]; // we're looking back

      if(msg.messageType === 'chat'){
        // its a chat -- does it come from the same recipient?

        if(i !== this.props.messages.length                                                  // if there is still a message
          && msg.payload.from.resource === this.props.messages[i].payload.from.resource      // and same recipient
          && this.props.messages[i].messageType === 'chat'){                                 // and both are chats

          // pushing into the stack for a later merge
          msgsStack.push(<div className="message">{msg.payload.message}</div>)
          continue;

        } else {
          // new recipient, or last message from the same one, gotta build the element!
          msgsStack.push(<div className="message">{msg.payload.message}</div>)

          console.log(msg);

          messages.push(
            <li className="entry">
              <div className={"message-container " + (msg.mine ? 'mine' : '')}>
                <div className="from">{msg.payload.from.resource}</div>
                <span className="timestamp">{ moment(msg.payload.timestamp).format('HH:mm') }</span>
                { msgsStack }
              </div>
            </li>
          );

          msgsStack = [];
        }
      } else {
        messages.push(
          <li className="entry">
            <div className="info">
              {msg.payload.from.resource} {verbForAction[msg.actionType]}
            </div>
          </li>
        );
        msgsStack = [];
      }
    };

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
