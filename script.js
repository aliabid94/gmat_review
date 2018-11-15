const NUM_QUESTIONS = 65
const REWARD_RATE = 5
selected = {}
cuteness = {}

$.get("https://raw.githubusercontent.com/aliabid94/gmat_review/master/cuteness.yaml", function(data) {
  cuteness = YAML.parse(data)
});

$.get("https://raw.githubusercontent.com/aliabid94/gmat_review/master/answers.yaml", function(data) {
  answers = YAML.parse(data)
  var question_numbers = getRandomSample(Object.keys(answers).length-1, NUM_QUESTIONS)
  var html =`<h1 class='final_score'>Final Score: <span class='score'></span> <small>/ ${NUM_QUESTIONS}</small></h1>`
  for (var i = 0; i < question_numbers.length; i++) {
    question_number = question_numbers[i]+1
    answer = answers[question_number]
    correct_answer = answer.answer
    html += `
      <div class='problem' num="${i+1}">
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
                <button class='ui button fluid choice ${correct_answer == "A" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Statement 1 only" : "A"}</button>
                <button class='ui button fluid choice ${correct_answer == "B" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Statement 2 only" : "B"}</button>
                <button class='ui button fluid choice ${correct_answer == "C" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Either Statement 1 or 2" : "C"}</button>
                <button class='ui button fluid choice ${correct_answer == "D" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Statement 1 & 2 together" : "D"}</button>
                <button class='ui button fluid choice ${correct_answer == "E" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Together insufficient" : "E"}</button>
              </div>
            </div>
          </div>
          ${answer["hints"].map(str => "<div class='hint'>"+katex.renderToString(str)+"</div>").join("")}
          <button class='ui blue button add_hint'>Hint?</button>
        </div>
      </div>
      ${((i+1) % REWARD_RATE == 0) ? "<div class='reward'><div class='ui message yellow' scope='"+(i-REWARD_RATE+2)+"-"+(i+1)+"'></div></div>" : ""}
    `
  }
  html += `
    <div class="check_answers"><button class="ui button huge fluid blue">Check answers!</div></div>
  `
  $("body").append(html);
})

$("body").on("click", ".answers button", function (evt) {
  $(evt.target).parent().find("button").removeClass("blue").removeClass("selected")
  $(evt.target).addClass("blue").addClass("selected")
  var problem = $(evt.target).parent().parent().parent().parent().parent().attr('num')
  selected[problem] = true
  $( ".reward > .message" ).each(function( index ) {
    if ($(this).hasClass("loaded")) {
      return;
    }
    var bounds = $(this).attr("scope").split("-")
    var start = parseInt(bounds[0])
    var end = parseInt(bounds[1])
    var complete_flag = true
    for (var i = start; i <= end; i++) {
      if (!$(".problem[num="+i+"]").find(".selected").length) {
        complete_flag = false
        break
      }
    }
    if (complete_flag) {
      var total_reward = Object.keys(cuteness).length
      var reward = cuteness[Math.floor(total_reward * Math.random())]
     $(this).append("<h4>"+reward.title+"</h4>")
     $(this).append("<img src='"+reward.link+"' /><br>")
     $(this).addClass("loaded")
    }
  })
})

$("body").on("click", ".add_hint", function (evt) {
  var hints = $(evt.target).parent().find(".hint")
  var opened = false
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
  window.scrollTo(0,document.body.scrollHeight)
  $("html, body").animate({ scrollTop: 0 }, "slow") 
});
