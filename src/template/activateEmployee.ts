// import { URL } from '../config/index';
export const generateEmailTemplateForActivation = (body: any, agencyName: string) => {
  const URL = `http://localhost:1212`;
  const { _id: id } = body;
  const activateAccountTemplate = `
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Simple Call To Action</title>
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
			.activateButton {
				width: -webkit-fill-available;
				text-align: center;
				background-color: rgb(0, 98, 255);
				border-radius: 6px;
				display: inline-block;
				text-decoration: none;
				padding: 11px 19px;
				color:#fff !important;
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
			}

			@media screen and (max-width: 1024px) {
				.activateButton {
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
			}
			@media screen and (max-width: 600px) {
				.activateButton {
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
							<div
								style="font-size: 14px; font-weight: 500; margin-bottom: 27px"
							>
								<p class="subHeading">
								${agencyName} has added you as an employee
								</p>
								<p style="margin-bottom: 2px; color: #7e8299">
									To start using infloww, activate your account by clicking the
									button below:
								</p>
							</div>
							<a href=${URL}/activate-account/${id} target="_blank" class="activateButton">
								Activate account
							</a>
							<p style="margin: 15px 0px; color: #000">
								Or open this link in the browser: <a href=${URL}/activate-account/${id}>link here</a>
							</p>
							<div
								style="
									font-size: 12px;
									font-weight: 500;
									margin-bottom: 27px;
									font-family: Arial, Helvetica, sans-serif;
								"
							>
								<p style="margin: 2px 0px; color: #7e8299">
									Powered by the Infloww Group. For questions or concerns,
								</p>
								<p style="margin: 2px 0px; color: #7e8299">
									please contact us at <a href="#">support@infloww.com</a>
								</p>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>
`;
  return activateAccountTemplate;
};
