/**
 * Controller for /templates route. Provides a list of templates.
 */
class TemplatesController {
  // PUBLIC_INTERFACE
  list(req, res) {
    // Placeholder: Return dummy templates
    res.json({
      templates: [
        {
          id: 'resume-basic',
          name: 'Basic Resume',
          type: 'resume',
          previewImageUrl: '/assets/templates/resume-basic.png',
        },
        {
          id: 'cover-letter-modern',
          name: 'Modern Cover Letter',
          type: 'coverLetter',
          previewImageUrl: '/assets/templates/cover-letter-modern.png',
        },
      ],
    });
  }
}

module.exports = new TemplatesController();
