import { basicRequest } from "./shared/request.pattern";

const route = 'search';

export const searchData = async (id) => {
  try {
      return await basicRequest({
          method: 'get',
          route,
          endpoint: 'search',
          id
      });
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed to fetch searched data');
  }
};