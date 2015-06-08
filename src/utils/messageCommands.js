
var ActionTypes = require('../constants').ActionTypes,
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    Api = require('./Api');

function _isVideoId(str){
  return str && str.match(/^[\w\-]+$/) && str.length === 11;
}

module.exports = {
  playHandler: function(vid, msg){
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
        if(results.length){
          var pos = random ? Math.floor(Math.random() * results.length) : 0;
          var randomVid = results[pos];

          AppDispatcher.dispatchServerAction({
            type: ActionTypes.CHANGE_VIDEOID,
            payload: {
              videoId: randomVid.id
            }
          });

        } else {
          AppDispatcher.dispatchServerAction({
            type: ActionTypes.VIDEO_NOT_FOUND,
            payload: {
              message: query
            }
          });


        }
      })
    }
  },

  playSendHandler: function(msg, fn){
    var query, random;

    if(msg && msg.indexOf('#random') > -1){
      query = msg.split('#random').join('').trim();
      random = true;
    } else {
      query = msg;
    }

    Api.searchYoutubeFor(query, function(results){
      if(results.length){
        var pos = random ? Math.floor(Math.random() * results.length) : 0;
        var randomVid = results[pos];

        // AppDispatcher.dispatchServerAction({
        //   type: ActionTypes.CHANGE_VIDEOID,
        //   payload: {
        //     videoId: randomVid.id
        //   }
        // });

        fn('/play '+randomVid.id);

      } else {
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.VIDEO_NOT_FOUND,
          payload: {
            message: query
          }
        });
      }
    })

  },

  stopHandler: function(){
    AppDispatcher.dispatchServerAction({
      type: ActionTypes.STOP_VIDEO,
      payload: {}
    });
  },

  resumeHandler: function(){
    AppDispatcher.dispatchServerAction({
      type: ActionTypes.RESUME_VIDEO,
      payload: {}
    });
  }

}