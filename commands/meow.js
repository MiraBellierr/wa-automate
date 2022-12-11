const Neko = require("nekos.life");
const neko = new Neko();

module.exports = {
	name: "meow",
	description: "Sends a random cat image",
	run: async (client, message) => {
		const img = await neko.meow();

		await client.sendImage(
			message.from,
			img.url,
			`meow.${img.url.split(".")[1]}`,
			"",
			message.id
		);
	},
};
