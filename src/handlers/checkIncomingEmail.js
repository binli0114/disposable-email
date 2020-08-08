const { logger } = require("../utils/logger");
const { get } = require("../services/dynamodb");
const main = async event => {
	logger.info(event);
	const [record] = event.Records;
	const { ses } = record;
	const { mail } = ses;
	const { destination: address } = mail;
	if (isAddressExist(address)) {
		return { disposition: "CONTINUE" };
	}
	return { disposition: "STOP_RULE_SET" };
};
const isAddressExist = async address => {
	const TableName = "disposable_addresses_table";
	const params = {
		TableName,
		Key: { address }
	};
	const { Item } = await get(params);
	if (Item) {
		const { ttl } = Item;
		if (ttl > Date.now()) {
			return true;
		}
	}
	return false;
};
module.exports = {
	main,
	isAddressExist
};
