
import { REGION_RANGES } from './constants';

describe('REGION_RANGES constant', () => {
  it('should have the correct range for Kanto', () => {
    expect(REGION_RANGES.Kanto).toEqual({ start: 1, end: 151 });
  });

  it('should have the correct range for Johto', () => {
    expect(REGION_RANGES.Johto).toEqual({ start: 152, end: 251 });
  });

  it('should have the correct range for Hoenn', () => {
    expect(REGION_RANGES.Hoenn).toEqual({ start: 252, end: 386 });
  });

  it('should have keys for all expected regions', () => {
    const expectedRegions = ['Kanto', 'Johto', 'Hoenn'];
    expectedRegions.forEach(region => {
      expect(REGION_RANGES).toHaveProperty(region);
    });
  });
});
