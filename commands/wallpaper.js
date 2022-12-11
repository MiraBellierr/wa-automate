const Neko = require("nekos.life");
const neko = new Neko();

module.exports = {
	name: "wallpaper",
	description: "Sends a random wallpaper",
	run: async (client, message) => {
		const img = await neko.wallpaper();

		await client.sendImage(
			message.from,
			img.url,
			"wallpaper.jpg",
			"",
			message.id
		);
	},
};
