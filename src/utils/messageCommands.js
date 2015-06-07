
var ActionTypes = require('../constants').ActionTypes,
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    Api = require('./Api');

function _isVideoId(str){
  return str.match(/[\w\-]+/ ) && str.length === 11;
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
      Api.searchYoutubeFor(vid, function(results){
        var randomVid = results[Math.floor(Math.random() * results.length)];
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