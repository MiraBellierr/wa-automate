const prefix = process.env.PREFIX;

module.exports = (client, message) => {
	if (message.body.startsWith("@601137463940")) {
		const prm = message.body.slice("@601137463940".length).trim();

		if (!prm) return;

		const { Configuration, OpenAIApi } = require("openai");

		const configuration = new Configuration({
			apiKey: process.env.OPEN_AI_KEY,
		});

		const openai = new OpenAIApi(configuration);

		async function main() {
			const response = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: prm,
				temperature: 0,
				max_tokens: 4096,
			});

			console.log(response.data.choices);

			client.reply(message.from, response.data.choices[0].text, message.id);
		}

		main();
	}
	if (!message.body.startsWith(prefix)) return;

	const args = message.body.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (client.commands.get(cmd)) {
		client.commands.get(cmd).run(client, message, args);
	}
};
