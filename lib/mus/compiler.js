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

const tagIs = propEq('tag');

const getGreaterSide = (expr) => gt(expr.left.dur, expr.right.dur)
  ? expr.left
  : expr.right;

const endTime = cond([
  [flip(tagIs('note')), (time, expr) => time + expr.dur],
  [flip(tagIs('par')), (time, expr) => endTime(time, getGreaterSide(expr))],
  [T, (time, expr) => endTime(endTime(time, expr.left), expr.right)]
]);

const buildNotes = curry((time, musexpr) => {
  if(musexpr.tag === 'note') {
    return [
      merge(musexpr, { start: time })
    ];
  }

  if(musexpr.tag === 'par') {
    return flatMap(buildNotes(time), [
      musexpr.left,
      musexpr.right
    ]);
  }

  if(musexpr.tag === 'repeat') {
    const right = (musexpr.count - 1) > 1
      ? merge(musexpr, { count: musexpr.count - 1 })
      : musexpr.section;

    return buildNotes(time, {
      tag: 'seq',
      left: musexpr.section,
      right
    });
  }

  return flatMap(apply(buildNotes), [
    [time, musexpr.left],
    [endTime(time, musexpr.left), musexpr.right]
  ]);
});

const compile = (musexpr) => {
  return buildNotes(0, musexpr);
};

export default compile;
