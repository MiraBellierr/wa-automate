const w = require("weather-js2");

module.exports = {
	name: "weather",
	description: "Get the weather for a city.",
	run: async (client, message, args) => {
		if (!args.length) {
			return await client.reply(
				message.from,
				"Please provide a city.",
				message.id
			);
		}

		w.find(
			{ search: args.join(" "), degreeType: "C", resCount: 1 },
			(e, res) => {
				if (e) {
					console.log(e);
					return client.reply(message.from, "An error occurred.", message.id);
				}

				const result = res[0];

				client.reply(
					message.from,
					`*${result.location.name} - Today*\n\n*• Sky:* ${result.current.skytext}\n*• Temperature:* ${result.current.temperature}°C\n*• Feels like:* ${result.current.feelslike}°C\n*• Humidity:* ${result.current.humidity}%\n*• Wind:* ${result.current.winddisplay}\n*• Day:* ${result.current.day}`,
					message.id
				);

				client.sendImageAsSticker(message.from, result.current.imageUrl);
			}
		);
	},
};
