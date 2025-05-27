const grammarChecker = require('../src/services/grammarChecker');

describe('grammarChecker', () => {
  it('should return unchanged text and empty issues array', async () => {
    const res = await grammarChecker.checkGrammar('Some simple text.');
    expect(res).toHaveProperty('corrected', 'Some simple text.');
    expect(Array.isArray(res.issues)).toBe(true);
    expect(res.issues).toHaveLength(0);
  });
});
