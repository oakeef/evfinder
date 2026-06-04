import { describe, it, expect, vi } from 'vitest';
import Papa from 'papaparse';
import { getEvData } from './evApi';

vi.mock('papaparse', () => ({
  default: {
    parse: vi.fn(),
  },
}));

describe('EV Data Service API', () => {
  it('confirms the API maps spreadsheet csv rows to vehicle objects', async () => {
    const mockRow = {
      brand: 'Porsche',
      model: 'Taycan 4S',
      lowestPrice: '56900',
      priceMay2026: '59000',
    };

    // @ts-expect-error just to simplify this
    Papa.parse.mockImplementation((url, config) => {
      config.complete({ data: [mockRow] });
    });

    const result = await getEvData();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(0);
    expect(result[0].brand).toBe('Porsche');
    expect(result[0].model).toBe('Taycan 4S');
    expect(result[0]).not.toHaveProperty('price2026May');
  });
});
