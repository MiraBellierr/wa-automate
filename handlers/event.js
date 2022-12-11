const fs = require("fs");

module.exports = (client) => {
	fs.readdirSync("./events").forEach((file) => {
		const event = require(`../events/${file}`);

		client[file.split(".")[0]]((...args) => event(client, ...args));
	});
};
