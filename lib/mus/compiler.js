import {
  merge,
  repeat,
  chain as flatMap,
  apply,
  curry,
  cond,
  propEq,
  T,
  flip,
  gt
} from 'ramda';

//    tagIs :: a -> Object -> Boolean
const tagIs = propEq('tag');

//    getGreaterSide :: a -> a
const getGreaterSide = (expr) => gt(expr.left.dur, expr.right.dur)
  ? expr.left
  : expr.right;

//    endTime :: Number -> a -> Number
const endTime = cond([
  [flip(tagIs('note')), (time, expr) => time + expr.dur],
  [flip(tagIs('par')), (time, expr) => endTime(time, getGreaterSide(expr))],
  [T, (time, expr) => endTime(endTime(time, expr.left), expr.right)]
]);

//    buildNote :: Number -> a -> [a]
const buildNote = (time, musexpr) => [
    merge(musexpr, { start: time })
  ];

//    buildPar :: Number -> a -> [a]
const buildPar = (time, musexpr) => flatMap(buildNotes(time), [
    musexpr.left,
    musexpr.right
  ]);

//    buildRepeat :: Number -> a -> [a]
const buildRepeat = (time, musexpr) => buildNotes(time, {
    tag: 'seq',
    left: musexpr.section,
    right: (musexpr.count - 1) > 1
      ? merge(musexpr, { count: musexpr.count - 1 })
      : musexpr.section
  });

//    buildSeq :: Number -> a -> [a]
const buildSeq = (time, musexpr) => flatMap(apply(buildNotes), [
    [time, musexpr.left],
    [endTime(time, musexpr.left), musexpr.right]
  ]);

//    buildNotes :: Number -> a -> [a]
const buildNotes = curry((time, musexpr) => {
  switch(musexpr.tag) {
    case 'note':    return buildNote(time, musexpr);
    case 'par':     return buildPar(time, musexpr);
    case 'seq':     return buildSeq(time, musexpr);
    case 'repeat':  return buildRepeat(time, musexpr);
  }
});

//    compile :: a -> [a]
const compile = buildNotes(0);

export default compile;
