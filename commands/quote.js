const axios = require("axios");

module.exports = {
	name: "quote",
	description: "Sends a random Anime quote",
	run: async (client, message) => {
		const res = await axios.get("https://animechan.vercel.app/api/random");

		await client.reply(
			message.from,
			`*“${res.data.quote}”*\n\n _―${res.data.character} (${res.data.anime})_`,
			message.id
		);
	},
};
