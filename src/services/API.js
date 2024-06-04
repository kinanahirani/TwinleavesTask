export const BASE_URL =
  'catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/';

const ROUTE = `https://${BASE_URL}`;

const API = async (endpoint, method, body = {}, token) => {
  const fetchObj = {
    method: method,
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    }),
  };

  if (method.toUpperCase() !== 'GET') {
    fetchObj.body = JSON.stringify(body);
  }

  if (token) {
    fetchObj.headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  try {
    const response = await fetch(ROUTE + endpoint, fetchObj);
    if (response.ok && response.status >= 200 && response.status < 204) {
      const data = await response.json();
      if (response.headers.get('x-pagination-total-count')) {
        return new Promise(resolve =>
          resolve({
            data,
            total: parseInt(
              response.headers.get('x-pagination-total-count') || '0',
              10,
            ),
          }),
        );
      }
      return data;
    } else if (response.ok && response.status === 204) {
      return {};
    } else {
      const error = await response.json();
      console.error('API error:', error);
      return {error};
    }
  } catch (error) {
    console.error('API error:', error.message);
    return {
      error: error.message,
    };
  }
};

export default API;
