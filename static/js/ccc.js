$(function() {
    console.log( "ready!" );
    $('.question-box .button').click(function() {
        console.log('yeearh');
    });

    function getInfo() {
      console.log($.cookie('connect.sid'));
      console.log($.cookie());
      $.get('/info', { code: "John"} )
        .done(function(data) {
          console.log(data);
        });
    }

    function getQuestion() {

    }

    getInfo();
});
