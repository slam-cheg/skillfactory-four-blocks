const iframeLayout = `<video class="videos__iframe" src="" width="100%" frameborder="0" poster="" autoplay muted loop playsinline controls></video>`;
const iframeWrappers = document.querySelectorAll(".videos__iframe-wrapper");
const reviewsContainer = document.querySelector(".videos__swiper");
const reviews = reviewsContainer.querySelectorAll(".swiper-slide");
const reviewPopup = document.querySelector(".popup-review");
const reviewPopupWrapper = reviewPopup.querySelector(".popup-review__wrapper");
const reviewPopupName = reviewPopup.querySelector(".popup-review__title");
const reviewPopupSubtitle = reviewPopup.querySelector(".popup-review__subtitle");
const reviewPopupDescription = reviewPopup.querySelector(".popup-review__description");
const reviewPopupCloseButton = reviewPopup.querySelector(".popup-review__close-ico");

reviewPopupCloseButton.addEventListener("click", () => {
	closePopup(reviewPopup);
});

iframeWrappers.forEach((wrapper) => {
	const playBtn = wrapper.querySelector(".videos__play");
	const preview = wrapper.querySelector(".videos__preview");
	const currentVideoId = wrapper.dataset.video;

	wrapper.addEventListener("click", () => {
		preview.insertAdjacentHTML("afterend", iframeLayout);
		const poster = wrapper.querySelector(".videos__preview").src;
		const iframe = wrapper.querySelector(".videos__iframe");
		iframe.src = `https://storage.yandexcloud.net/sf-wallaper-bucket/video/${currentVideoId}.mp4`;
		iframe.poster = poster;
		playBtn.classList.add("videos__play_hidden");
		preview.classList.add("videos__preview_hidden");
	});
});

reviews.forEach((slide) => {
	const nameText = slide.querySelector(".videos__name").textContent;
	const descriptionText = slide.querySelector(".videos__review-text").querySelectorAll("p");
	const reviewButton = slide.querySelector(".videos__popup-button");
	const subtitleText = reviewButton.dataset.course;
	const subtitleLink = reviewButton.dataset.link;

	reviewButton.addEventListener("click", () => {
		fullingPopup(nameText, subtitleText, descriptionText, subtitleLink);
		openPopup(reviewPopup);
	});
});

function fullingPopup(name, subtitle, description, href) {
	reviewPopupName.textContent = name;
	reviewPopupSubtitle.textContent = subtitle;
	reviewPopupSubtitle.href = href;
	description.forEach((p) => {
		reviewPopupDescription.appendChild(p);
	});
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

function clearPopup() {
	const popupText = reviewPopupDescription.querySelectorAll("p");
	reviewPopupName.textContent = "";
	reviewPopupSubtitle.textContent = "";
	reviewPopupSubtitle.href = "#";
	popupText.forEach((p) => {
		p.remove();
	});
}

function openPopup(currentPopup) {
	currentPopup.classList.add("popup_opened");
	currentPopup.addEventListener("click", handleOverlayClick);
	window.addEventListener("keydown", closeByEscape);
}

function closePopup(currentPopup) {
	currentPopup.classList.remove("popup_opened");
	if (currentPopup === reviewPopup) {
		setTimeout(() => {
			clearPopup();
		}, 100);
	}
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