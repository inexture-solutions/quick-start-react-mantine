import { describe, it, expect } from 'vitest';
import {
  configSlice,
  SET_IS_MOBILE,
  GET_APP_CONFIG
} from '@/store/app/config.slice';

describe('Config Slice', () => {
  const initialState = {
    isMobile: false
  };

  it('should return the initial state', () => {
    expect(configSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle SET_IS_MOBILE with true', () => {
    const actual = configSlice.reducer(initialState, SET_IS_MOBILE(true));

    expect(actual.isMobile).toBe(true);
  });

  it('should handle SET_IS_MOBILE with false', () => {
    const mobileState = { isMobile: true };
    const actual = configSlice.reducer(mobileState, SET_IS_MOBILE(false));

    expect(actual.isMobile).toBe(false);
  });

  it('should toggle mobile state correctly', () => {
    let state = configSlice.reducer(initialState, SET_IS_MOBILE(true));
    expect(state.isMobile).toBe(true);

    state = configSlice.reducer(state, SET_IS_MOBILE(false));
    expect(state.isMobile).toBe(false);
  });

  it('should export correct action creators', () => {
    const action = SET_IS_MOBILE(true);

    expect(action.type).toBe('config/SET_IS_MOBILE');
    expect(action.payload).toBe(true);
  });

  it('should have correct selector', () => {
    const rootState = {
      app: {
        auth: {},
        config: {
          isMobile: true
        }
      }
    };

    const appConfig = GET_APP_CONFIG(rootState as any);

    expect(appConfig.isMobile).toBe(true);
  });

  it('should maintain state immutability', () => {
    const state = configSlice.reducer(initialState, SET_IS_MOBILE(true));

    // Original state should remain unchanged
    expect(initialState.isMobile).toBe(false);
    // New state should have the updated value
    expect(state.isMobile).toBe(true);
    // Should be different objects
    expect(state).not.toBe(initialState);
  });

  it('should handle multiple state updates', () => {
    let state = configSlice.reducer(initialState, SET_IS_MOBILE(true));
    expect(state.isMobile).toBe(true);

    state = configSlice.reducer(state, SET_IS_MOBILE(true));
    expect(state.isMobile).toBe(true);

    state = configSlice.reducer(state, SET_IS_MOBILE(false));
    expect(state.isMobile).toBe(false);
  });
});
