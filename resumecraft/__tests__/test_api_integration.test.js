const request = require('supertest');
const app = require('../src/app');

describe('API Integration', () => {
  it('GET / (health check) returns OK and status JSON', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('environment');
  });

  it('GET /templates returns template list', async () => {
    const res = await request(app).get('/templates');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.templates)).toBe(true);
    expect(res.body.templates.length).toBeGreaterThan(0);
  });

  it('GET /config returns theme/colors', async () => {
    const res = await request(app).get('/config');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('theme');
    expect(res.body).toHaveProperty('colors');
    expect(res.body.colors).toHaveProperty('primary');
  });

  it('POST /generate produces HTML document', async () => {
    const res = await request(app)
      .post('/generate')
      .send({
        type: 'resume',
        templateId: 'resume-basic',
        data: { name: 'Alice', email: 'alice@test.tld', phone: '111-222', education: [], experience: [], skills: [] }
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('document');
    expect(typeof res.body.document).toBe('string');
    expect(res.body.document).toContain('Generated resume');
  });

  it('POST /grammar-check echoes text and issues=[]', async () => {
    const res = await request(app)
      .post('/grammar-check')
      .send({ text: 'I has a apple.' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('corrected', 'I has a apple.');
    expect(Array.isArray(res.body.issues)).toBe(true);
  });

  it('POST /export-pdf returns a PDF file buffer', async () => {
    const res = await request(app)
      .post('/export-pdf')
      .send({ document: '<h1>Doc</h1>', fileName: 'test' });
    expect(res.status).toBe(200);
    expect(res.header['content-type']).toContain('application/pdf');
    expect(res.header['content-disposition']).toContain('filename="test.pdf"');
    expect(res.body instanceof Buffer).toBe(true);
    expect(res.body.toString('utf-8')).toContain('%PDF-1.4');
  });
});
