var Config = {
  default: {
    isPluginEnabled: true,
    apiKey: '054855c660c6e582c36a3e209fbeace3',
    valute: 'USD',
    email: null,
    autoSubmitForms: false,
    submitFormsDelay: 0,
    enabledForNormal: true,
    enabledForRecaptchaV2: true,
    enabledForInvisibleRecaptchaV2: false,
    enabledForRecaptchaV3: false,
    enabledForHCaptcha: true,
    enabledForGeetest: true,
    enabledForGeetest_v4: true,
    enabledForKeycaptcha: true,
    enabledForArkoselabs: true,
    enabledForLemin: true,
    enabledForYandex: true,
    enabledForCapyPuzzle: true,
    enabledForAmazonWaf: true,
    enabledForTurnstile: true,
    autoSolveNormal: false,
    autoSolveRecaptchaV2: false,
    autoSolveInvisibleRecaptchaV2: false,
    autoSolveRecaptchaV3: false,
    recaptchaV3MinScore: 0.5,
    autoSolveHCaptcha: false,
    autoSolveGeetest: false,
    autoSolveKeycaptcha: false,
    autoSolveArkoselabs: false,
    autoSolveGeetest_v4: false,
    autoSolveLemin: false,
    autoSolveYandex: false,
    autoSolveCapyPuzzle: false,
    autoSolveAmazonWaf: false,
    autoSolveTurnstile: false,
    repeatOnErrorTimes: 5,
    repeatOnErrorDelay: 5,
    buttonPosition: 'inner',
    useProxy: true,
    proxytype: 'HTTPS',
    proxy: 'xMIKOS:xMIKOS_country-us@geo.iproyal.com:12321',
    blackListDomain: 'example.com\n2captcha.com/auth\nrucaptcha.com/auth',
    normalSources: [],
    autoSubmitRules: [
      {
        url_pattern: '(2|ru)captcha.com/demo',
        code:
          '' +
          '{"type":"source","value":"document"}' +
          '\n' +
          '{"type":"method","value":"querySelector","args":["button[type=submit]"]}' +
          '\n' +
          '{"type":"method","value":"click"}',
      },
    ],
  },

  get: async function (key) {
    let config = await this.getAll();
    return config[key];
  },

  getAll: function () {
    return new Promise(function (resolve, reject) {
      chrome.storage.local.get('config', function (result) {
        resolve(Config.joinObjects(Config.default, result.config));
      });
    });
  },

  set: function (newData) {
    return new Promise(function (resolve, reject) {
      Config.getAll().then(data => {
        chrome.storage.local.set(
          {
            config: Config.joinObjects(data, newData),
          },
          function (config) {
            resolve(config);
          },
        );
      });
    });
  },

  joinObjects: function (obj1, obj2) {
    let res = {};
    for (let key in obj1) res[key] = obj1[key];
    for (let key in obj2) res[key] = obj2[key];
    return res;
  },
};
