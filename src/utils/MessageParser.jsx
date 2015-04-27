
/**
  Parses ans replaces special kind of messages (links, images, etc)

**/

// Regexps
var url = /((https?:\/\/(www\.)?|(www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/
var imgLink = /(?:http|www)(?:.*)\/((.*)(?:\.jpg|\.gif|\.png))(\?|$)/;
var youtube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var mention = /(@\w+\:?\s)/;

var MessageParser = {
  parse: function(message){
    var matches;


    if((matches = message.match(imgLink))){
      return (
        <span className="rich-message-container">
          <div><a href={message} target="_blank">{message}</a></div>
          <div className="embed">
            <p className="embed-title">Image - {matches[1]}</p>
            <img className="image-embed" src={message}/>
          </div>
        </span>
      )
    }
    else if((matches = message.match(youtube))){
      return (
        <span className="rich-message-container">
          <div><a href={message} target="_blank">{matches[0]}</a></div>
          <div className="embed">
            <p className="embed-title">Youtube Video</p>
            <iframe className="video-embed" width="560" height="315" src={"https://www.youtube.com/embed/" + matches[2]} frameborder="0" allowfullscreen></iframe>
          </div>
        </span>
      )
    }
    else if((matches = message.match(url))){
      var splitMsg = message.split(matches[0]);

      return (
        <span>
          <span>{splitMsg[0]}</span>
          <span><a target="_blank" href={message}>{matches[0]}</a></span>
          <span>{splitMsg[1]}</span>
        </span>

      );
    }
    else if((matches = message.match(mention))){
      var splitMsg = message.split(matches[0]);
      return (
        <span>
          <span>{splitMsg[0]}</span>
          <span className="message-mention">{matches[0]}</span>
          <span>{splitMsg[1]}</span>
        </span>
      )
    }


    return message;
  }
}


module.exports = MessageParser;