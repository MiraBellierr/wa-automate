const adhan = require("adhan");
const coordinates = new adhan.Coordinates(1.458377, 110.454431);
const params = adhan.CalculationMethod.Singapore();
const date = new Date();
const res = new adhan.PrayerTimes(coordinates, date, params);
var current = res.currentPrayer();
var next = res.nextPrayer();
var nextPrayerTime = res.timeForPrayer(next);

module.exports = {
	name: "adhan",
	description: "Shows prayer times for Kota Samarahan",
	run: async (client, message) => {
		const prayerTimes = {
			fajr: formatTime(res.fajr),
			sunrise: formatTime(res.sunrise),
			dhuhr: formatTime(res.dhuhr),
			asr: formatTime(res.asr),
			sunset: formatTime(res.sunset),
			maghrib: formatTime(res.maghrib),
			isha: formatTime(res.isha),
			current,
			next,
			nextPrayerTime,
		};

		const text = `*Prayer time for Kota Samarahan*\n\n*• Fajr:* ${
			prayerTimes.fajr
		}\n*• Sunrise:* ${prayerTimes.sunrise}\n*• Dhuhr:* ${
			prayerTimes.dhuhr
		}\n*• Asr:* ${prayerTimes.asr}\n*• Sunset:* ${
			prayerTimes.sunrise
		}\n*• Maghrib:* ${prayerTimes.maghrib}\n*• Isha:* ${
			prayerTimes.isha
		}\n\nCurrent pray is ${prayerTimes.current} and next pray is ${
			prayerTimes.next
		} ${prayerTimes.next === "none" ? "" : `at ${prayerTimes.nextPrayerTime}`}`;

		client.reply(message.from, text, message.id);
	},
};

function formatTime(time) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}).format(time);
}
