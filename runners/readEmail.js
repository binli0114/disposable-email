const AWS = require("aws-sdk");
const simpleParser = require("mailparser").simpleParser;
(async () => {
	const s3 = new AWS.S3();
	const request = {
		Bucket: "incoming.disposable.v2.happyeme.com",
		Key: "o3onj4thattd9m3fpn5ka148qcp7lpbtnfe4ss01"
	};

	try {
		const data = await s3.getObject(request).promise();
		// console.log('Raw email:' + data.Body);
		const email = await simpleParser(data.Body);
		console.log("date:", email.date);
		console.log("subject:", email.subject);
		console.log("body:", email.text);
		console.log("to:", email.to.text);

		console.log("from:", email.from.text);
		console.log("attachments:", email.attachments);
		return { status: "success" };
	} catch (Error) {
		console.log(Error, Error.stack);
		return Error;
	}
})();
