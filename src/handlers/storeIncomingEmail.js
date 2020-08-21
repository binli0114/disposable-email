const { storeEmail } = require("../services/dynamodb");
const main = async event => {
	console.log(JSON.stringify(event, undefined, 2));
	const [record] = event.Records;
	const { Sns } = record;
	const { Message } = Sns;
	const { mail, receipt } = JSON.parse(Message);
	await storeEmail(mail, receipt);
};

module.exports = {
	main
};
