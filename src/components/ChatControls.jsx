 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react'),
    BaseComponent = require('./BaseComponent').BaseComponent;

var ChatActions = require('../actions/ChatActions');

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

  handleInputKeydown(e){
    if(e.which === 13) this.handleInputSubmit(e);
  }

  handleInputSubmit(e){
    var input = this.refs['message-input'].getDOMNode(),
        val = input.value;

    if(val){
      if(!this.props.nick){
        ChatActions.setNick(val, this.props.roster);
      } else {
        ChatActions.sendMessage(val);
      }

      input.value = '';
    }

  }

  render() {
    return (
      <div className="chat-controls">
        <p>{ this.state.instructions }</p>
        <input ref="message-input" onKeyDown={this.handleInputKeydown} />
        <button onClick={this.handleInputSubmit}>{ this.state.buttonText }</button>
      </div>
    );
  }
};

ChatControls.propTypes = {
  nick: React.PropTypes.string
}

