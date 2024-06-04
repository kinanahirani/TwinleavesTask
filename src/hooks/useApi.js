import axios from 'axios';

export const useApi = () => {
  const getProducts = async (page, pageSize) => {
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
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return getProducts;
};
