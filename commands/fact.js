const Neko = require("nekos.life");
const neko = new Neko();

module.exports = {
	name: "fact",
	description: "Sends a random fact",
	run: async (client, message) => {
		const res = await neko.fact();

		await client.reply(message.from, `*Fact:*\n\n${res.fact}`, message.id);
	},
};
