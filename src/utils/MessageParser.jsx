
/**
  Parses ans replaces special kind of messages (links, images, etc)

**/

var parsersNames = [
  'imageParser',
  'youtubeParser',
  'urlParser',
  'mentionsParser'
];

var MessageParser = (function(){
  var parsers = parsersNames.map((parser) => {
    return require('./parsers/' + parser);
  })

  return {
    parse: function(message){
      var els = [];
      for (var i = 0; i < parsers.length; i++) {
        if(parsers[i].matches(message)){
          els.push(parsers[i].replace(message));
        }
      };

      return (!els.length ? message :
        <span className="rich-message-container">{els}</span>
      );
    }
  }
}());

module.exports = MessageParser;



