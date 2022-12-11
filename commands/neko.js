const Neko = require("nekos.life");
const neko = new Neko();

module.exports = {
	name: "neko",
	description: "Sends a random neko image",
	run: async (client, message) => {
		const img = await neko.neko();

		await client.sendImage(message.from, img.url, "neko.jpg", "", message.id);
	},
};
