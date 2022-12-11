module.exports = {
	name: "ping",
	description: "Pong",
	run: async (client, message) => {
		client.reply(message.from, "Pong 🏓", message.id);
	},
};
