const { main } = require("../src/handlers/storeIncomingEmail");
const { logger } = require("../src/utils/logger");
const event = require("../mocks/snsMessage.json");
(async () => {
	const result = await main(event);
	logger.info(result);
})();
