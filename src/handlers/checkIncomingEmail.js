const { isAddressExist } = require("../services/dynamodb");
const main = async event => {
	//logger.info(event);
	console.log(JSON.stringify(event, undefined, 2));
	const [record] = event.Records;
	const { ses } = record;
	const { mail } = ses;
	const {
		destination: [address]
	} = mail;
	const isEmailExist = await isAddressExist(address);
	if (isEmailExist) {
		console.log(`${address} found, CONTINUE`);
		return { disposition: "CONTINUE" };
	}
	console.log(`email ${address} not found! STOP_RULE_SET`);
	return { disposition: "STOP_RULE_SET" };
};

module.exports = {
	main
};
