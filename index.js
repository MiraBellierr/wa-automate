const wa = require("@open-wa/wa-automate");
const Neko = require("nekos.life");
const neko = new Neko();
const axios = require("axios");
const { Collection } = require("@discordjs/collection");

wa.create({
	sessionId: "BOT",
	multiDevice: true, //required to enable multiDevice support
	authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
	blockCrashLogs: true,
	disableSpins: true,
	headless: true,
	hostNotificationLang: "en-br",
	logConsole: false,
	popup: true,
	qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then((client) => {
	client.commands = new Collection();

	const command = require("./handlers/command");
	const event = require("./handlers/event");

	command(client);
	event(client);
});
