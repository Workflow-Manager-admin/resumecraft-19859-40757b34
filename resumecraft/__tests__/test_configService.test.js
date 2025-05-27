const configService = require('../src/services/config');

describe('ConfigService', () => {
  it('should return expected config (theme and colors)', () => {
    const config = configService.getConfig();
    expect(config).toEqual({
      theme: 'dark',
      colors: {
        primary: '#6C3FC5',
        secondary: '#1A1A1A',
        accent: '#B39DDB'
      }
    });
  });
});
