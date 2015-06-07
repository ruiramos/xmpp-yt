
var ActionTypes = require('../constants').ActionTypes,
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    Api = require('./Api');

function _isVideoId(str){
  return str && str.match(/[\w\-]+/ ) && str.length === 11;
}

module.exports = {
  playHandler: function(vid){
    if(_isVideoId(vid)){
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.CHANGE_VIDEOID,
          payload: {
            videoId: vid
          }
        });
    } else {
      var query,
          random = false;

      if(vid && vid.indexOf('#random') > -1){
        query = vid.split('#random').join('').trim();
        random = true;
      } else {
        query = vid;
      }

      Api.searchYoutubeFor(query, function(results){
        var pos = random ? Math.floor(Math.random() * results.length) : 0;
        var randomVid = results[pos];
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.CHANGE_VIDEOID,
          payload: {
            videoId: randomVid.id
          }
        });
      })
    }
  }
}