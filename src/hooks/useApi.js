import axios from 'axios';

export const useApi = () => {
  const getProducts = async (page, pageSize = 10) => {
    try {
      const response = await axios.post(
        'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/product',
        {
          page,
          pageSize,
          sort: {
            creationDateSortOption: 'DESC',
          },
        },
      );
      // Assuming the response structure you provided
      if (response.data && response.data.products) {
        return response.data.products;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {getProducts};
};
