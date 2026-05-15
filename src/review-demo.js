function normalizeTitle(title) {
  if (typeof title !== 'string') {
    return 'Untitled change';
  }

  const cleaned = title.trim().replace(/\s+/g, ' ');
  return cleaned.length > 0 ? cleaned : 'Untitled change';
}

function buildReviewSummary({ title, filesChanged = [], testsPassing = false }) {
  const normalizedTitle = normalizeTitle(title);
  const fileCount = Array.isArray(filesChanged) ? filesChanged.length : 0;

  return {
    title: normalizedTitle,
    fileCount,
    testsPassing,
    status: testsPassing ? 'ready for review' : 'needs attention',
    note: fileCount === 0 ? 'No files changed yet.' : `${fileCount} file${fileCount === 1 ? '' : 's'} changed.`
  };
}

module.exports = {
  buildReviewSummary,
  normalizeTitle
};
