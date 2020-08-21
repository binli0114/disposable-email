const {getEmailObjectInfo} = require("../utils")
const {readEmailObject} = require("../services/s3");
const {getConversationDetail} = require("../services/dynamodb");

const main = async event => {
	console.log(JSON.stringify(event, undefined, 2));
	const newItems = event.Records.filter(({ eventName }) => {
		eventName === "INSERT";
	});
	if(newItems.length){
		for (let index=0; index< newItems.length;index++){
			const { dynamodb:{NewImage} } = newItems[index];
			const { bucketName,bucketObjectKey } = getEmailObjectInfo(NewImage);
			if(bucketName && bucketObjectKey){
				const email = await readEmailObject(bucketName,bucketObjectKey);
				const address = email.to.text;
				const conversationDetails = await getConversationDetail(address);

			}

		}
	}
};

module.exports = {
	main
};
