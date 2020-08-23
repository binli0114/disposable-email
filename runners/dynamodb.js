const { getConversationDetail, isAddressExist,isRequestorHasAddress } = require("../src/services/dynamodb");
const program = require("commander");
const moment = require("moment");
program
	.arguments("<cmd> [env]")
	.requiredOption("-e, --email <email>", "email address")
	.parse(process.argv);

const { email } = program;
(async () => {
	process.env.AWS_REGION = "us-east-1";

	// const isExist = await isAddressExist(email);
	// console.log(`email address ${email} ${isExist ? "exist" : "no exist"}`);
	//
	// const conversationDetails = await getConversationDetail(email);
	// console.log(JSON.stringify(conversationDetails, undefined, 2));

	const ttl = await isRequestorHasAddress("test@happyeme.com");
	if(ttl){
		const end = moment(ttl);
		const duration = moment.duration(end.diff(Date.now()));
		const minutes = duration.asMinutes();
		console.log(`${minutes} to expired`);
	}
})();
