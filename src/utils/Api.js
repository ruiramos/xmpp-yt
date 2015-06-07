var request = require('superagent');

//@todo request a new one
var YT_KEY = 'AIzaSyDLwX06yG_73ImDEubOb5Yv0E_U1iIdTJs';

var Api = {
  searchYoutubeFor: function(q, callback){
    // Youtube
    request
      .get('https://www.googleapis.com/youtube/v3/search')
      .query({
        key: YT_KEY,
        part: 'snippet',
        q: q,
        type: 'video',
        maxResults: 10,
        videoDefinition: 'high'
      })
      .end(function(err, response){
       var items = response.body.items.map(function(video){
         return {
          id: video.id.videoId,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.medium.url,
          url: 'http://www.youtube.com/watch?v=' + video.id.videoId
        }
      });

      callback && callback(items);

    });
  }
}

module.exports = Api;