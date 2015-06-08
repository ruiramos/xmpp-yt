
var EventEmitter = require('events').EventEmitter,
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    ChatConstants = require('../constants'),
    ActionTypes = ChatConstants.ActionTypes,
    CHANGE_EVENT = 'change';

var _videoId,
    _running = false;

var VideoStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getId: function(){
    return _videoId;
  },

  getAll: function(){
    return {
      videoId: _videoId,
      running: _running
    }
  }

});

AppDispatcher.register(function(action) {

  switch(action.type) {
    case ActionTypes.CHANGE_VIDEOID:
      _videoId = action.payload.videoId;
      _running = true;
      VideoStore.emitChange();
      break;

    case ActionTypes.STOP_VIDEO:
      _running = false;
      VideoStore.emitChange();
      break;

    case ActionTypes.RESUME_VIDEO:
      _running = true;
      VideoStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = VideoStore;