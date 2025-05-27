/**
 * Controller for /grammar-check route. Checks grammar and spelling for provided text.
 */
class GrammarController {
  // PUBLIC_INTERFACE
  check(req, res) {
    const { text } = req.body;
    // Placeholder: No error detection, just echo text as corrected
    res.json({
      corrected: text,
      issues: [],
    });
  }
}

module.exports = new GrammarController();
