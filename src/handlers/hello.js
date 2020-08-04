const { logger } = require("../utils/logger");

const main = async event => {
	logger.info(event);
};

module.exports = {
	main
};
