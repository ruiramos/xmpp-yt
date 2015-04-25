 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react'),
    VideoOverlay = require('./VideoOverlay').VideoOverlay,
    ChatComponent = require('./ChatComponent').ChatComponent,

    ChatStore = require('../stores/ChatStore'),
    MissedMessagesStore = require('../stores/MissedMessagesStore'),

    ChatActions = require('../actions/ChatActions'),
    MissedMessagesActions = require('../actions/MissedMessagesActions'),

    XMPPOptions = require('../constants/xmpp'),
    WindowFocus = require('../utils/WindowFocus');

var baseTitle = '';

var getStateFromStores = function(){
  return {
    chat: ChatStore.getAll(),
    missedMessages: MissedMessagesStore.getAll()
  }
};

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromStores();

    // seting room on XMPPOptions based on url !!!
    var room = this.props.room;
    XMPPOptions.room = room + XMPPOptions.host;

    ChatActions.initClient(XMPPOptions);
  }

  componentDidMount() {
    ChatStore.addChangeListener(this._onChange.bind(this));
    MissedMessagesStore.addChangeListener(this._onChange.bind(this));

    WindowFocus.onWindowFocused(this.handleWindowFocused.bind(this));
    WindowFocus.onWindowBlured(this.handleWindowBlured.bind(this));

    baseTitle = document.title;
  }

  componentWillUnmount() {
    ChatStore.removeChangeListener(this._onChange.bind(this));
    MissedMessagesStore.removeChangeListener(this._onChange.bind(this));
  }

  componentDidUpdate(){
    if(this.state.missedMessages.showMissedMessages && this.state.missedMessages.missedMessagesCount){
      document.title = '(' + this.state.missedMessages.missedMessagesCount + ') ' + baseTitle;
    } else {
      document.title = baseTitle;
    }
  }

  handleWindowFocused(){
    MissedMessagesActions.hideMissedMessages();
  }

  handleWindowBlured(){
    MissedMessagesActions.showMissedMessages();
  }

  render() {
    return (
      <div id="app">
        <ChatComponent {...this.state.chat} />
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }
};



