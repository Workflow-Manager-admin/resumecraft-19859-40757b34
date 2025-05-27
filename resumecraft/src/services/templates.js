'use strict';

/**
 * Service for managing document templates (resume, cover letter, etc.)
 * Example implementation with a few built-in templates.
 */
class TemplatesService {
  constructor() {
    // Example template definitions (simple HTML with handlebars style variables for merging)
    this.templates = [
      {
        id: 'resume-basic',
        name: 'Basic Resume',
        type: 'resume',
        previewImageUrl: '/assets/templates/resume-basic.png',
        content: `
          <div style="font-family:sans-serif;">
            <h1>{{name}}</h1>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Phone:</strong> {{phone}}</p>
            <h2>Education</h2>
            <ul>
              {{#each education}}
              <li>
                <strong>{{degree}}</strong> at {{institution}} ({{year}})
              </li>
              {{/each}}
            </ul>
            <h2>Experience</h2>
            <ul>
              {{#each experience}}
              <li>
                <strong>{{role}}</strong> at {{company}} ({{start}} - {{end}})
                <br>
                {{description}}
              </li>
              {{/each}}
            </ul>
            <h2>Skills</h2>
            <ul>
              {{#each skills}}
              <li>{{this}}</li>
              {{/each}}
            </ul>
          </div>
        `
      },
      {
        id: 'cover-letter-modern',
        name: 'Modern Cover Letter',
        type: 'coverLetter',
        previewImageUrl: '/assets/templates/cover-letter-modern.png',
        content: `
          <div style="font-family:sans-serif;">
            <h2>Cover Letter</h2>
            <p>Date: {{date}}</p>
            <p>Dear {{recipient}},</p>
            <p>{{body}}</p>
            <p>Sincerely,<br>{{name}}</p>
          </div>
        `
      }
    ];
  }

  // PUBLIC_INTERFACE
  list() {
    /**
     * Returns an array of available templates (metadata only).
     */
    return this.templates.map(({ id, name, type, previewImageUrl }) => ({
      id,
      name,
      type,
      previewImageUrl
    }));
  }

  // PUBLIC_INTERFACE
  getTemplateById(templateId) {
    /**
     * Get full template object (including content) by templateId.
     */
    return this.templates.find(t => t.id === templateId) || null;
  }
}

module.exports = new TemplatesService();
