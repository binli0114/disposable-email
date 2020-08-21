const { getEmailObjectInfo } = require("../src/utils");
describe("utils", () => {
	describe("getEmailObjectInfo", () => {
		it("should return bucket and object key", () => {
			const NewImage = {
				bucketName: {
					S: "myBucketName"
				},
				bucketObjectKey: {
					S: "e6n88qq7p2soh742"
				},
				destination: {
					S: "5CcRYbmQ@happyeme.com"
				},
				messageId: {
					S: "myMessageId"
				}
			};
			const result = getEmailObjectInfo(NewImage);
			expect(result).toStrictEqual({
				bucketName: "myBucketName",
				bucketObjectKey: "e6n88qq7p2soh742",
				destination: "5CcRYbmQ@happyeme.com",
				messageId: "myMessageId"
			});
		});
		it("should return undefined", () => {
			const NewImage = {};
			const result = getEmailObjectInfo(NewImage);
			expect(result).toStrictEqual({
				bucketName: undefined,
				bucketObjectKey: undefined,
				destination: undefined,
				messageId: undefined
			});
		});
	});
});
