import { expect } from 'chai';
import mus from '../lib/mus';
import * as fixtures from './fixtures/mus';

describe('mus', function() {
  describe('compiler', () => {
    it('should compile notes', () => {
      const output = mus.compile(fixtures.note);

      expect(output).to.deep.equal([
        { tag: 'note', pitch: 'e5', start: 0, dur: 500 }
      ]);
    });

    it('should compile seq\'s', () => {
      const output = mus.compile(fixtures.seq);

      expect(output).to.deep.equal([
        { tag: 'note', pitch: 'e5', start: 0, dur: 500 },
        { tag: 'note', pitch: 'a4', start: 500, dur: 250 }
      ]);
    });

    it('should compile par\'s', () => {
      const output = mus.compile(fixtures.par);

      expect(output).to.deep.equal([
        { tag: 'note', pitch: 'c3', start: 0, dur: 250 },
        { tag: 'note', pitch: 'g4', start: 0, dur: 500 },
        { tag: 'note', pitch: 'd3', start: 500, dur: 500 },
        { tag: 'note', pitch: 'f4', start: 500, dur: 250 }
      ]);
    });
  });
});
