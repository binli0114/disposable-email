const { logger } = require("../utils/logger");
const { put } = require("../services/dynamodb");
const main = async event => {
	logger.info(event);
	const [record] = event.Records;
	const { sns } = record;
	const { message } = sns;
	const { mail, receipt } = message;
	await storeEmail(mail, receipt);
};

const storeEmail = async (mail, receipt) => {
	const { destination, messageId, timestamp, source, commonHeaders } = mail;
	const [currentDestination] = destination;
	const {
		action: { bucketName, objectKey: bucketObjectKey }
	} = receipt;

	const params = {
		TableName: "disposable_emails_table",
		Item: {
			destination: currentDestination,
			messageId,
			timestamp,
			source,
			commonHeaders,
			bucketName,
			bucketObjectKey,
			isNew: true
		}
	};

	await put(params);
};

module.exports = {
	main
};
