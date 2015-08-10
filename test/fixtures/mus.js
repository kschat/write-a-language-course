'use strict';

export const note = { tag: 'note', pitch: 'e5', dur: 500 };

export const seq = {
  tag: 'seq',
  left: note,
  right: { tag: 'note', pitch: 'a4', dur: 250 }
};

export const par = {
  tag: 'seq',
  left: {
    tag: 'par',
    left: { tag: 'note', pitch: 'c3', dur: 250 },
    right: { tag: 'note', pitch: 'g4', dur: 500 }
  },
  right: {
    tag: 'par',
    left: { tag: 'note', pitch: 'd3', dur: 500 },
    right: { tag: 'note', pitch: 'f4', dur: 250 }
  }
};

export const repeat = {
  tag: 'repeat',
  section: { tag: 'note', pitch: 'a4', dur: 250 },
  count: 4
};
