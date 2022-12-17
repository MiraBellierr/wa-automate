const axios = require("axios");

module.exports = {
	name: "upcomingmovies",
	description: "Shows a list of upcoming movies",
	run: async (client, message, args) => {
		let page;

		if (!args.length || isNaN(args[0])) {
			page = 1;
		} else {
			page = parseInt(args[0]);
		}

		axios
			.get(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.MOVIES_DB_API}&language=en-US&page=${page}`
			)
			.then((res) => {
				const text = res.data.results
					.map(
						(movie, index) =>
							`${index + 1}. *${movie.title}* (${movie.release_date})\n${
								movie.overview
							}`
					)
					.join("\n\n");

				client.reply(
					message.from,
					`*PAGE ${res.data.page}*\n\n*Note*: Write _!upcomingmovies ${
						res.data.page + 1
					}_ for page ${res.data.page + 1}.\n\n${text}`,
					message.id
				);
			})
			.catch((e) => {
				client.reply(message.from, e.response.data.errors[0], message.id);
			});
	},
};
