const outerAccords = document.querySelectorAll(".accord-outer");
const programAccord = document.querySelector(".program__accord-wrapper");
const programAccordItems = programAccord.querySelectorAll(".accord-inner__element");

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