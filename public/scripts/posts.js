/**
 * Posts class
 */
var Posts = function () {

  this.socket = null;

  /**
   * Constructor, initializes socket within the class
   * @param  {Object} socket
   * @return {void}
   */
  this.init = function (socket) {
    this.socket = socket;

    $(document).ready(function () {
      this.postHandler();
      this.postSyncer();
    }.bind(this));
    // this.sendPost('send new message from me!');
  };

  /**
   * Sends a post message
   * @param  {string} message
   * @return {void}
   */
  this.postHandler = function (message) {

    $('.post-form').on('click', '#publish', function (e) {
      e.preventDefault();

      var $post = $('#post_message');

      if ($post.val() !== '') {

        var message = $post.val();
        $post.val('');

        this.socket.emit('post_message', {
          username: window.username,
          userColor: window.userColor,
          message: message,
          time: moment().fromNow()
        });
      }
    }.bind(this));

  };

  /**
   * Adds a listener to sin posts
   * @return {void}
   */
  this.postSyncer = function () {

    this.socket.on('post_message', function (response) {
      $('#posts').prepend(
        '<li id="post_' + response.id + '">' +
          '<div class="post">' +
            '<div class="username" style="color: ' + response.userColor + '">' + response.username + '</div>' +
            '<div class="message">' +
              response.message +
              '<div class="post-links">' +
                '<div><a class="reply" href="#" data-post-id="' + response.id + '">Reply</a></div>' +
                '<div class="time" data-time="' + Date() + '">' + response.time + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</li>'
      );
    });
  };

};
