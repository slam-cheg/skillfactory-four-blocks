const timer = document.querySelector(".takeit-timer");
const timerDaysValue = timer.querySelector(".takeit-timer__days-value");
const timerHoursValue = timer.querySelector(".takeit-timer__hours-value");
const timerMinutesValue = timer.querySelector(".takeit-timer__minutes-value");
const timerSecondsValue = timer.querySelector(".takeit-timer__seconds-value");
let endDate = 0;
const ratesPopupLinks = document.querySelectorAll(".rate-card__list-item_underline");
const ratesPopups = document.querySelectorAll(".takeit__popup");

ratesPopupLinks.forEach((link) => {
	link.addEventListener("click", () => {
		ratesPopups.forEach((popup) => {
			if (popup.id === link.id) {
				openPopup(popup);
				const closeIco = popup.querySelector(".takeit__popup-close");
				closeIco.addEventListener("click", () => {
					closePopup(popup);
				});
			}
		});
	});
});


setTimeout(() => {
	endDate = window.SFData['https://skillfactory.ru/python-fullstack-web-developer-b/']['75'];
}, 500);

function updateTimerClock() {
	var t = getRemainingTime(endDate);

	if (t.days < 10) {
		t.days = ("0" + t.days).slice(-2);
	}
	t.hours = ("0" + t.hours).slice(-2);
	t.minutes = ("0" + t.minutes).slice(-2);
	t.seconds = ("0" + t.seconds).slice(-2);
	if (t.total <= 0) {
		clearInterval(timerinterval);
	}
	timerDaysValue.textContent = t.days;
	timerHoursValue.textContent = t.hours;
	timerMinutesValue.textContent = t.minutes;
	timerSecondsValue.textContent = t.seconds;
}
updateTimerClock();
var timerinterval = setInterval(updateTimerClock, 1000);

function getRemainingTime(endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date());
	const seconds = t < 0 ? 0 : Math.floor((t / 1000) % 60);
	const minutes = t < 0 ? 0 : Math.floor((t / 1000 / 60) % 60);
	const hours = t < 0 ? 0 : Math.floor((t / (1000 * 60 * 60)) % 24);
	const days = t < 0 ? 0 : Math.floor(t / (1000 * 60 * 60 * 24));

	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	};
}

const ratesSlider = new Swiper(".takeit__slider", {
	loop: false,
	navigation: {
		nextEl: "#rates-prev-btn",
		prevEl: "#rates-next-btn",
	},
	spaceBetween: 25,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		960: {
			slidesPerView: 2,
		},
		1199: {
			slidesPerView: 3,
		},
	},
});