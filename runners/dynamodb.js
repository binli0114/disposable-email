const { getConversationDetail } = require("../src/services/dynamodb");
const program = require("commander");

program
	.arguments("<cmd> [env]")
	.requiredOption("-e, --email <email>", "email address")
	.parse(process.argv);

const { email } = program;
(async () => {
	process.env.AWS_REGION = "us-east-1";
	const conversationDetails = await getConversationDetail(email);
	console.log(JSON.stringify(conversationDetails, undefined, 2));
})();
