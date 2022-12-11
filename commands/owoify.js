const Neko = require("nekos.life");
const neko = new Neko();

module.exports = {
	name: "owoify",
	description: "Owoifies a text",
	run: async (client, message, args) => {
		if (!args.length) {
			return client.reply(
				message.from,
				"Please provide a text to owoify",
				message.id
			);
		}
		const text = args.join(" ");
		const res = await neko.OwOify({ text });

		await client.reply(message.from, res.owo, message.id);
	},
};
