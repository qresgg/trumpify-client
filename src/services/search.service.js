import { basicRequest } from "./shared/request.pattern";

const route = 'search';

const searchData = async (id) => {
  try {
    const response = await basicRequest({
        method: 'get',
        route,
        endpoint: 'search',
        id
    })
    
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed to fetch searched data');
  }
};

export {
    searchData
}