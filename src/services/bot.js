const axios = require("axios");

const sendToMsTeams = async (
	{ conversation, from, recipient, activityId, serviceUrl, accessToken },
	email
) => {
	const data = {
		type: "message",
		from: { id: recipient.id, name: "happyeme" },
		conversation: {
			id: conversation.id,
			name: "msteams"
		},
		recipient: {
			id: from.id,
			name: from.name
		},
		attachments: [
			{
				contentType: "application/vnd.microsoft.card.adaptive",
				content: {
					type: "AdaptiveCard",
					version: "1.0",
					body: [
						{
							type: "TextBlock",
							size: "Medium",
							weight: "Bolder",
							text: "New email message"
						},
						{
							type: "TextBlock",
							size: "Small",
							text: `Date: ${email.date}`,
							isSubtle: true,
							wrap: true
						},
						{
							type: "FactSet",
							facts: [
								{
									title: "Subject:",
									value: email.subject
								},
								{
									title: "From:",
									value: email.from.text
								},
								{
									title: "To:",
									value: email.to.text
								}
							]
						},
						{
							type: "TextBlock",
							size: "Medium",
							text: `${email.text.trim()}`
						}
					]
				}
			}
		]
	};
	const config = {
		method: "post",
		url: `${serviceUrl}v3/conversations/${conversation.id}/activities/${activityId}`,
		headers: {
			Authorization: `Bearer ${accessToken.replace(/(\r\n|\n|\r)/gm, "")}`,
			"Content-Type": "application/json"
		},
		data: JSON.stringify(data)
	};
	return axios(config);
	// axios(config)
	// 	.then(function (response) {
	// 		console.log(JSON.stringify(response.data));
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});
};

module.exports = { sendToMsTeams };
