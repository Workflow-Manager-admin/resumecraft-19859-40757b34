/**
 * Controller for /generate route. Generates a resume or cover letter.
 */
class GenerateController {
  // PUBLIC_INTERFACE
  generate(req, res) {
    const { type, templateId, data } = req.body;
    // Placeholder: Return mock generated document string
    const documentHtml = `<div><h1>Generated ${type}</h1><div>Template: ${templateId}</div><pre>${JSON.stringify(
      data,
      null,
      2
    )}</pre></div>`;
    res.json({ document: documentHtml });
  }
}

module.exports = new GenerateController();
