const { main } = require("../src/handlers/checkIncomingEmail");
const { logger } = require("../src/utils/logger");

(async () => {
	const result = await main("test@happyeme.com");
	logger.info(result);
})();
