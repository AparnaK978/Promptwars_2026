import { describe, it, expect } from 'vitest';
import { getTranslation, TRANSLATIONS } from '../services/i18n';

describe('i18n Translation Resolver Unit Tests', () => {

  it('should resolve English translations by default', () => {
    const text = getTranslation('English', 'welcome');
    expect(text).toBe('Welcome, Friend');
  });

  it('should resolve Hindi translations correctly', () => {
    const text = getTranslation('Hindi', 'welcome');
    expect(text).toBe('नमस्ते, मित्र');
  });

  it('should resolve Malayalam translations correctly', () => {
    const text = getTranslation('Malayalam', 'welcome');
    expect(text).toBe('സ്വാഗതം, സുഹൃത്തേ');
  });

  it('should resolve Tamil translations correctly', () => {
    const text = getTranslation('Tamil', 'welcome');
    expect(text).toBe('வரவேற்கிறோம், நண்பரே');
  });

  it('should fall back to English if key is missing', () => {
    const text = getTranslation('Telugu', 'non_existent_key');
    expect(text).toBe('non_existent_key');
  });
});
