const templatesService = require('../src/services/templates');

describe('TemplatesService', () => {
  it('should list available templates (metadata)', () => {
    const templates = templatesService.list();
    expect(Array.isArray(templates)).toBe(true);
    expect(templates.length).toBeGreaterThan(0);
    templates.forEach(tpl => {
      expect(tpl).toHaveProperty('id');
      expect(tpl).toHaveProperty('name');
      expect(tpl).toHaveProperty('type');
      expect(tpl).toHaveProperty('previewImageUrl');
    });
  });

  it('should get template by id with content', () => {
    const first = templatesService.list()[0];
    const tpl = templatesService.getTemplateById(first.id);
    expect(tpl).not.toBeNull();
    expect(tpl.content).toContain('{{');
  });

  it('should return null for unknown id', () => {
    expect(templatesService.getTemplateById('nonexistent')).toBeNull();
  });
});
