
module.exports = {
  regexp: /\w/, // word!

  matches: function(message){
    return message.match(this.regexp);
  },

  replace: function(message){
    return message;
  }
}