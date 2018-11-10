const NUM_QUESTIONS = 10

$.get("https://raw.githubusercontent.com/aliabid94/gmat_review/master/answers.yaml", function(data) {
  answers = YAML.parse(data)
  var question_numbers = getRandomSample(Object.keys(answers).length-1, NUM_QUESTIONS)
  var html = ""
  for (var i = 0; i < question_numbers.length; i++) {
    question_number = question_numbers[i]+1
    answer = answers[question_number]
    html += `
      <div class='problem'>
        <div class='ui message'>
          <div class='question-number'>
            <div class='ui header'>Question ${i+1}</div>
          </div>
          <div>
            <div class='question ui segment'>
              <img src='questions/${question_number}.png'>
            </div>
            <div class='answers'>
              <div class='ui vertical buttons'>
                <button class='ui button fluid'>A</button>
                <button class='ui button fluid'>B</button>
                <button class='ui button fluid'>C</button>
                <button class='ui button fluid'>D</button>
                <button class='ui button fluid'>E</button>
              </div>
            </div>
          </div>
          ${answer["hints"].map(str => "<div class='hint'>"+katex.renderToString(str)+"</div>").join("")}
          <button class='ui yellow button add_hint'>Hint?</button>
        </div>
      </div>
    `
  }
  $("body").append(html);
});

$("body").on("click", ".answers button", function (evt) {
  $(evt.target).parent().find("button").removeClass("blue")
  $(evt.target).addClass("blue")
});

$("body").on("click", ".add_hint", function (evt) {
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
