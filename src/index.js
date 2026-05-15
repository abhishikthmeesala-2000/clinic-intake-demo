const { buildReviewSummary } = require('./review-demo');

const summary = buildReviewSummary({
  title: '  Auto PR Review demo  ',
  filesChanged: ['src/review-demo.js', 'test/review-demo.test.js'],
  testsPassing: true
});

console.log(JSON.stringify(summary, null, 2));
