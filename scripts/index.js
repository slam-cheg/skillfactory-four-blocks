const outerAccords = document.querySelectorAll(".accord-outer");
const programAccord = document.querySelector(".program__accord-wrapper");
const programAccordItems = programAccord.querySelectorAll(".accord-inner__element");
const iframeLayout = `<iframe class="videos__iframe" width="100%" height="100%" frameborder="0" allowfullscreen="" src="" allow="autoplay"></iframe>`;
const iframeWrappers = document.querySelectorAll(".videos__iframe-wrapper");

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
	},
	breakpoints: {
		320: {
			slidesPerView: 1.2,
			spaceBetween: 20,
		},
		480: {
			slidesPerView: 1.8,
		},
		640: {
			slidesPerView: 2.4,
			spaceBetween: 40,
		},
		960: {
			slidesPerView: 4,
		},
	},
});