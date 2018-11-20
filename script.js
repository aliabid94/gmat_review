function render_to_string(i, answer) {
  if ("variables" in answer) {
    for(variable_expression of answer["variables"]) {
      var type = variable_expression["type"] || "int"
      var parse_command = ""
      if (type == "int") {
        parse_command = "parseInt"
      } else if (type == "float") {
        parse_command = "parseFloat"
      }
      var expr_string = "var " + variable_expression["name"] + " = " + parse_command + "(`" + pickRandom(variable_expression["values"]) + "`)"
      eval(expr_string)
    }
  }
  answer = JSON.parse(eval("`" + JSON.stringify(answer) + "`"))
  var choices = answer.choices || []
  return `
   <div class='ui message'>
    <div class='question-number'>
      <div class='ui header'>Question ${i+1}</div>
    </div>
    <div class="white_canvas">
      <div class='question ui segment fluid'>
        ${katex.renderToString(answer["question"] || "")}
        <div class='answers'>
          <div class='ui vertical buttons'>
            <button class='ui button fluid choice ${answer["answer"] == "A" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Statement 1 only" : "A) &nbsp;" + katex.renderToString(choices["A"] || "")}</button>
            <button class='ui button fluid choice ${answer["answer"] == "B" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Statement 2 only" : "B) &nbsp;" + katex.renderToString((choices || {})["B"] || "")}</button>
            <button class='ui button fluid choice ${answer["answer"] == "C" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Either Statement 1 or 2" : "C) &nbsp;" + katex.renderToString((choices || {})["C"] || "")}</button>
            <button class='ui button fluid choice ${answer["answer"] == "D" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Statement 1 & 2 together" : "D) &nbsp;" + katex.renderToString((choices || {})["D"] || "")}</button>
            <button class='ui button fluid choice ${answer["answer"] == "E" ? "correct" : ""}'>${answer.type == "data_sufficiency" ? "Together insufficient" : "E) &nbsp;" + katex.renderToString((choices || {})["E"] || "")}</button>
          </div>
        </div>
      </div>
    </div>
    ${(answer["solution"] || []).map(str => "<div class='hint'>"+katex.renderToString(str)+"</div>").join("")}
    <button class='ui blue button add_hint'>Hint?</button>
  </div>`
}
