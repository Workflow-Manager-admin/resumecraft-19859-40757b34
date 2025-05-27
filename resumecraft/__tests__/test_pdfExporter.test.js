const pdfExporter = require('../src/services/pdfExporter');

describe('pdfExporter', () => {
  it('should return a buffer (dummy PDF header)', async () => {
    const buf = await pdfExporter.exportDocumentToPdf('<h1>Doc</h1>', 'file.pdf');
    expect(Buffer.isBuffer(buf)).toBe(true);
    expect(buf.toString('utf-8')).toContain('%PDF-1.4');
  });
});
