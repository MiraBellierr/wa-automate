const adhan = require("adhan");
const coordinates = new adhan.Coordinates(1.458377, 110.454431);
const params = adhan.CalculationMethod.Singapore();
const date = new Date();
const res = new adhan.PrayerTimes(coordinates, date, params);
var current = res.currentPrayer();
var next = res.nextPrayer();
var nextPrayerTime = res.timeForPrayer(next);

function formatTime(time) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}).format(time);
}

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
