import axios from 'axios';

function generateRandomUID(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uid = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uid += characters.charAt(randomIndex);
  }

  return uid;
}

const getProxyUser = async () => {
  const apiUrl = 'https://proxy.webshare.io/api/v2/proxy/list/?mode=direct&page=1&page_size=25';
  const apiKey = 'zhm9omgfqo0ftcll0rkfomir8mvksdwvy4vc0a3i';

  const headers = {
    Authorization: `Token ${apiKey}`,
  };

  const response = await axios.get(apiUrl, { headers });
  return response.data.results[0];
};

const createProxyUser = async () => {
  const proxyUserApiUrl = 'https://dashboard.iproyal.com/api/residential/royal/reseller/sub-users';
  const proxyCredsApiUrl = 'https://dashboard.iproyal.com/api/residential/royal/reseller/access/generate-proxy-list';
  const proxyProtocol = 'http|https';

  const creatorId = generateRandomUID(6);

  const proxyUser = await axios.post(
    proxyUserApiUrl,
    {
      username: creatorId,
      password: creatorId,
      traffic: 0.03,
    },
    {
      headers: {
        'X-Access-Token': 'Bearer a4465669f2c3110f322361cecf02383599199a6794855ce77e597eec3374',
      },
    },
  );
  const proxyCreds = await axios.post(
    proxyCredsApiUrl,
    {
      username: proxyUser.data.username,
      password: proxyUser.data.password,
      proxyCount: 1,
      rotation: 'random',
      location: '_country-us',
      highEndPool: true,
      format: '{hostname}:{port}@{username}:{password}',
      port: proxyProtocol,
    },
    {
      headers: {
        'X-Access-Token': 'Bearer a4465669f2c3110f322361cecf02383599199a6794855ce77e597eec3374',
      },
    },
  );

  const proxyStr = proxyCreds.data[0];

  const [hostPortString, userPassString] = proxyStr.split('@');
  const [hostname, port] = hostPortString.split(':');
  const [username, password] = userPassString.split(':');

  const proxyObj = {
    proxyUser: {
      username,
      user_pass: proxyUser.data.password,
    },
    creds: {
      username,
      hostname,
      port: parseInt(port),
      password,
      protocol: proxyProtocol,
    },
  };

  return proxyObj;
};

export { getProxyUser, createProxyUser };
