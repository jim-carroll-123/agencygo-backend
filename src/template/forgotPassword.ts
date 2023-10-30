import { URL } from '../config/index';

export const generateEmailTemplateForForgotPassword = (email: string, _id: string) => {
  const forgotPasswordTemplate = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Forget password</title>
            <style>
                body {
                    width: 100%;
                    background-color: #d5d9e2;
                }
                .mainContainer {
                    font-family: Arial, Helvetica, sans-serif;
                    line-height: 1.5;
                    min-height: 100%;
                    font-weight: normal;
                    font-size: 15px;
                    color: #2f3044;
                    margin: auto;
                    padding: 0;
                    width: 55%;
                }
                .table {
                    background-color: #ffffff;
                    padding: 0;
                    border-radius: 24px;
                    margin: 40px auto;
                    width: 100%;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    flex-direction: column;
                }
                .forgotButton {
                    width: 50%;
                    text-align: center;
                    background-color: rgb(0, 98, 255);
                    border-radius: 6px;
                    display: inline-block;
                    text-decoration: none;
                    text-transform: uppercase;
                    padding: 11px 19px;
                    color : #fff;
                    font-size: 14px;
                    font-weight: 500;
                    font-family: Arial, Helvetica, sans-serif;
                }
                .heading {
                    font-size: 30px;
                }
                .subHeading {
                    margin-bottom: 9px;
                    color: #181c32;
                    font-size: 22px;
                    text-align: center;
                    font-weight: 700;
                    text-align: left;
                }
                .contentDiv {
                    font-size: 14px;
                    text-align: left;
                    width: 90%;
                    margin: auto;
                    font-weight: 500;
                }
                @media screen and (max-width: 1024px) {
                    .forgotButton {
                        width: 70%;
                    }
                    .mainContainer {
                        width: 75%;
                    }
                    .heading {
                        font-size: 24px;
                    }
                    .subHeading {
                        font-size: 20px;
                    }
                    .contentDiv {
                        font-size: 14px;
                        text-align: left;
                        width: 90%;
                        margin: auto;
                        font-weight: 500;
                    }
                }
                @media screen and (max-width: 600px) {
                    .forgotButton {
                        width: 70%;
                    }
                    .mainContainer {
                        width: 95%;
                    }
                    .table {
                        width: 95%;
                    }
                    .heading {
                        font-size: 20px;
                    }
                    .subHeading {
                        font-size: 18px;
                        text-align: center;
                    }
                    .contentDiv {
                        font-size: 14px;
                        text-align: center;
                        width: 90%;
                        margin: auto;
                        font-weight: 500;
                    }
                }
            </style>
        </head>
        <body>
            <div class="mainContainer">
                <table border="0" cellpadding="0" cellspacing="0" class="table">
                    <tr>
                        <td
                            align="center"
                            valign="center"
                            style="text-align: center; padding-bottom: 10px"
                        >
                            <div style="text-align: center; margin: auto">
                                <div style="margin-bottom: 10px">
                                    <h1 class="heading">INFLOWW ICON</h1>
                                </div>
                                <div class="contentDiv">
                                    <p class="subHeading">
                                        Here's how to regain access to your account
                                    </p>
                                    <p style="margin-bottom: 2px; color: #7e8299">
                                        We've received a request to forget the password for the
                                        infloww account associated with <a href="#">${email}</a>
                                    </p>
                                    <p>To forget your password, click the link below:</p>
                                    <a href="${URL}/forgot-password/${_id}">link</a>
                                    <hr />
                                    <span
                                        >If that doesn't work, paste this link into your
                                        browser:</span
                                    >
                                    <span>
                                        <a href="#">forgot password link</a>
                                    </span>
                                    <p>If you did not make this request, ignore this email,</p>
                                </div>
                                <a href="#" target="_blank" class="forgotButton">
                                    Forgot password
                                </a>
                                <div
                                    style="
                                        font-size: 12px;
                                        font-weight: 500;
                                        margin-bottom: 27px;
                                        font-family: Arial, Helvetica, sans-serif;
                                    "
                                >
                                    <p style="margin: 5px 0px; color: #7e8299">
                                        Powered by the Infloww Group. For questions or concerns,
                                    </p>
                                    <p style="margin: 5px 0px; color: #7e8299">
                                        please contact us at <a href="#">support@infloww.com</a>
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
    </html>`;
  return forgotPasswordTemplate;
};
