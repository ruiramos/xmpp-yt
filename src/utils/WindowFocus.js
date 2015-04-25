
var hiddenProp,
    visibilityChange,
    EventEmitter = require('events').EventEmitter,
    WINDOW_FOCUSED = 'WINDOW_FOCUSED',
    WINDOW_BLURED = 'WINDOW_BLURED';


if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hiddenProp = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hiddenProp = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hiddenProp = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hiddenProp = "webkithiddenProp";
  visibilityChange = "webkitvisibilitychange";
};

var WindowFocus = Object.assign({}, EventEmitter.prototype, {
  handleVisibilityChange: function(){
    console.log('visibility change', WindowFocus.isWindowShown)
    if(WindowFocus.isWindowShown()){
      this.emit(WINDOW_FOCUSED);
    } else {
      this.emit(WINDOW_BLURED);
    }
  },

  onWindowFocused: function(fn){
    this.on(WINDOW_FOCUSED, fn);
  },

  onWindowBlured: function(fn){
    this.on(WINDOW_BLURED, fn);
  },

  isWindowShown: function(){
    return !document[hiddenProp];
  },

});

document.addEventListener(visibilityChange, WindowFocus.handleVisibilityChange.bind(WindowFocus), false);

module.exports = WindowFocus;