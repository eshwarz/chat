/**
 * PostsListener class
 */
var PostsListener = function () {

  this.io = null;
  this.socket = null;
  this.count = 0;

  /**
   * constructor
   * @param  {Object} socket
   * @param  {Object} io
   * @return {void}
   */
  this.init = function (socket, io) {
    this.io = io;
    this.socket = socket;
    // handlers
    this.postMessageHandler();
  };

  /**
   * sets the user
   * @return {void}
   */
  this.postMessageHandler = function () {
    this.socket.on('post_message', function (response) {
      // incrementing the post count acts as primary key
      this.count++;
      response.id = this.count;
      this.io.emit('post_message', response);
    }.bind(this));
  };

};

module.exports = new PostsListener();
