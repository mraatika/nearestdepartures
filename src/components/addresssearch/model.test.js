import * as model from './model';

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
