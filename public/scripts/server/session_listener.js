/**
 * Session class
 */
var SessionListener = function () {

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

    this.onSaveUser();
  };

  /**
   * sets the user
   * @return {void}
   */
  this.onSaveUser = function () {
    this.socket.on('user_logged_in', function (response) {
      this.socket.username = response.username;
    }.bind(this));
  };

};

module.exports = new SessionListener();
