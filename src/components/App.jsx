 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react'),
    VideoOverlay = require('./VideoOverlay').VideoOverlay,
    ChatComponent = require('./ChatComponent').ChatComponent,
    ChatStore = require('../stores/ChatStore'),
    ChatActions = require('../actions/ChatActions'),
    XMPPOptions = require('../constants/xmpp');

var getStateFromStores = function(){
  return ChatStore.getAll();
};

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromStores();

    ChatActions.initClient(XMPPOptions);
  }

  componentDidMount() {
    ChatStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ChatStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    var people = this.state.roster.map((item) => <li>{item}</li>);

    return (
      <div id="app">
        <ul id="roster" style={{position: 'absolute', right: 0, width: '200px'}}>
          { people }
        </ul>
        <ChatComponent {...this.state} />
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }
};

React.render(<App />, document.body);


