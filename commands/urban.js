const ud = require("urban-dictionary");

module.exports = {
	name: "urban",
	description: "Searches the Urban Dictionary for a word or phrase.",
	run: async (client, message, args) => {
		if (!args.length) {
			return await client.reply(
				message.from,
				"Please provide a word or phrase to search for.",
				message.id
			);
		}

		ud.define(args.join(" "))
			.then(async (result) => {
				const definition = result[0].definition
					.replace(/[\[+]/gm, "")
					.replace(/[\]+]/gm, "");

				const word = result[0].word;
				const example = result[0].example
					.replace(/[\[+]/gm, "")
					.replace(/[\]+]/gm, "");

				await client.reply(
					message.from,
					`*${word}*\n\n${definition}\n\n*Example:*\n${example}`,
					message.id
				);
			})
			.catch((e) => {
				console.log(e);
				client.reply(message.from, "No results found.", message.id);
			});
	},
};
