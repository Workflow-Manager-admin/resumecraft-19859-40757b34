const documentGenerator = require('../src/services/documentGenerator');

jest.mock('../src/services/templates');
const templatesService = require('../src/services/templates');

describe('documentGenerator', () => {
  beforeEach(() => {
    templatesService.getTemplateById.mockReset();
  });

  it('should generate document with replaced variables', () => {
    templatesService.getTemplateById.mockReturnValue({
      content: '<div>{{name}}</div>'
    });
    const result = documentGenerator.generateDocument('any-template', { name: 'Jane' });
    expect(result).toBe('<div>Jane</div>');
  });

  it('should handle #each blocks for arrays of objects', () => {
    templatesService.getTemplateById.mockReturnValue({
      content: '<ul>{{#each skills}}<li>{{this}}</li>{{/each}}</ul>'
    });
    const result = documentGenerator.generateDocument('any-template', { skills: ['A', 'B'] });
    expect(result).toBe('<ul><li>A</li><li>B</li></ul>');
  });

  it('should throw error if template not found', () => {
    templatesService.getTemplateById.mockReturnValue(null);
    expect(() => documentGenerator.generateDocument('bad', {})).toThrow('Template not found');
  });
});
