const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildReviewSummary,
  normalizeTitle
} = require('../src/review-demo');

test('normalizeTitle trims and collapses whitespace', () => {
  assert.equal(normalizeTitle('  hello   world  '), 'hello world');
});

test('normalizeTitle falls back to a default label', () => {
  assert.equal(normalizeTitle('   '), 'Untitled change');
  assert.equal(normalizeTitle(null), 'Untitled change');
});

test('buildReviewSummary reports the expected shape', () => {
  const summary = buildReviewSummary({
    title: '  Review me  ',
    filesChanged: ['a.js', 'b.js'],
    testsPassing: true
  });

  assert.deepEqual(summary, {
    title: 'Review me',
    fileCount: 2,
    testsPassing: true,
    status: 'ready for review',
    note: '2 files changed.'
  });
});
