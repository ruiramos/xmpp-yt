 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react'),
    moment = require('moment'),
    emojify = require('emojify.js'),
    MessageParser = require('../utils/MessageParser');

require('../less/chat-area.less');

var verbForAction = {
  'muc:available': 'joined',
  'muc:unavailable': 'left',
  'action:play': 'changed the video',
  'action:stop': 'stopped the video',
};

export class ChatArea extends React.Component {
  constructor(){
    super();

    emojify.setConfig({
      only_crawl_id    : 'chat-area-list',        // Use to restrict where emojify.js applies
      img_dir          : '/static/images/emoji',  // Directory for emoji images
      ignored_tags     : {                        // Ignore the following tags
          'SCRIPT'  : 1,
          'TEXTAREA': 1,
          'A'       : 1,
          'PRE'     : 1,
          'CODE'    : 1
      }
    });
  }

  componentWillUpdate(nextProps){
    var ul = this.refs.messageList.getDOMNode();
    this.isScrollAtBottom = (ul.scrollHeight < ul.scrollTop + ul.offsetHeight + (ul.scrollHeight/15))
  }

  componentDidUpdate() {
    if(this.isScrollAtBottom || this.props.messages[this.props.messages.length - 1].mine){
     this.scrollToBottom();
    }

    emojify.run();
  }

  render() {
    var messages = [],
        msgsStack = [];

    for (var i = 1; i <= this.props.messages.length; i++) {
      var msg = this.props.messages[i-1]; // we're looking back

      if(msg.messageType === 'chat'){
        // its a chat -- does it come from the same recipient?
        var message = MessageParser.parse(msg.payload.message);

        if(i !== this.props.messages.length                                                  // if there is still a message
          && msg.payload.from.resource === this.props.messages[i].payload.from.resource      // and same recipient
          && this.props.messages[i].messageType === 'chat'){                                 // and both are chats

          // pushing into the stack for a later merge
          msgsStack.push(<div className="message">{message}</div>)
          continue;

        } else {
          // new recipient, or last message from the same one, gotta build the element!
          msgsStack.push(<div className="message">{message}</div>)

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
        console.log(msg.actionType, verbForAction)
        messages.push(
          <li className="entry">
            <div className="info-container">
              <div className="info">{msg.payload.from.resource} {verbForAction[msg.actionType]}</div>
            </div>
          </li>
        );
        msgsStack = [];
      }
    };

    return (
      <ul ref="messageList" className="chat-area" id="chat-area-list">
        { messages }
      </ul>
    );
  }

  scrollToBottom() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  }

};

ChatArea.propTypes = {
  messages: React.PropTypes.array
}
