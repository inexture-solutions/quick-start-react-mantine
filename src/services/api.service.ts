import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.github.com',
  prepareHeaders: (headers, { getState }) => {
    // Add auth mechanism to pass tokens to the header
    const token = (getState() as RootState)?.app?.auth?.token;
    if (token?.access) {
      headers.set('Authorization', `Bearer ${token.access}`);
    } else {
      headers.delete('Authorization');
    }
    return headers;
  }
});

export const apiService = createApi({
  baseQuery: baseQuery,
  tagTypes: ['GET_DUMMY_USERS'],
  refetchOnReconnect: true,
  endpoints: () => ({})
});
