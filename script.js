function render_to_string(i, question_number, answer, correct_answer) {
  return `
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
  </div>`
}
