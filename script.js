const NUM_QUESTIONS = 15

$.get("https://raw.githubusercontent.com/aliabid94/gmat_review/master/answers.yaml", function(data) {
  answers = YAML.parse(data)
  var question_numbers = getRandomSample(Object.keys(answers).length-1, NUM_QUESTIONS)
  var html =`<h1 class='final_score'>Final Score: <span class='score'></span> <small>/ ${NUM_QUESTIONS}</small></h1>`
  for (var i = 0; i < question_numbers.length; i++) {
    question_number = question_numbers[i]+1
    answer = answers[question_number]
    correct_answer = answer.answer
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
                <button class='ui button fluid choice ${correct_answer == "A" ? "correct" : ""}'>A</button>
                <button class='ui button fluid choice ${correct_answer == "B" ? "correct" : ""}'>B</button>
                <button class='ui button fluid choice ${correct_answer == "C" ? "correct" : ""}'>C</button>
                <button class='ui button fluid choice ${correct_answer == "D" ? "correct" : ""}'>D</button>
                <button class='ui button fluid choice ${correct_answer == "E" ? "correct" : ""}'>E</button>
              </div>
            </div>
          </div>
          ${answer["hints"].map(str => "<div class='hint'>"+katex.renderToString(str)+"</div>").join("")}
          <button class='ui blue button add_hint'>Hint?</button>
        </div>
      </div>
    `
  }
  html += `
    <div class="check_answers"><button class="ui button huge fluid blue">Check answers!</div></div>
  `
  $("body").append(html);
});

$("body").on("click", ".answers button", function (evt) {
  $(evt.target).parent().find("button").removeClass("blue").removeClass("selected")
  $(evt.target).addClass("blue").addClass("selected")
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

$("body").on("click", ".check_answers", function (evt) {
  $(".check_answers").hide()
  $(".add_hint").hide()
  $(".hint").show()
  $(".final_score").show()
  $(".selected").removeClass("blue")
  $(".selected:not(.correct)").addClass("red")
  $(".selected.correct").addClass("green")
  $(".choice").addClass("disabled")
  $(".score").text($(".selected.correct").length)
  window.scrollTo(0,document.body.scrollHeight);
  $("html, body").animate({ scrollTop: 0 }, "slow") 
});
