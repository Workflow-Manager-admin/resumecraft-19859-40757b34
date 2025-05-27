'use strict';

const templatesService = require('./templates');

/**
 * Naïve template merge function (only handles {{var}} and {{#each list}} for demo purposes).
 * In production, use a real templating engine like Handlebars or Mustache.
 */
// Helper: Replace simple variables {{var}}
function replaceVariables(template, data) {
  if (!template) return '';
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => (data[key] !== undefined ? data[key] : ''));
}

/*
 * Helper: Process {{#each list}} ... {{/each}} blocks.
 * Only handles simple arrays of objects or strings.
 */
function processEachBlocks(template, data) {
  let result = template;
  const eachBlockRegex = /{{#each\s+(\w+)}}([\s\S]*?){{\/each}}/g;
  result = result.replace(eachBlockRegex, (match, arrayKey, blockContent) => {
    const arr = data[arrayKey];
    if (!Array.isArray(arr)) return '';
    return arr.map(item => {
      if (typeof item === 'object') {
        // Nested variable replaces in the block
        return replaceVariables(blockContent, item);
      } else {
        // {{this}} for primitives
        return blockContent.replace(/{{\s*this\s*}}/g, item);
      }
    }).join('');
  });
  return result;
}

// PUBLIC_INTERFACE
function generateDocument(templateId, userData) {
  /**
   * Merge the template with userData, returning generated HTML as string.
   */
  const template = templatesService.getTemplateById(templateId);
  if (!template) {
    throw new Error('Template not found');
  }
  let content = template.content;
  content = processEachBlocks(content, userData);
  content = replaceVariables(content, userData);
  return content;
}

module.exports = {
  // PUBLIC_INTERFACE
  generateDocument
};
