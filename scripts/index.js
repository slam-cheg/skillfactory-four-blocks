const outerAccords = document.querySelectorAll(".accord-outer");
const programAccord = document.querySelector(".program__accord-wrapper");
const programAccordItems = programAccord.querySelectorAll(".accord-inner__element");
const iframeLayout = `<iframe class="videos__iframe" width="100%" height="100%" frameborder="0" allowfullscreen="" src="" allow="autoplay"></iframe>`;
const iframeWrappers = document.querySelectorAll(".videos__iframe-wrapper");
const reviewsContainer = document.querySelector(".videos__swiper");
const reviews = reviewsContainer.querySelectorAll(".swiper-slide");
const reviewPopup = document.querySelector(".popup-review");
const reviewPopupWrapper = reviewPopup.querySelector(".popup-review__wrapper");
const reviewPopupName = reviewPopup.querySelector(".popup-review__title");
const reviewPopupSubtitle = reviewPopup.querySelector(".popup-review__subtitle");
const reviewPopupDescription = reviewPopup.querySelector(".popup-review__description");
const reviewPopupCloseButton = reviewPopup.querySelector(".popup-review__close-ico");
const timerEndTime = document.querySelector(".timer");
const timer = document.querySelector(".takeit-timer");
const timerDaysValue = timer.querySelector(".takeit-timer__days-value");
const timerHoursValue = timer.querySelector(".takeit-timer__hours-value");
const timerMinutesValue = timer.querySelector(".takeit-timer__minutes-value");
const timerSecondsValue = timer.querySelector(".takeit-timer__seconds-value");
let endtime = 0;
const ratesPopupLinks = document.querySelectorAll(".rate-card__list-item_underline");
const ratesPopups = document.querySelectorAll(".takeit__popup");

reviewPopupCloseButton.addEventListener("click", () => {
	closePopup(reviewPopup);
});

outerAccords.forEach((accord) => {
	const outerAccordElement = accord.querySelector(".accord-outer__element");
	const outerAccordHeader = outerAccordElement.querySelector(".accord-header_outer");
	const innerAccords = outerAccordElement.querySelectorAll(".accord-inner");

	outerAccordHeader.addEventListener("click", () => {
		handlerAccordToggle(outerAccordElement);
	});
	innerAccords.forEach((innerAccord) => {
		const innerAccordElements = innerAccord.querySelectorAll(".accord-inner__element");
		innerAccordElements.forEach((element) => {
			element.addEventListener("click", () => {
				handlerAccordToggle(element);
			});
		});
	});
});

programAccordItems.forEach((element) => {
	const programAccordHeader = element.querySelector(".accord-header");
	programAccordHeader.addEventListener("click", () => {
		handlerAccordToggle(element);
	});
});

iframeWrappers.forEach((wrapper) => {
	const playBtn = wrapper.querySelector(".videos__play");
	const preview = wrapper.querySelector(".videos__preview");
	const currentVideoId = wrapper.dataset.video;

	wrapper.addEventListener("click", () => {
		preview.insertAdjacentHTML("afterend", iframeLayout);
		const iframe = wrapper.querySelector(".videos__iframe");
		iframe.src = `https://www.youtube.com/embed/${currentVideoId}?&amp;autoplay=1&amp;rel=0`;
		playBtn.classList.add("videos__play_hidden");
		preview.classList.add("videos__preview_hidden");
	});
});

reviews.forEach((slide) => {
	const nameText = slide.querySelector(".videos__name").textContent;
	const descriptionText = slide.querySelector(".videos__description").textContent;
	const reviewButton = slide.querySelector(".videos__popup-button");
	const subtitleText = reviewButton.dataset.course;

	reviewButton.addEventListener("click", () => {
		fullingPopup(nameText, subtitleText, descriptionText);
		openPopup(reviewPopup);
	});
});

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

function handlerAccordToggle(accord) {
	accord.classList.toggle("accord-opened");
	accord.classList.toggle("accord-closed");
}

const videosSwiper = new Swiper(".videos__swiper", {
	loop: false,
	navigation: {
		nextEl: "#videos-prev-btn",
		prevEl: "#videos-next-btn",
	},
	spaceBetween: 44,
	slideToClickedSlide: false,
	mousewheel: {
		invert: false,
		forceToAxis: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 1.2,
		},
		480: {
			slidesPerView: 1.8,
			freeMode: {
				enabled: true,
				sticky: false,
			},
		},
		640: {
			slidesPerView: 2.4,
		},
		960: {
			slidesPerView: 4,
			freeMode: {
				enabled: false,
				sticky: true,
			},
		},
	},
});

function openPopup(currentPopup) {
	currentPopup.classList.add("popup_opened");
	currentPopup.addEventListener("click", handleOverlayClick);
	window.addEventListener("keydown", closeByEscape);
}

function closePopup(currentPopup) {
	currentPopup.classList.remove("popup_opened");
	window.removeEventListener("keydown", closeByEscape);
}

function handleOverlayClick(event) {
	if (event.type === "click") {
		if (event.target === event.currentTarget) {
			closePopup(event.target);
		}
	}
}

function closeByEscape(event) {
	if (event.key === "Escape") {
		const openedPopUp = document.querySelector(".popup_opened");
		closePopup(openedPopUp);
	}
}

function fullingPopup(name, subtitle, description) {
	reviewPopupName.textContent = name;
	reviewPopupSubtitle.textContent = subtitle;
	reviewPopupDescription.textContent = description;
}

if (window.innerWidth < 960) {
	const thumbsSlider = new Swiper(".learning__tabs", {
		loop: false,
		slidesPerView: 4,
		slideToClickedSlide: true,
		navigation: {
			nextEl: ".tabs-button-next",
			prevEl: ".tabs-button-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			960: {
				slidesPerView: 4,
			},
		},
	});

	const learningVideos = new Swiper(".learning__videos", {
		loop: false,
		navigation: {
			nextEl: ".learning-button-next",
			prevEl: ".learning-button-prev",
		},
		slidesPerView: 1,
	});

	learningVideos.controller.control = thumbsSlider;
	thumbsSlider.controller.control = learningVideos;
} else {
	const thumbsSlider = new Swiper(".learning__tabs", {
		loop: false,
		slidesPerView: 4,
		slideToClickedSlide: true,
		navigation: {
			nextEl: ".tabs-button-next",
			prevEl: ".tabs-button-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			960: {
				slidesPerView: 4,
			},
		},
	});

	const learningVideos = new Swiper(".learning__videos", {
		loop: false,
		navigation: {
			nextEl: ".learning-button-next",
			prevEl: ".learning-button-prev",
		},
		slidesPerView: 1,
		thumbs: {
			swiper: thumbsSlider,
		},
	});
}

setTimeout(() => {
	endtime = timerEndTime.textContent;
}, 500);

function updateClock() {
	var t = getTimeRemaining(endtime);

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
updateClock();
var timerinterval = setInterval(updateClock, 1000);

function getTimeRemaining(endtime) {
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
