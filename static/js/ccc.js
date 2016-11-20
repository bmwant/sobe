$(function() {
    console.log( "ready!" );
    $('.question-box .button').click(function() {
      var sid = $.cookie('sid');
      var answer = $(this).data('answer');

      $.post('/submit', {answer: answer})
        .done(function(d) {
          if(d.finished) {
            window.location.href = '/result';
          } else {
            next();
          }
      });
    });

    function getInfo() {
      $.get('/info')
        .done(function(data) {
          $('#info-pic').attr('src', '/img/'+data.photo);
          $('.info-text-ua').text(data.textUa);
          $('.info-text-en').text(data.textEng);
        });
    }

    function getQuestion() {
      $.get('/question')
        .done(function(data) {
          $('.question-ua').text(data.textUa);
          $('.question-en').text(data.textEng);
        });
    }

    function next() {
      getInfo();
      getQuestion();
    }

    next();
});
