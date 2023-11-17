const learningVideosEl = document.querySelector(".learning__videos");

let thumbsSlider, learningVideos;

if (window.innerWidth < 960) {
	thumbsSlider = new Swiper(".learning__tabs", {
		loop: true,
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

	learningVideos = new Swiper(".learning__videos", {
		loop: true,
		navigation: {
			nextEl: ".learning-button-next",
			prevEl: ".learning-button-prev",
		},
		slidesPerView: 1,
		on: {
			init: () => {
				learningVideosEl.querySelector(".swiper-slide-active").querySelector("video").play();
			},
		},
	});

	learningVideos.controller.control = thumbsSlider;
	thumbsSlider.controller.control = learningVideos;
} else {
	thumbsSlider = new Swiper(".learning__tabs", {
		loop: true,
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

	learningVideos = new Swiper(".learning__videos", {
		loop: true,
		navigation: {
			nextEl: ".learning-button-next",
			prevEl: ".learning-button-prev",
		},
		slidesPerView: 1,
		thumbs: {
			swiper: thumbsSlider,
		},
		on: {
			init: () => {
				learningVideosEl.querySelector(".swiper-slide-active").querySelector("video").play();
			},
		},
	});
}

learningVideos.on("slideChangeTransitionEnd", () => {
	const allSlides = learningVideosEl.querySelectorAll(".swiper-slide");
	allSlides.forEach((slide) => {
		const video = slide.querySelector("video");
		if (slide.classList.contains("swiper-slide-active")) {
			video.play();
		} else {
			video.pause();
		}
	});
});