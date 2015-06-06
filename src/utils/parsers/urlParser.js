
var BaseParser = require('./baseParser');

module.exports = Object.assign({}, BaseParser, {
  regexp: /((https?:\/\/(www\.)?|(www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/,

  replace: function(message){
    var matches = message.match(this.regexp);

    if(!matches){
      return <span>{ message }</span>
    } else {
      var splitMsg = message.split(matches[0]);

      return (
        <span>
          <span>{splitMsg[0]}</span>
          <span><a target="_blank" href={matches[0]}>{matches[0]}</a></span>
          {this.replace(splitMsg[1])}
        </span>
      );
    }
  }

});


