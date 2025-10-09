import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '@/store/app/app.reducer.ts';

// Mock store for testing
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      app: appReducer
    },
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });
};

// Custom render function with providers
const customRender = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createMockStore(preloadedState),
    ...renderOptions
  }: {
    preloadedState?: any;
    store?: any;
  } & Omit<RenderOptions, 'wrapper'> = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
};

// Mock data for testing
export const mockRepoData = [
  {
    id: 1,
    name: 'test-repo',
    description: 'A test repository',
    html_url: 'https://github.com/test/test-repo',
    homepage: 'https://test-repo.com',
    language: 'TypeScript',
    stargazers_count: 10,
    pushed_at: '2023-10-09T00:00:00Z',
    license: { spdx_id: 'MIT' },
    private: false
  },
  {
    id: 2,
    name: 'another-repo',
    description: 'Another test repository',
    html_url: 'https://github.com/test/another-repo',
    homepage: null,
    language: 'JavaScript',
    stargazers_count: 5,
    pushed_at: '2023-10-08T00:00:00Z',
    license: { spdx_id: 'Apache-2.0' },
    private: true
  }
];

export const mockAuthState = {
  app: {
    auth: {
      token: {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
        expires: '2024-01-01T00:00:00Z'
      },
      isLoggedIn: true
    },
    config: {
      theme: 'light'
    }
  }
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render, createMockStore };
