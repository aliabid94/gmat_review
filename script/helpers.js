function scientific(num) {
  var notation_str = num.toExponential();
  var e_pos = notation_str.indexOf("e");
  var base = roundf(notation_str.substring(0, e_pos))
  var exp = roundf(notation_str.substring(e_pos+1))
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
