/**
 * Session class
 */
var Session = function () {

  this.socket = null;

  /**
   * Constructor, initializes socket within the class
   * @param  {Object} socket
   * @return {void}
   */
  this.init = function (socket) {
    this.socket = socket;

    $(document).ready(function () {
      this.loginHandler();
    }.bind(this));
  };

  /**
   * Login
   * @return {void}
   */
  this.loginHandler = function () {
    $('#welcome').on('click', '#login', function () {
      var $username = $('#username');
      var user = $username.val();

      if (user === '') {
        $username.addClass('error');
        return;
      }

      $username.removeClass('error');
      this.showLoggedView();
      window.username = user;
      window.userColor = this.getRandomColor();
      this.socket.emit('user_logged_in', { username: user });
    }.bind(this));
  };

  /**
   * Gets a random color from colors array
   * @return {string}
   */
  this.getRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  /**
   * Shows logged in view
   * @return {[type]} [description]
   */
  this.showLoggedView = function () {
    $('.welcome').fadeOut(function () {
      $('#logged-in-view').fadeIn();
    });
  };

};
