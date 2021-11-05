const getEmailObjectInfo = NewImage => {
	const {
		bucketName: { S: bucketName } = {},
		bucketObjectKey: { S: bucketObjectKey } = {},
		destination: { S: destination } = {},
		messageId: { S: messageId } = {}
	} = NewImage;
	return { bucketName, bucketObjectKey, destination, messageId };
};

module.exports = {
	getEmailObjectInfo
};
