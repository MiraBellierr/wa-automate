const axios = require("axios");
const Quiz = require("../database/quiz");
const { decode } = require("html-entities");

module.exports = {
	name: "quiz",
	description: "Starts a quiz",
	run: async (client, message) => {
		if (!(await Quiz().findOne({ where: { author: message.author } }))) {
			await Quiz().create({
				author: message.author,
			});
		}

		const user = await Quiz().findOne({ where: { author: message.author } });

		const res = (await axios.get("https://opentdb.com/api.php?amount=1")).data
			.results[0];

		res.incorrect_answers.push(res.correct_answer);
		shuffle(res.incorrect_answers);

		if (res.type === "multiple") {
			const text = `*${res.category}*\n\n${decode(res.question)}\nA. ${decode(
				res.incorrect_answers[0]
			)}\nB. ${decode(res.incorrect_answers[1])}\nC. ${decode(
				res.incorrect_answers[2]
			)}\nD. ${decode(res.incorrect_answers[3])}`;

			client.reply(message.from, text, message.id);

			const multiple = {
				a: res.incorrect_answers[0],
				b: res.incorrect_answers[1],
				c: res.incorrect_answers[2],
				d: res.incorrect_answers[3],
			};

			const filter = (m) => m.author === message.author;
			const options = {
				max: 1,
				time: 10000,
				errors: ["time"],
			};

			client
				.awaitMessages(message.from, filter, options)
				.then(async (collected) => {
					const choice = multiple[collected.first().body.toLowerCase()];

					if (choice === res.correct_answer) {
						await Quiz().updateOne(
							{ score: user.get("score") + 1 },
							{ where: { author: message.author } }
						);

						client.reply(
							collected.first().from,
							"Correct, you get 1 score!",
							collected.first().id
						);
					} else {
						client.reply(
							collected.first().from,
							`Wrong! The answer is ${res.correct_answer}!`,
							collected.first().id
						);
					}
				})
				.catch(() => {
					client.reply(
						message.from,
						`Time's up! The answer is ${res.correct_answer}!`,
						message.id
					);
				});
		} else {
			const text = `*${res.category}*\n\n${decode(
				res.question
			)}\nTrue or false?`;

			client.reply(message.from, text, message.id);

			const filter = (m) => m.author === message.author;
			const options = {
				max: 1,
				time: 10000,
				errors: ["time"],
			};

			client
				.awaitMessages(message.from, filter, options)
				.then((collected) => {
					const choice = collected.first().body.toLowerCase();

					if (choice === res.correct_answer.toLowerCase()) {
						Quiz().updateOne(
							{ score: user.get("score") + 1 },
							{ where: { author: message.author } }
						);

						client.reply(
							collected.first(),
							"Correct, you get 1 score!",
							collected.first().id
						);
					} else {
						client.reply(
							collected.first().from,
							`Wrong! The answer is ${res.correct_answer.toLowerCase()}!`,
							collected.first().id
						);
					}
				})
				.catch(() => {
					client.reply(
						message.from,
						`Time's up! The answer is ${res.correct_answer.toLowerCase()}!`,
						message.id
					);
				});
		}
	},
};

function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}
