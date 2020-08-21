const getEmailObjectInfo = NewImage => {
	const {
		bucketName: { S: bucketName } = {},
		bucketObjectKey: { S: bucketObjectKey } = {}
	} = NewImage;
	return { bucketName, bucketObjectKey };
};

module.exports = {
	getEmailObjectInfo
};
