 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react'),
    VideoOverlay = require('./VideoOverlay').VideoOverlay,
    ChatComponent = require('./ChatComponent').ChatComponent,

    ChatStore = require('../stores/ChatStore'),
    VideoStore = require('../stores/VideoStore'),
    MissedMessagesStore = require('../stores/MissedMessagesStore'),

    ChatActions = require('../actions/ChatActions'),
    MissedMessagesActions = require('../actions/MissedMessagesActions'),

    XMPPOptions = require('../constants/xmpp'),
    WindowFocus = require('../utils/WindowFocus'),

    cx = require('classnames');

var baseTitle = '';

var getStateFromStores = function(){
  return {
    chat: ChatStore.getAll(),
    video: VideoStore.getAll(),
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
    VideoStore.addChangeListener(this._onChange.bind(this));
    MissedMessagesStore.addChangeListener(this._onChange.bind(this));

    WindowFocus.onWindowFocused(this.handleWindowFocused.bind(this));
    WindowFocus.onWindowBlured(this.handleWindowBlured.bind(this));

    baseTitle = document.title;
  }

  componentWillUnmount() {
    ChatStore.removeChangeListener(this._onChange.bind(this));
    VideoStore.removeChangeListener(this._onChange.bind(this));
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
    var appClasses = cx({
      'video-playing': this.state.video.videoId
    });

    return (
      <div id="app" className={appClasses}>
        <ChatComponent {...this.state.chat} />
        <VideoOverlay {...this.state.video} />
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }
};



