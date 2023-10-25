(() => {

    let awsInstance;
    let awsInstanceProxy;

    Object.defineProperty(window, "CaptchaScript", {
        get: function () {
            return interceptorFunc();
        },
        set: function (f) {
            awsInstance = f;
        },
    });

    let interceptorFunc = function () {

        const initHelper = function (inputId, args) {
            registerCaptchaWidget({
                captchaType: "amazon_waf",
                inputId: inputId,
                widgetId: inputId,
                sitekey: args.key,
                iv: args.iv,
                context: args.context,
                pageurl: window.location.href,
            });
        };

        if (awsInstance) {
            awsInstanceProxy = new Proxy(awsInstance, {
                get: function (target, prop) {
                    return new Proxy(target[prop], {
                        apply: (target, thisArg, argumentsList) => {
                            const obj = Reflect.apply(target, thisArg, argumentsList);
                            if (target.name === 'renderCaptcha') {
                                if (!target.id) {
                                    target.id = "captcha-container";
                                }

                                initHelper(target.id, argumentsList[2]);
                            }
                            return obj;
                        }
                    });
                }
            });
        }

        return awsInstanceProxy;
    }
})()
