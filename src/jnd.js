// Implementation based on Maureen Stone, Danielle Albers Szafir, and Vidya
// Setlur's paper "An Engineering Model for Color Difference as a Function of
// Size" presented at the Color Imaging Conference, and can be found online at
// https://research.tableau.com/sites/default/files/2014CIC_48_Stone_v3.pdf
//
// Their paper examines target sizes (visual angle) ranging from 6 to 1/3
// degree, so note that extrapolations outside that range contain additional
// untesteed assumptions about color appearence.

// To calculate whether colors are noticeably different, colors are translated
// into CIELAB perceptual color space. Further, users must specifiy a visual
// angle for how large the colored elements are (e.g., bars in a bar chart)
// along their smallest dimension (e.g., width for 25px wide x 100px tall bars).

// Variable definitions:
// nd: noticeable difference
// p: a threshold defined as the percentage of observers who see two colors
//    separated by a particular color space interval (e.g., along L*) as
//    different.
// s: size, specified in degrees of visual angle

//----------------------------------------.
// PREDICTING DISCRIMINABILITY THRESHOLDS  \___________________________________
//=============================================================================|
// // p = V(s)*Delta_D + e (i.e., y=ax+b), where
//               s: size,
//      V(s) and D: vector values of L*, a*, b*
//               e: error term
//         Delta_D: a step in CIELAB space
//            V(s): a vector of three slopes, which differ along L*, a*, and b*
//
// Therefore, Delta_D = nd(p) = p / V(s)
//
// For calculating just noticeable differences (JND), we'll assume that p should
// be fixed at 50%, which then leaves size as the only free variable for
// calculating discriminability intervals along L*, a*, and b* color channels.
//
// ND(50, s) = C(50) + K(50)/s, where C and K are regression coefficients
//
// Stone et al. also provide a generalized formula that can support p and s both
// as free variables based on additional regressions (see paper):
//
// ND(p,s) = p(A+B/s), where
//               s: size,
//               p: % of observers who see colors as different ([0,1])
//         A and B: preset values that differ for each channel
//
import {lab} from "d3-color";




function nd(p,s) {
  var A = {l: 10.16, a: 10.68, b: 10.70},
      B = {l:  1.50, a:  3.08, b:  5.74};

  return {
    l: p * (A.l + B.l / s),
    a: p * (A.a + B.a / s),
    b: p * (A.b + B.b / s)
  };
}

export default function jndLabInterval(p, s) {
  if(typeof s === "string") {
    if(s === "thin") s = 0.1;
    else if(s === "medium") s = 0.5;
    else if(s === "wide") s = 1.0;
    else s = 0.1;
  }
  if(typeof p === "string") {
    if(s === "conservative") p = 0.8;
    else p = 0.5;
  }
  return nd(p, s);
}

export function noticeablyDifferent(c1, c2, s, p) {
  if(arguments.length < 3) s = 0.1;
  if(arguments.length < 4) p = 0.5;

  var jnd = jndLabInterval(p, s);
  c1 = lab(c1);
  c2 = lab(c2);

  return c1.l-c2.l >= jnd.l || c1.a-c2.a >= jnd.a || c1.b-c2.b >= jnd.b;
}
