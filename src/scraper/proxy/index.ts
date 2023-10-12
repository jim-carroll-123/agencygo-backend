import axios from 'axios';

const getProxyUser = async () => {
  const apiUrl = 'https://proxy.webshare.io/api/v2/proxy/list/?mode=direct&page=1&page_size=25';
  const apiKey = 'zhm9omgfqo0ftcll0rkfomir8mvksdwvy4vc0a3i';

  const headers = {
    Authorization: `Token ${apiKey}`,
  };

  const response = await axios.get(apiUrl, { headers });
  return response.data.results[0];
};

export { getProxyUser };
