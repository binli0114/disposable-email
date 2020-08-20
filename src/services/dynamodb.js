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

const getConversationDetail = async address => {
	AWS.config.update(awsConfig());
	const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
	const TableName = "disposable_addresses_table";
	const params = {
		TableName,
		Key: { address }
	};
	try {
		const { Item } = await docClient.get(params).promise();

		const activity = Item.context["_activity"];
		const adapter = Item.context["_adapter"];
		const { conversation, from, recipient, id: activityId, serviceUrl } = activity;
		const { credentials } = adapter;
		const { authenticationContext } = credentials;
		const accessToken = authenticationContext["_cache"]["_entries"][0].accessToken;

		return { conversation, from, recipient, activityId, serviceUrl, accessToken };
	} catch (err) {
		console.error(err);
	}
	return null;
};
module.exports = {
	get,
	put,
	getConversationDetail
};
