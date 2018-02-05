import * as model from './model';
import * as AddressSearchService from '../../services/addresssearchservice';
import { MAX_ADDRESS_SUGGESTIONS, PREFERRED_MUNICIPALITIES } from '../../constants/constants';

jest.mock('../../services/addresssearchservice');

describe('selecting suggestions', () => {
  describe('selecting next', () => {
    it('should return undefined if suggestions list is undefined', () => {
      const state = {};
      const result = model.selectNextSuggestion(state);
      expect(result).toBe();
    });

    it('should return undefined if suggestions list is empty', () => {
      const state = { suggestions: [] };
      const result = model.selectNextSuggestion(state);
      expect(result).toBe();
    });

    it('selects the first suggestion if no suggestion is selected', () => {
      const state = {
        suggestions: [{ id: '1' }, { id: '2' }],
        selectedSuggestion: undefined,
      };
      const result = model.selectNextSuggestion(state);
      expect(result).toBe(state.suggestions[0]);
    });


    it('selects next suggestion when down is pressed and a suggestion is selected', () => {
      const suggestions = [{ id: '1' }, { id: '2' }];
      const state = {
        suggestions,
        selectedSuggestion: suggestions[0],
      };
      const result = model.selectNextSuggestion(state);
      expect(result).toBe(state.suggestions[1]);
    });

    it('selects the first suggestion when down is pressed and last suggestion is selected', () => {
      const suggestions = [{ id: '1' }, { id: '2' }];
      const state = {
        suggestions,
        selectedSuggestion: suggestions[1],
      };
      const result = model.selectNextSuggestion(state);
      expect(result).toBe(state.suggestions[0]);
    });
  });

  describe('selecting prev', () => {
    it('should return undefined if suggestions list is undefined', () => {
      const state = {};
      const result = model.selectPrevSuggestion(state);
      expect(result).toBe();
    });

    it('should return undefined if suggestions list is empty', () => {
      const state = { suggestions: [] };
      const result = model.selectPrevSuggestion(state);
      expect(result).toBe();
    });

    it('selects the last suggestion when up is pressed and currently no suggestion is selected', () => {
      const suggestions = [{ id: '1' }, { id: '2' }];
      const state = {
        suggestions,
        selectedSuggestion: undefined,
      };
      const result = model.selectPrevSuggestion(state);
      expect(result).toBe(state.suggestions[1]);
    });

    it('selects prev suggestion when up is pressed and a suggestion is selected', () => {
      const suggestions = [{ id: '1' }, { id: '2' }];
      const state = {
        suggestions,
        selectedSuggestion: suggestions[1],
      };
      const result = model.selectPrevSuggestion(state);
      expect(result).toBe(state.suggestions[0]);
    });

    it('selects the last suggestion when up is pressed and first suggestion is selected', () => {
      const suggestions = [{ id: '1' }, { id: '2' }];
      const state = {
        suggestions,
        selectedSuggestion: suggestions[0],
      };
      const result = model.selectPrevSuggestion(state);
      expect(result).toBe(state.suggestions[1]);
    });
  });
});

describe('Fetching suggestions', () => {
  it('calls searchAddress with the search term', () => {
    const searchTerm = 'Vihti';
    AddressSearchService.searchAddress.mockReturnValueOnce(Promise.resolve([]));
    model.fetchSuggestions(searchTerm);
    expect(AddressSearchService.searchAddress).toHaveBeenCalledWith(searchTerm, MAX_ADDRESS_SUGGESTIONS);
  });

  it('sorts results by confidence', () => {
    const response = [
      { confidence: 1, localadmin: 'Helsinki' },
      { confidence: 5, localadmin: 'Helsinki' },
      { confidence: 2, localadmin: 'Helsinki' },
    ];
    const expected = [
      { confidence: 5, localadmin: 'Helsinki' },
      { confidence: 2, localadmin: 'Helsinki' },
      { confidence: 1, localadmin: 'Helsinki' },
    ];

    AddressSearchService.searchAddress.mockReturnValueOnce(Promise.resolve(response));

    return model.fetchSuggestions('searchTerm')
      .then(({ suggestions }) =>
        expect(suggestions).toEqual(expected));
  });

  it('filters only suggestions with localadmin in the PREFERRED_MUNICIPALITIES list', () => {
    const response = [
      { confidence: 2, localadmin: 'Vantaa' },
      { confidence: 5 },
      { confidence: 5, localadmin: 'Vihti' },
      { confidence: 3, localadmin: 'Helsinki' },
      ...PREFERRED_MUNICIPALITIES.map(m => ({ confidence: 1, localadmin: m }))

    ];
    const expected = [
      { confidence: 3, localadmin: 'Helsinki' },
      { confidence: 2, localadmin: 'Vantaa' },
      ...PREFERRED_MUNICIPALITIES.map(m => ({ confidence: 1, localadmin: m }))
    ];

    AddressSearchService.searchAddress
      .mockReturnValueOnce(Promise.resolve(response));

    return model.fetchSuggestions('searchTerm')
      .then(({ suggestions }) =>
        expect(suggestions).toEqual(expected));
  });
});
