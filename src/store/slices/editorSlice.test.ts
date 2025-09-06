import reducer, { setTitle, addTag, reset } from './editorSlice';

const getInitialState = () => reducer(undefined, { type: 'init' });

describe('editorSlice actions', () => {
  it('setTitle updates the title', () => {
    const state = reducer(getInitialState(), setTitle('My Title'));
    expect(state.title).toBe('My Title');
  });

  it('addTag adds a new tag', () => {
    const state = reducer(getInitialState(), addTag('news'));
    expect(state.meta.tags).toContain('news');
  });

  it('reset restores the initial state', () => {
    let state = reducer(getInitialState(), setTitle('Temp'));
    state = reducer(state, addTag('temp'));
    const resetState = reducer(state, reset());
    expect(resetState).toEqual(getInitialState());
  });
});
