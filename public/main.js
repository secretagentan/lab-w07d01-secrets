console.log('sshhh');

var $input = $('input');
var $addBtn = $('.add-btn');
var $deleteBtn = $('.remove-btn')
var $message = $(".message");
// var $focus = $("#focus");
// $input.focus();
// $focus.focus();

$addBtn.on('click', function(evt) {
  var newSecret = $input.val();
  // console.log(newSecret);
  $.post('/secrets', {message: newSecret}, function(res) {
    getSecrets();
    // console.log(res);
    $input.focus();
  })
  $input.val('');
});

function getSecrets() {
  $.get('/secrets', function(res) {
    // console.log(res);
    render(res);
  })
}

$deleteBtn.on('click', function(evt) {
  var $btn = $(evt.target);
  var id = $btn.data().id;
  $.ajax({
    method: "DELETE",
    url: '/secrets/'+ id
  }).then(function(res) {
    console.log(res);
  })
})

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
