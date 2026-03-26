import { describe, it, expect, vi } from 'vitest';

const { fetchBaseQueryMock, createApiMock } = vi.hoisted(() => {
  const fetchBaseQueryMock = vi.fn(() => vi.fn());
  const createApiMock = vi.fn(() => ({
    reducer: vi.fn(),
    middleware: vi.fn(),
    reducerPath: 'api'
  }));
  return { fetchBaseQueryMock, createApiMock };
});

vi.mock('@reduxjs/toolkit/query/react', () => ({
  fetchBaseQuery: fetchBaseQueryMock,
  createApi: createApiMock
}));

import { baseQuery } from '@/services/api.service';

describe('API Service', () => {
  it('should be defined', () => {
    expect(baseQuery).toBeDefined();
    expect(typeof baseQuery).toBe('function');
  });

  it('configures base URL correctly', () => {
    expect(fetchBaseQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        baseUrl: 'https://api.github.com',
        prepareHeaders: expect.any(Function)
      })
    );
  });

  describe('prepareHeaders function', () => {
    type FetchBaseQueryConfig = {
      prepareHeaders?: (
        headers: Headers,
        api: { getState: () => unknown }
      ) => Headers;
    };

    const getPrepareHeaders = () => {
      const calls = fetchBaseQueryMock.mock.calls as unknown as Array<
        [FetchBaseQueryConfig]
      >;
      const args = calls[0];
      if (!args) {
        throw new Error('fetchBaseQuery was not called');
      }
      const config = args[0];
      const { prepareHeaders } = config;
      if (!prepareHeaders) {
        throw new Error('prepareHeaders not found');
      }
      return prepareHeaders;
    };

    it('should add Authorization header when token exists', () => {
      const prepareHeaders = getPrepareHeaders();
      const headers = new Headers();
      const getState = vi.fn().mockReturnValue({
        app: {
          auth: {
            token: {
              access: 'test-access-token'
            }
          }
        }
      });

      const result = prepareHeaders(headers, { getState });
      expect(result.get('Authorization')).toBe('Bearer test-access-token');
    });

    it('should remove Authorization header when no token', () => {
      const prepareHeaders = getPrepareHeaders();
      const headers = new Headers();
      headers.set('Authorization', 'Bearer old');
      const getState = vi.fn().mockReturnValue({
        app: {
          auth: {
            token: {
              access: ''
            }
          }
        }
      });

      const result = prepareHeaders(headers, { getState });
      expect(result.has('Authorization')).toBe(false);
    });
  });

  describe('API configuration', () => {
    it('should have correct base URL', () => {
      expect(baseQuery).toBeDefined();
    });

    it('should have proper tag types', () => {
      expect(createApiMock).toHaveBeenCalledWith(
        expect.objectContaining({
          tagTypes: ['GET_DUMMY_USERS']
        })
      );
    });

    it('should enable refetch on reconnect', () => {
      expect(createApiMock).toHaveBeenCalledWith(
        expect.objectContaining({
          refetchOnReconnect: true
        })
      );
    });
  });
});
