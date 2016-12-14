# d3-jnd

To access the latest version of d3-jnd, grab it on
[unpkg](https://unpkg.com/d3-jnd). Note that d3-jnd depends on
[d3-color](https://github.com/d3/d3-color).

This module extends D3 to support color just-noticeable difference (JND)
research by Maureen Stone, Danielle Albers Szafir, and Vidya Setlur ([link](https://research.tableau.com/paper/engineering-model-color-difference-function-size)).
```
@inproceedings{stone-2014-emc,
  title={An engineering model for color difference as a function of size},
  author={Stone, Maureen and Szafir, Danielle Albers and Setlur, Vidya},
  booktitle={Color and Imaging Conference},
  volume={2014},
  number={2014},
  pages={253--258},
  year={2014},
  organization={Society for Imaging Science and Technology}
}
```

d3-jnd has two functions: ``d3.noticeablyDifferent()`` and ``d3.jndInterval``.
Both take ``size`` and ``percent`` arguments, which alter how conservative JND
estimations are.

Note that the recommendations that are provided by this library are predicted
JND intervals, and should be treated as guidelines rather than absolute truth.
See the [d3-jnd website](https://connorgr.github.io/d3-jnd) for more information
about how to manipulate d3-jnd function arguments appropriately.

```
var c1 = d3.lab('black'),
    c2 = d3.rgb('white'),
    legible = d3.noticeablyDifferent(c1, c2); // true

var intervals = d3.jndInterval(0.5, 0.3);

var strictlyLegible = d3.noticeablyDifferent(c1, c2, 0.95, 0.1);
```

# Installation
###

After downloading the repo, run ``npm install``, which will install any
dependencies. You can optionally install from npm opposed to cloning directly
from GitHub. Make sure to load d3-cam02 after d3-color.

**Dependencies:** [d3-color](https://github.com/d3/d3-color)

## API Reference
###

<a name="noticeablyDifferent" href="#noticeablyDifferent">#</a> d3.<b>noticeablyDifferent</b>(<i>color</i>, <i>color</i>[, <i>percent</i>, <i>size</i>]) [<>](https://github.com/connorgr/d3-jnd/blob/master/src/jnd.js#L78 "Source")<br>

A function that returns true/false based on whether the two provided colors are
noticeably different. Percent controls the percent of audience that will likely
see a difference between the two colors quickly and easily.
Size refers to the estimated visual angle of color area (smaller areas are
harder to discriminate).

<a name="jndInterval" href="#jndInterval">#</a> d3.<b>noticeablyDifferent</b>(<i>percent</i>, <i>size</i>) [<>](https://github.com/connorgr/d3-jnd/blob/master/src/jnd.js#L64 "Source")<br>

As d3.noticeablyDifferent except it returns the intervals along L*, a*, and b*
channels of CIELAB that produce differences equal to "1 JND".
