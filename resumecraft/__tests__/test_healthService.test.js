const healthService = require('../src/services/health');

describe('HealthService', () => {
  it('should return the health status object', () => {
    const info = healthService.getStatus();
    expect(info).toHaveProperty('status', 'ok');
    expect(info).toHaveProperty('message', 'Service is healthy');
    expect(info).toHaveProperty('timestamp');
    expect(info).toHaveProperty('environment');
  });
});
