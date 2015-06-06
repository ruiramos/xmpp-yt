
var BaseParser = require('./baseParser');

module.exports = Object.assign({}, BaseParser, {
  regexp: /(?:http|www)(?:[^\s]*)\/(([^\s]*)(?:\.jpg|\.gif|\.png))(\?|$|\s)/,

  replace: function(message){
    var el = [];
    message.replace(this.regexp, function(match, index, str){
      el.push(
        <span className="rich-message-container">
          <div className="embed">
            <p className="embed-title">Image - {match}</p>
            <img className="image-embed" src={match}/>
          </div>
        </span>
      )
    });

    return el;
  }

});