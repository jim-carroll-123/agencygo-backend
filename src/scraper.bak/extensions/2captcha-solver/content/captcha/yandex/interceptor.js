(() => {
  let yandexFunc;
  let yandexFuncProxy;

  Object.defineProperty(window, 'smartCaptcha', {
    get: function () {
      return initYandexHandler;
    },
    set: function (f) {
      yandexFunc = f;
    },
    configurable: true,
  });

  const initYandexHandler = function () {
    setTimeout(function () {
      interceptorFunc();
    }, 200);
  };

  const interceptorFunc = function () {
    const initCaptcha = args => {
      registerCaptchaWidget({
        captchaType: 'yandex',
        widgetId: args.sitekey,
        sitekey: args.sitekey,
        inputId: input.id,
      });
    };

    if (yandexFuncProxy) {
      yandexFuncProxy = new Proxy(yandexFunc, {
        get: function (target, prop) {
          return new Proxy(target[prop], {
            apply: (target, thisArg, argumentsList) => {
              initCaptcha(argumentsList);
              const obj = Reflect.apply(target, thisArg, argumentsList);
              return obj;
            },
          });
        },
      });
    }
  };
})();

// (() => {
//     let yandexFunc;
//     let yandexFuncProxy;

//     // Define the interceptorFunc function first.
//     const interceptorFunc = function () {
//         const initCaptcha = (args) => {
//             registerCaptchaWidget({
//                 captchaType: "yandex",
//                 widgetId: args.sitekey,
//                 sitekey: args.sitekey,
//                 inputId: args.input.id, // Make sure "input" is defined in your context.
//             });
//         };

//         if (yandexFunc) {
//             yandexFuncProxy = new Proxy(yandexFunc, {
//                 get: function (target, prop) {
//                     return new Proxy(target[prop], {
//                         apply: (target, thisArg, argumentsList) => {
//                             initCaptcha(argumentsList[0]); // Pass the first argument to initCaptcha.
//                             const obj = Reflect.apply(target, thisArg, argumentsList);
//                             return obj;
//                         }
//                     });
//                 }
//             });
//         }
//     }

//     // Define the initYandexHandler and smartCaptcha properties.
//     const initYandexHandler = function () {
//         setTimeout(function () {
//             interceptorFunc();
//         }, 200);
//     };

//     Object.defineProperty(window, "smartCaptcha", {
//         get: function () {
//             return initYandexHandler;
//         },
//         set: function (f) {
//             yandexFunc = f;
//         },
//         configurable: true
//     });
// })();
