'use strict';

var endTime = function (time, expr) {
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

var isNullOrUndefined = function(val) {
  return val === null || val === undefined;
};

var merge = function(obj1, obj2) {
  return Object.keys(obj1)
    .concat(Object.keys(obj2))
    .reduce(function(acc, key) {
      acc[key] = !isNullOrUndefined(obj2[key]) ? obj2[key] : obj1[key];
      return acc;
    }, {});
};

var buildNotes = function(time, musexpr) {
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

var compile = function(musexpr) {
  return buildNotes(0, musexpr);
};
