module.exports = {
	name: "info",
	description: "Sends github link",
	run: async (client, message) => {
		client.sendLinkWithAutoPreview(
			message.from,
			"https://github.com/MiraBellierr"
		);
	},
};
