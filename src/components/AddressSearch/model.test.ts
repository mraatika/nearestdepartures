import { describe, expect, it, vi } from 'vitest';
import * as AddressSearchService from '@/services/addressService';
import * as model from './model';

describe('selecting suggestions', () => {
  describe('selecting next', () => {
    it('returns undefined if suggestions list is empty', () => {
      const result = model.selectNextSuggestion([], {} as any);
      expect(result).toBe(undefined);
    });

    it('returns the first suggestion if no suggestion is selected', () => {
      const suggestions: any = [{ id: '1' }, { id: '2' }];
      const result = model.selectNextSuggestion(suggestions);
      expect(result).toBe(suggestions[0]);
    });

    it('returns the first suggestion when the last is selected', () => {
      const suggestions = [{ id: '1' }, { id: '2' }] as any;
      const result = model.selectNextSuggestion(suggestions, suggestions[1]);
      expect(result).toBe(suggestions[0]);
    });

    it('returns the first suggestion when the last suggestion is selected', () => {
      const suggestions: any = [{ id: '1' }, { id: '2' }];
      const result = model.selectNextSuggestion(suggestions, suggestions[1]);
      expect(result).toBe(suggestions[0]);
    });
  });

  describe('selecting prev', () => {
    it('returns undefined if suggestions list is empty', () => {
      const result = model.selectPrevSuggestion([]);
      expect(result).toBe(undefined);
    });

    it('returns the last suggestion when no suggestion is selected', () => {
      const suggestions: any = [{ id: '1' }, { id: '2' }];
      const result = model.selectPrevSuggestion(suggestions);
      expect(result).toBe(suggestions[1]);
    });

    it('returns prev suggestion when a suggestion is selected', () => {
      const suggestions: any = [{ id: '1' }, { id: '2' }];
      const result = model.selectPrevSuggestion(suggestions, suggestions[1]);
      expect(result).toBe(suggestions[0]);
    });

    it('returns the last suggestion when the first suggestion is selected', () => {
      const suggestions: any = [{ id: '1' }, { id: '2' }];
      const result = model.selectPrevSuggestion(suggestions, suggestions[0]);
      expect(result).toBe(suggestions[1]);
    });
  });
});

describe('Fetching suggestions', () => {
  it('calls searchAddress with the search term', () => {
    const searchTerm = 'Vihti';
    vi.spyOn(AddressSearchService, 'searchAddress').mockResolvedValueOnce([]);

    model.fetchSuggestions(searchTerm);
    expect(AddressSearchService.searchAddress).toHaveBeenCalledWith(
      searchTerm,
      undefined,
    );
  });

  it('returns an empty list when fetch fails', async () => {
    const searchTerm = 'Vihti';

    vi.spyOn(AddressSearchService, 'searchAddress').mockRejectedValueOnce(
      new Error('BOOM!'),
    );

    await expect(model.fetchSuggestions(searchTerm)).resolves.toEqual([]);
  });

  it('filters only suggestions with localadmin in the PREFERRED_MUNICIPALITIES list', async () => {
    const response = [
      { confidence: 2, localadmin: 'Vantaa' },
      { confidence: 5 },
      { confidence: 5, localadmin: 'Vihti' },
      { confidence: 3, localadmin: 'Helsinki' },
    ];
    const expected = [
      { confidence: 2, localadmin: 'Vantaa' },
      { confidence: 3, localadmin: 'Helsinki' },
    ];

    vi.spyOn(AddressSearchService, 'searchAddress').mockResolvedValueOnce(
      response as any,
    );

    await expect(model.fetchSuggestions('searchTerm')).resolves.toEqual(
      expected,
    );
  });
});
