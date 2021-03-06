var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var seed = Math.random() * 1000
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
function roundf(f) {
  f = parseFloat(f)
  var int_f = Math.floor(f)
  return int_f + parseFloat((f - int_f).toPrecision(2))
}
function pickRandom(array) {
  return array[Math.floor(random() * array.length)]
}

function getRandomSample(range, size) {
    var arr = []
    for (var j = 0; j <= range; arr.push(j++)) {}
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function autoIndent(textarea) {
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

function parseYAML(str) {
  var reformatted_str = str.replace(/@/g, "\\text{").replace(/#/g, "}").replace(/->/g, "~~ \\rightarrow ~~").replace(/\\/g, "\\\\\\\\")
  return YAML.parse(reformatted_str)
}

function controlCapture(letter, callback) {
  $(window).bind('keydown', function(event) {
      if ((event.ctrlKey || event.metaKey) && String.fromCharCode(event.which).toLowerCase() == letter) {
        event.preventDefault();
        callback()
      }
  })
}
