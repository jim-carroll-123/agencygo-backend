import { URL } from '../config/index';

export const uploadSuccessTemplate = (email: string, _id: string) => {
  const forgotPasswordTemplate = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Upload Successfull</title>
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
                                    <h1 class="heading">"A File was Uploaded"</h1>
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
