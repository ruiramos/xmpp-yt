
var BaseParser = require('./baseParser');

module.exports = Object.assign({}, BaseParser, {
  regexp: /(@\w+\:?\s)/,

  replace: function(message){
    var matches = message.match(this.regexp);

    if(!matches){
      return <span>{ message }</span>
    } else {
      var splitMsg = message.split(matches[0]);

      return (
        <span>
          <span>{splitMsg[0]}</span>
          <span className="message-mention">{matches[0]}</span>
          {this.replace(splitMsg[1])}
        </span>
      );
    }
  }

});


