const AWSMock = require("aws-sdk-mock");
const AWS = require("aws-sdk");
const { executeDynamoDbAction } = require("../../src/services/dynamodb");
describe("dynamodb services", () => {
	beforeAll(() => {
		AWSMock.setSDKInstance(AWS);
	});
	afterAll(() => {
		AWSMock.restore();
	});
	describe("executeDynamoDbAction", () => {
		it("should call the action function", async () => {
			const mockGet = jest.fn().mockResolvedValue("ok");
			AWSMock.mock("DynamoDB.DocumentClient", "get", mockGet);
			const params = {
				TableName: "TableName",
				Key: { address: "address" }
			};
			await executeDynamoDbAction(params, "get");
			expect(mockGet).toHaveBeenCalled();
			// expect(mockGet).toHaveBeenCalled();
			// expect(mockGet).toHaveBeenCalledWith(params, "get");
		});
	});
});
