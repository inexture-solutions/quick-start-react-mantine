import { describe, it, expect } from 'vitest';
import {
  authSlice,
  SET_AUTH_TOKEN,
  GET_AUTH_CONFIG,
  IAuthToken
} from '@/store/app/auth.slice';

describe('Auth Slice', () => {
  const initialState = {
    token: {
      access: '',
      refresh: '',
      expires: ''
    },
    isLoggedIn: false
  };

  const mockToken: IAuthToken = {
    access: 'mock-access-token',
    refresh: 'mock-refresh-token',
    expires: '2024-01-01T00:00:00Z'
  };

  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle SET_AUTH_TOKEN', () => {
    const actual = authSlice.reducer(initialState, SET_AUTH_TOKEN(mockToken));

    expect(actual.token).toEqual(mockToken);
    expect(actual.isLoggedIn).toBe(true);
  });

  it('should update isLoggedIn to true when access token is provided', () => {
    const state = authSlice.reducer(initialState, SET_AUTH_TOKEN(mockToken));

    expect(state.isLoggedIn).toBe(true);
  });

  it('should maintain isLoggedIn as false when no access token', () => {
    const emptyToken: IAuthToken = {
      access: '',
      refresh: 'mock-refresh-token',
      expires: '2024-01-01T00:00:00Z'
    };

    const state = authSlice.reducer(initialState, SET_AUTH_TOKEN(emptyToken));

    expect(state.isLoggedIn).toBe(false);
  });

  it('should handle multiple token updates', () => {
    let state = authSlice.reducer(initialState, SET_AUTH_TOKEN(mockToken));

    const newToken: IAuthToken = {
      access: 'new-access-token',
      refresh: 'new-refresh-token',
      expires: '2024-02-01T00:00:00Z'
    };

    state = authSlice.reducer(state, SET_AUTH_TOKEN(newToken));

    expect(state.token).toEqual(newToken);
    expect(state.isLoggedIn).toBe(true);
  });

  it('should export correct action creators', () => {
    const action = SET_AUTH_TOKEN(mockToken);

    expect(action.type).toBe('auth/SET_AUTH_TOKEN');
    expect(action.payload).toEqual(mockToken);
  });

  it('should have correct selector', () => {
    const rootState = {
      app: {
        auth: {
          token: mockToken,
          isLoggedIn: true
        },
        config: {}
      }
    };

    const authConfig = GET_AUTH_CONFIG(rootState as any);

    expect(authConfig.token).toEqual(mockToken);
    expect(authConfig.isLoggedIn).toBe(true);
  });

  it('should preserve other state properties when updating token', () => {
    const stateWithOtherProps = {
      ...initialState,
      isLoggedIn: true
    };

    const state = authSlice.reducer(
      stateWithOtherProps,
      SET_AUTH_TOKEN(mockToken)
    );

    expect(state.token).toEqual(mockToken);
  });

  it('should handle partial token updates', () => {
    const partialToken = {
      access: 'partial-access-token',
      refresh: '',
      expires: ''
    } as IAuthToken;

    const state = authSlice.reducer(initialState, SET_AUTH_TOKEN(partialToken));

    expect(state.token.access).toBe('partial-access-token');
    expect(state.token.refresh).toBe('');
    expect(state.token.expires).toBe('');
  });
});
