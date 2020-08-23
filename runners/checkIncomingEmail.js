const { main } = require("../src/handlers/checkIncomingEmail");
const { logger } = require("../src/utils/logger");

(async () => {
	const result = await isAddressExist("test@happyeme.com");
	logger.info(result);
})();
