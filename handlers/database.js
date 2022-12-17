const Quiz = require("../database/quiz");

module.exports = async (client) => {
	Quiz();

	console.log("Database loaded!");
};
