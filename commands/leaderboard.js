const Quiz = require("../database/quiz");

module.exports = {
	name: "leaderboard",
	description: "Shows the leaderboard",
	run: async (client, message) => {
		const findAllUser = await Quiz().findAll({
			order: [["score", "DESC"]],
			limit: 10,
		});

		if (!findAllUser) {
			client.reply(
				message.from,
				"No one has played yet! Use !quiz to play.",
				message.id
			);
		}

		if (!message.chat.isGroup) {
			return;
		}

		let leaderboard = [];

		findAllUser.forEach((quiz) => {
			const element = message.chat.groupMetadata.participants.find(
				(participant) => participant.id === quiz.dataValues.author
			);

			if (element) {
				leaderboard.push(quiz.dataValues);
			}
		});

		leaderboard = leaderboard.map(async (user) => {
			const contact = await client.getContact(user.author);
			return {
				author: contact.pushname,
				score: user.score,
			};
		});

		const results = await Promise.all(leaderboard);

		const text = `*Quiz Leaderboard*\n\n${results
			.map((user, i) => `[${i + 1}] - ${user.author} - ${user.score} points`)
			.join("\n")}`;

		client.reply(message.from, text, message.id);
	},
};
