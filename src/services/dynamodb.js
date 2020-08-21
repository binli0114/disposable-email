const AWS = require("aws-sdk");
const awsConfig = () => {
	let config = { region: process.env.AWS_REGION };
	if (process.env.DYNAMODB_ENDPOINT_OVERRIDE && process.env.ENVIRONMENT !== "production") {
		config = {
			region: "localhost",
			endpoint: process.env.DYNAMODB_ENDPOINT_OVERRIDE
		};
	}
	return config;
};

const get = async params => {
	AWS.config.update(awsConfig());
	const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
	return docClient.get(params).promise();
};

const put = async params => {
	AWS.config.update(awsConfig());
	const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
	return docClient.put(params).promise();
};

const update = async params => {
	AWS.config.update(awsConfig());
	const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
	return docClient.update(params).promise();
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

const isAddressExist = async address => {
	const TableName = "disposable_addresses_table";
	const params = {
		TableName,
		Key: { address }
	};
	const { Item } = await get(params);
	if (Item) {
		return true;
		// const { ttl } = Item;
		// if (ttl > moment.unix()) {
		// }
	}
	return false;
};

const getConversationDetail = async address => {
	const TableName = "disposable_addresses_table";
	const params = {
		TableName,
		Key: { address }
	};
	try {
		const {
			Item: { context }
		} = await get(params);
		if (!context) {
			return null;
		}
		const activity = context["_activity"];
		const adapter = context["_adapter"];
		const { conversation, from, recipient, id: activityId, serviceUrl } = activity;
		const { credentials } = adapter;
		const { authenticationContext } = credentials;
		const [validEntry] = authenticationContext["_cache"]["_entries"].filter(entry => {
			return entry.expirationTime > Date.now();
		});
		const accessToken = validEntry.accessToken || "";
		return { conversation, from, recipient, activityId, serviceUrl, accessToken };
	} catch (err) {
		console.error(err);
	}
	return null;
};

const setEmailToRead = async (destination, messageId) => {
	const params = {
		TableName: "disposable_emails_table",
		Key: { destination, messageId },
		AttributeUpdates: {
			isNew: { Action: "PUT", Value: false }
		}
	};

	return update(params);
};

module.exports = {
	get,
	put,
	getConversationDetail,
	isAddressExist,
	storeEmail,
	setEmailToRead
};
