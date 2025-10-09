import { apiService } from '@services/api.service.ts';

const dummyService = apiService.injectEndpoints({
  endpoints: build => ({
    getRepos: build.query<any[], string>({
      query: name => `/users/${name}/repos`,
      providesTags: [{ type: 'GET_DUMMY_USERS' }],
      transformResponse: (response, meta): any => {
        if (meta?.response?.ok) {
          return response;
        }
      }
    })
  })
});

export const { useGetReposQuery } = dummyService;
