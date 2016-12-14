var tape = require("tape"),
    d3_color = require("d3-color"),
    d3_jnd = require("../");

tape("noticeablyDifferent(…) returns correct responses", function(test) {
  var c1 = d3_color.lab(100, 0, 0),
      c2 = d3_color.lab(0,0,0);
  test.equal(d3_jnd.noticeablyDifferent(c1, c2), true);
  c2 = c1;
  test.equal(d3_jnd.noticeablyDifferent(c1, c2), false);
  test.end();
});

// There are no tests for jndInterval, because published interval values are for
// Stone et al.'s ND(size) function rather than their generalized
// ND(percent, size) function, which is used in d3-jnd.
