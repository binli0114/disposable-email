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

module.exports = {
	get
};
