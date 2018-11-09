$(".answers button").click(function (evt) {
  $(evt.target).parent().find("button").removeClass("blue")
  $(evt.target).addClass("blue")
});

$(".hint").click(function (evt) {
  $(evt.target).text("Another Hint?")
});
