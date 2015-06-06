

var BaseParser = require('./baseParser');

module.exports = Object.assign({}, BaseParser, {
  regexp: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?\s]*).*/,

  replace: function(message){
    var el = [],
        that = this;

    message.replace(this.regexp, function(match, index, str){
      var matches = match.match(that.regexp);
      el.push(
        <span>
          <div className="embed">
            <p className="embed-title">Youtube Video</p>
            <iframe className="video-embed" width="560" height="315" src={"https://www.youtube.com/embed/" + matches[2]} frameborder="0" allowfullscreen></iframe>
          </div>
        </span>
      )
    });

    return el;
  }

});
