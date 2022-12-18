const axios = require("axios");

module.exports = {
	name: "meme",
	description: "sends a meme",
	run: async (client, message) => {
		const subreddits = [
			"funny",
			"memes",
			"dankmemes",
			"wholesomememes",
			"okbuddyretard",
			"comedymemes",
			"pewdiepiesubmissions",
			"lastimages",
			"historymemes",
			"raimimemes",
		];
		const random = Math.floor(Math.random() * subreddits.length);
		const subreddit = subreddits[random];

		const response = await axios.get(
			`https://www.reddit.com/r/${subreddit}/hot.json`
		);

		const children = response.data.data.children;

		children.filter(
			(child) =>
				child.data.url.endsWith("png") || child.data.url.endsWith("jpg")
		);

		const randomMeme =
			children[Math.floor(Math.random() * children.length)].data;

		client.sendImage(
			message.from,
			randomMeme.url,
			`${randomMeme.url.split(".")[1]}`,
			randomMeme.title
		);
	},
};
