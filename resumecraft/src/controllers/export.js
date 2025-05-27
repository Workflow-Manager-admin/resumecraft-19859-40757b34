/**
 * Controller for /export-pdf route. Exports a given document as PDF.
 */
class ExportController {
  // PUBLIC_INTERFACE
  export(req, res) {
    const { document, fileName } = req.body;
    // Placeholder: Return dummy PDF buffer
    const buffer = Buffer.from('%PDF-1.4\n%ResumeCraft Dummy PDF\n', 'utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName || 'document'}.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  }
}

module.exports = new ExportController();
