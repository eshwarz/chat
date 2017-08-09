/**
 * Comments class
 */
var Comments = function () {

  var _this = this;

  this.socket = null;

  /**
   * Constructor, initializes socket within the class
   * @param  {Object} socket
   * @return {void}
   */
  this.init = function (socket) {
    this.socket = socket;

    $(document).ready(function () {
      this.openCommenter();
      this.commentHandler();
      this.commentSyncer();
    }.bind(this));
  };

  /**
   * Opens reply / comment box
   * @return {void}
   */
  this.openCommenter = function (e) {
    $('#posts').on('click', '.reply', function () {
      e.preventDefault();
      _this.openCommenterForPost($(this));
    });
  };

  /**
   * Opens commenter for given post
   * @param  {Element} instance - Reply button instance
   * @return {void}
   */
  this.openCommenterForPost = function (instance) {
    var postId = instance.attr('data-post-id');

    if ($('#comments_' + postId).length > 0) {
        $('#comments_' + postId + ' textarea').focus();
        return;
      }

      instance.closest('li').append(
        '<ul class="comments" id="comments_' + postId + '">' +
          '<li class="commenter">' +
            '<textarea class="comment_message" placeholder="Write your comment here!"></textarea>' +
            '<div class="flexbox">' +
              '<button class="publish-comment btn small" data-post-id="' + postId + '">Comment</button>' +
            '</div>' +
          '</li>' +
        '</ul>'
      );
      $('#comments_' + postId + ' textarea').focus();
  };

  /**
   * Sends a comment message
   * @param  {string} message
   * @return {void}
   */
  this.commentHandler = function (message) {

    $('#posts').on('click', '.publish-comment', function (e) {

      e.preventDefault();
      var postId = $(this).attr('data-post-id');
      var $comment = $('#comments_' + postId + ' textarea');

      if ($comment.val() !== '') {

        var message = $comment.val();
        $comment.val('');

        _this.socket.emit('comment_message', {
          postId: postId,
          username: window.username,
          userColor: window.userColor,
          message: message,
          time: moment().fromNow()
        });
      }
    });

  };

  /**
   * Adds a listener to sin posts
   * @return {void}
   */
  this.commentSyncer = function () {
    this.socket.on('comment_message', function (response) {

      var $commenter = $('#post_' + response.postId + ' ul.comments li.commenter');

      // add comment box in case there is none
      if ($commenter.length === 0) {
        var $replyInstance = $('#post_' + response.postId + ' .reply');
        _this.openCommenterForPost($replyInstance);
      }

      // add comment to the post
      $('#post_' + response.postId + ' ul.comments li.commenter').before(
        '<li>' +
          '<div class="comment">' +
            '<div class="username" style="color: ' + response.userColor + '">' + response.username + '</div>' +
            '<div class="message">' +
              response.message +
              '<div class="comment-links">' +
                '<div class="time" data-time="' + Date() + '">' + response.time + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</li>'
      );
    });
  };

};
