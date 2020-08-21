const { main } = require("../src/handlers/distributeEmail");
const event = require("../mocks/dynamodbStream.json");
(async () => {
	await main(event);
})();
