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

reviewPopupCloseButton.addEventListener("click", closePopup);

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
    openPopup(nameText, subtitleText, descriptionText);
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

function openPopup(name, subtitle, description) {
  reviewPopupName.textContent = name;
  reviewPopupSubtitle.textContent = subtitle;
  reviewPopupDescription.textContent = description;
  reviewPopup.classList.add("popup-review_opened");

  reviewPopup.addEventListener("click", handleOverlayClick);
  window.addEventListener("keydown", closeByEscape);
}

function closePopup() {
  reviewPopup.classList.remove("popup-review_opened");
  setTimeout(clearPopup, 300);
  window.removeEventListener("keydown", closeByEscape);
}

function handleOverlayClick(event) {
  if (event.target !== reviewPopupWrapper) {
    closePopup();
  }
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

function clearPopup() {
  reviewPopupName.textContent = "####";
  reviewPopupSubtitle.textContent = "####";
  reviewPopupDescription.textContent = "####";
}

// const learningTabs = new Swiper(".learning__tabs", {
//   loop: false,
//   slideToClickedSlide: true,
//   slidesPerView: 4,
// });

const learningVideos = new Swiper(".learning__videos", {
  loop: false,
  navigation: {
    nextEl: ".learning-button-next",
    prevEl: ".learning-button-prev",
  },
  slidesPerView: 1,
  thumbs: {
    swiper: {
      el: '.learning__tabs',
      slidesPerView: 4
    }
  }
});

