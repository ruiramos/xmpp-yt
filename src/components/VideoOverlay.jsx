 /**
  * @jsx React.DOM
  * @flow
 **/

var React = require('react'),
    requireSDK = require('require-sdk');

require('../less/video-overlay.less');

export class VideoOverlay extends React.Component {
  constructor(){
    super();
    var that = this;

    var yt = requireSDK('https://youtube.com/iframe_api', 'YT')
    yt(function(err, youtube) {
      var player = new youtube.Player("youtube-player", {
        // videoId: 'GfsTsqsUt7I',
        height: '100%',
        width: '100%',
        events: {
          'onReady': that.playerReady.bind(that),
          'onStateChange': that.handlePlayerStateChange
        }
      });

      that.setState({player: player});
    });

    // load event delays until onYouTubeIframeAPIReady is called
    window.onYouTubeIframeAPIReady = yt.trigger();

  }

  playerReady(){
    if(this.props.videoId)
      this.state.player.loadVideoById(this.props.videoId, 0, "hd720");
  }

  handlePlayerStateChange(){

  }

  componentWillReceiveProps(nextProps){
    if(this.state && this.state.player && nextProps.videoId !== this.props.videoId){
      this.state.player.loadVideoById(nextProps.videoId, 0, "hd720");
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state && this.state.player && this.state.player.getPlayerState){
      if(!nextProps.running && this.state.player.getPlayerState() === 1){
        this.state.player.pauseVideo();
      } else if(nextProps.running && this.state.player.getPlayerState() === 2)
        this.state.player.playVideo();
    }
  }

  render() {
    var overlayStyle = {
      display: this.props.videoId ? 'none' : 'block'
    };

    return (
      <div className="video-overlay">
        <div className="overlay" style={overlayStyle}></div>
        <div id="youtube-player"></div>
      </div>
    );
  }

};
