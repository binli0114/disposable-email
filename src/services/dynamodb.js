const dynamodbDriver = require("dynamodb-driver");
const addressTableName = "disposable_emails_table";

const getAddress = async (address, region) => {
	const database = new dynamodbDriver({
		region
	});
	return database.get(addressTableName, address);
};

module.exports = {
	getAddress
};
