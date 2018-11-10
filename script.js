$(".answers button").click(function (evt) {
  $(evt.target).parent().find("button").removeClass("blue")
  $(evt.target).addClass("blue")
});

$(".add_hint").click(function (evt) {
  var hints = $(evt.target).parent().find(".hint")
  var opened = false;
  var hints_complete = true
  for (var i = 0; i < hints.length; i++) {
    if (opened) {
      hints_complete = false
    }
    var hint = hints[i];
    if ($(hint).is(":hidden") && opened == false) {
      $(hint).show();
      opened = true;
    }
  }
  
  if (hints_complete) {
    $(evt.target).hide()
  } else {
    $(evt.target).text("Another Hint?")
  }
});
    
$.get("https://raw.githubusercontent.com/aliabid94/gmat_review/master/answers.yaml", function(data) {
  var answers = YAML.parse(data)
  console.log(answers)
});
