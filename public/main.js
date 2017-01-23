console.log('sshhh');

$('.like-btn').on('click', function(evt) {
  var $btn = $(evt.target);
  var id = $btn.data().id;
  $.post('/secrets/' + id + '/likes', function(res) {
    console.log(res);
    var secret = res.value;
    var html = render(secret);
    $btn.closest('.secret').html(html);
  });
});

function render(secret) {
  var temp = $('template').html();
  var compile = Handlebars.compile(temp);
  return compile({secret: secret});
}
