// Post's age class
var Age = function () {

  /**
   * constructor
   * @return {void}
   */
  this.init = function () {
    $(document).ready(function () {
      this.updateTime();
    }.bind(this)); 
  };

  /**
   * Updates time
   * @return {void}
   */
  this.updateTime = function () {

    $('.time').each(function () {
      var time = $(this).attr('data-time');
      $(this).text(moment(time).fromNow());
    });

    setTimeout(function () {
      this.updateTime();
    }.bind(this), (60*1000));
  };

};
