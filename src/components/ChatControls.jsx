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
    this.bindMethods('handleInputKeyDown', 'handleInputKeyPress', 'handleInputSubmit');
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

  handleInputKeyDown(e){
    if(e.which === 13) this.handleInputSubmit(e);
    else if(e.which === 38) this.handleUpKey(e);
    else if(e.which === 40) this.handleDownKey(e);
    else if(e.which === 9 /*tab*/) this.handleTabKeyPressed(e);
  }

  handleInputKeyPress(e){
    if(this.props.nick && e.which === 64) this.handleUserMention(e);
    else this.handleInputEnterChar(e);
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

  handleUserMention(){
    console.log(this.props.roster);
    this.setState({
      mentioningUsers: this.props.roster,
      suggestionIndex: 0
    });
  }

  handleTabKeyPressed(e){
    if(this.state.mentioningUsers){
      e.preventDefault();
      var mentionIndex = this.getInputValue().lastIndexOf('@');

      var newInputContent =
        this.getInputValue().substring(0, mentionIndex + 1) +
        this.state.mentioningUsers[this.state.suggestionIndex];

      if(mentionIndex === 0) newInputContent += ': ';
      else newInputContent += ' '

      this.setInputValueTo(newInputContent);

      this.setState({
        suggestionIndex: (this.state.suggestionIndex++) % this.state.mentioningUsers.length
      });

    }
  }

  handleInputEnterChar(e){
    if(this.state.mentioningUsers){
      //var key = e.key;
      var inputVal = this.getInputValue();
      var fragment = inputVal.substring(this.getInputValue().lastIndexOf('@') + 1) + e.key;
      var usersFiltered = this.state.mentioningUsers.filter((nick) => nick.indexOf(fragment) === 0);

      this.setState({mentioningUsers: usersFiltered.length ? usersFiltered : undefined});
      console.log(fragment, usersFiltered);
    }
  }

  setInputValueTo(val){
    var input = this.refs['message-input'].getDOMNode();
    input.value = val;
  }

  getInputValue(){
    return this.refs['message-input'].getDOMNode().value;
  }

  render() {
    return (
      <div className="chat-controls">
        <input ref="message-input"
           onKeyDown={this.handleInputKeyDown}
           onKeyPress={this.handleInputKeyPress}
           placeholder={this.state.instructions }
           tabIndex="0" />

        <button onClick={this.handleInputSubmit}>{ this.state.buttonText }</button>
      </div>
    );
  }
};

ChatControls.propTypes = {
  nick: React.PropTypes.string
}

