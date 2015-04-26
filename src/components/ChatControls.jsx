 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react'),
    BaseComponent = require('./BaseComponent').BaseComponent;

var ChatActions = require('../actions/ChatActions');

// keeping it here for a quick my previous messages access
var myOldMessages = [],
    oldMessagePosition = 0;

var states = {
  initial: {
    instructions: 'pick a handle',
    buttonText: 'go'
  },
  app: {
    instructions: '',
    buttonText: 'send'
  }
};

require('../less/chat-controls.less');

export class ChatControls extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = this.props.nick ? states.app : states.initial;
    this.bindMethods('handleInputKeydown', 'handleInputSubmit');

  }

  /**
    event handlers
  **/

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.nick ? states.app : states.initial)
  }

  componentDidMount(){
    this.refs['message-input'].getDOMNode().focus();
  }

  handleInputKeydown(e){
    if(e.which === 13) this.handleInputSubmit(e);
    else if(e.which === 38)this.handleUpKey(e);
    else if(e.which === 40)this.handleDownKey(e);
  }

  handleInputSubmit(e){
    var input = this.refs['message-input'].getDOMNode(),
        val = input.value;

    if(val){
      if(!this.props.nick){
        ChatActions.setNick(val, this.props.roster);
      } else {
        ChatActions.sendMessage(val);
        myOldMessages.push(val);
        oldMessagePosition = myOldMessages.length; // end of the array
      }

      input.value = '';
    }
  }

  handleUpKey(e){
    e.preventDefault();

    oldMessagePosition = Math.max(oldMessagePosition - 1, 0);

    if(myOldMessages[oldMessagePosition]){
      this.setInputValueTo(myOldMessages[oldMessagePosition]);
    }
  }

  handleDownKey(e){
    e.preventDefault();

    oldMessagePosition = Math.min(oldMessagePosition + 1, myOldMessages.length);

    if(oldMessagePosition === myOldMessages.length){
      this.setInputValueTo('');
    } else {
      this.setInputValueTo(myOldMessages[oldMessagePosition]);
    }
  }

  setInputValueTo(val){
    var input = this.refs['message-input'].getDOMNode();
    input.value = val;
  }

  render() {
    return (
      <div className="chat-controls">
        <input ref="message-input" onKeyDown={this.handleInputKeydown} placeholder={ this.state.instructions } tabIndex="0"/>
        <button onClick={this.handleInputSubmit}>{ this.state.buttonText }</button>
      </div>
    );
  }
};

ChatControls.propTypes = {
  nick: React.PropTypes.string
}

