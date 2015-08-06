import { merge } from 'ramda';

const endTime = (time, expr) => {
  if(expr.tag === 'note') { return time + expr.dur; }

  if(expr.tag === 'par') {
    return endTime(
      time,
      expr.left.dur > expr.right.dur
        ? expr.left
        : expr.right
    );
  }

  return endTime(endTime(time, expr.left), expr.right);
};

const buildNotes = (time, musexpr) => {
  if(musexpr.tag === 'note') {
    return [merge(musexpr, {
      start: time
    })];
  }

  if(musexpr.tag === 'par') {
    return buildNotes(time, musexpr.left)
      .concat(buildNotes(time, musexpr.right));
  }

  return buildNotes(time, musexpr.left)
    .concat(buildNotes(
      endTime(time, musexpr.left),
      musexpr.right
    ));
};

const compile = (musexpr) => {
  return buildNotes(0, musexpr);
};

export default compile;
