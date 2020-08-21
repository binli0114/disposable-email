const AWS = require("aws-sdk");
const simpleParser = require("mailparser").simpleParser;

const readEmailObject = async (Bucket, Key) => {
	const s3 = new AWS.S3();
	const request = {
		Bucket,
		Key
	};

	try {
		const data = await s3.getObject(request).promise();
		const email = await simpleParser(data.Body);
		console.log("date:", email.date);
		console.log("subject:", email.subject);
		console.log("body:", email.text);
		console.log("from:", email.from.text);
		console.log("attachments:", email.attachments);
		return email;
	} catch (Error) {
		console.log(Error, Error.stack);
		return null;
	}
};

module.exports = {
	readEmailObject
};
