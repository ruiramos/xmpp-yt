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
        videoId: 'GfsTsqsUt7I',
        height: '100%',
        width: '100%',
        events: {
          'onReady': that.playerReady,
          'onStateChange': that.handlePlayerStateChange
        }
      });

      that.setState({player: player});
    });

    // load event delays until onYouTubeIframeAPIReady is called
    window.onYouTubeIframeAPIReady = yt.trigger();

  }

  playerReady(){

  }

  handlePlayerStateChange(){

  }

  render() {
    return (
      <div className="video-overlay">
        <div id="youtube-player"></div>
      </div>
    );
  }

};
