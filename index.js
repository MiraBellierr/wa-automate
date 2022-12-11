const wa = require("@open-wa/wa-automate");
const Neko = require("nekos.life");
const neko = new Neko();
const prefix = "!";
const axios = require("axios");

wa.create({
	sessionId: "BOT",
	multiDevice: true, //required to enable multiDevice support
	authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
	blockCrashLogs: true,
	disableSpins: true,
	headless: true,
	hostNotificationLang: "PT_BR",
	logConsole: false,
	popup: true,
	qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then((client) => start(client));

function start(client) {
	client.onMessage(async (message) => {
		if (!message.body.startsWith(prefix)) return;

		const args = message.body.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();

		if (cmd === "ping") {
			await client.sendText(message.from, "Pong 🏓");
		} else if (cmd === "neko") {
			const img = await neko.neko();

			await client.sendImage(message.from, img.url, "neko.jpg", "");
		} else if (cmd === "quote") {
			const res = await axios.get("https://animechan.vercel.app/api/random");

			await client.sendText(
				message.from,
				`*“${res.data.quote}”*\n\n _―${res.data.character} (${res.data.anime})_`
			);
		}
	});
}
