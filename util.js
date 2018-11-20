var seed = 1
function scientific(num) {
  var notation_str = num.toExponential();
  var e_pos = notation_str.indexOf("e");
  var base = parseFloat(notation_str.substring(0, e_pos))
  var exp = parseFloat(notation_str.substring(e_pos+1))
  return base + " * 10 ^ {" + exp + "}";
}
function getGCD(n, d) {
  if (typeof n != "number" || typeof d != "number") {
    throw "GCD arguments must be numbers"
  }
  var numerator = n < d ? n : d;
  var denominator = n < d ? d : n;
  var remainder = numerator;
  var lastRemainder = numerator;

  while (true) {
    lastRemainder = remainder;
    remainder = denominator % numerator;
    if (remainder === 0) {
      break;
    }
    denominator = numerator;
    numerator = remainder;
    if (loop_len > 100) {
      throw "Something happened to GCD"
    }
    loop_len += 1
  }
  if (lastRemainder) {
    return lastRemainder;
  }
}
function simplify(a, b) {
  var gdc = getGCD(a, b);
  a = a / gdc;
  b = b / gdc;
  if (b == 1) {
    return b;
  } else {
    return `\\\\frac{${a}}{${b}}`;
  }
}
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
function pickRandom(array) {
  return array[Math.floor(random() * array.length)]
}

function getRandomSample(range, size) {
    var arr = []
    for (var j = 0; j <= range; arr.push(j++)) {}
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function autoindent(textarea) {
  $(textarea).keydown(function(e)
  {
      if (e.which == 9) //ASCII tab
      {
          e.preventDefault();
          var start = this.selectionStart;
          var end = this.selectionEnd;
          var v = $(this).val();
          if (start == end)
          {
              $(this).val(v.slice(0, start) + "    " + v.slice(start));
              this.selectionStart = start+4;
              this.selectionEnd = start+4;
              return;
          }

          var selectedLines = [];
          var inSelection = false;
          var lineNumber = 0;
          for (var i = 0; i < v.length; i++)
          {
              if (i == start)
              {
                  inSelection = true;
                  selectedLines.push(lineNumber);
              }
              if (i >= end)
                  inSelection = false;

              if (v[i] == "\n")
              {
                  lineNumber++;
                  if (inSelection)
                      selectedLines.push(lineNumber);
              }
          }
          var lines = v.split("\n");
          for (var i = 0; i < selectedLines.length; i++)
          {
              lines[selectedLines[i]] = "    " + lines[selectedLines[i]];
          }

          $(this).val(lines.join("\n"));
      }
  });
  $(textarea).keypress(function(e)
  {
      if (e.which == 13) // ASCII newline
      {
          setTimeout(function(that)
          {
              var start = that.selectionStart;
              var v = $(that).val();
              var thisLine = "";
              var indentation = 0;
              for (var i = start-2; i >= 0 && v[i] != "\n"; i--)
              {
                  thisLine = v[i] + thisLine;
              }
              for (var i = 0; i < thisLine.length && thisLine[i] == " "; i++)
              {

                  indentation++;
               }
               $(that).val(v.slice(0, start) + " ".repeat(indentation) + v.slice(start));
               that.selectionStart = start+indentation;
               that.selectionEnd = start+indentation;
  }, 0.01, this);
       }
  });
}

function double_slash(str) {
  return str.replace(/@/g, "\\text{").replace(/#/g, "}").replace(/->/g, "~~ \\rightarrow ~~").replace(/\\/g, "\\\\\\\\")
}

function control_capture(letter, callback) {
  $(window).bind('keydown', function(event) {
      if ((event.ctrlKey || event.metaKey) && String.fromCharCode(event.which).toLowerCase() == letter) {
        event.preventDefault();
        callback()
      }
  })
}
