/**
 * CommentsListener class
 */
var CommentsListener = function () {

  this.io = null;
  this.socket = null;

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
    this.commentMessageHandler();
  };

  /**
   * sets the user
   * @return {void}
   */
  this.commentMessageHandler = function () {
    this.socket.on('comment_message', function (response) {
      this.io.emit('comment_message', response);
    }.bind(this));
  };

};

module.exports = new CommentsListener();
