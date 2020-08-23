const { getEmailObjectInfo } = require("../utils");
const { readEmailObject, deleteEmailObject } = require("../services/s3");
const { getConversationDetail, setEmailToRead, deleteEmailItem } = require("../services/dynamodb");
const { sendToMsTeams } = require("../services/bot");
const main = async event => {
	console.log(JSON.stringify(event, undefined, 2));
	const newItems = event.Records.filter(({ eventName }) => {
		return eventName === "INSERT";
	});
	console.log(`${newItems.length} newItems are found.`);
	if (newItems.length) {
		for (let index = 0; index < newItems.length; index++) {
			const {
				dynamodb: { NewImage }
			} = newItems[index];
			const { bucketName, bucketObjectKey, destination, messageId } = getEmailObjectInfo(
				NewImage
			);
			if (bucketName && bucketObjectKey) {
				const email = await readEmailObject(bucketName, bucketObjectKey);
				const address = email.to.text;
				const conversationDetails = await getConversationDetail(address);
				if (!conversationDetails) {
					console.log("Invalid converstaion details, delete the email objects");
					await deleteEmailObject(bucketName, bucketObjectKey);
					await deleteEmailItem(destination, messageId);
					continue;
				}
				await sendToMsTeams(conversationDetails, email);
				await setEmailToRead(destination, messageId);
			}
		}
	}

	console.log("Done");
};

module.exports = {
	main
};
