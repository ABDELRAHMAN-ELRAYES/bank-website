"use strict";
let slides = document.querySelectorAll(".slide");
let dots = document.querySelector(".dots");
let sectionOne = document.querySelector(".section1");
let nav = document.querySelector("nav");
let navLinks = document.querySelector(".nav-links");
let bars = document.querySelector(".bars");
let sideNav = document.querySelector(".side-nav");
let closeSideNav = document.querySelector(".close-nav");
let secThreeOpts = document.querySelector(".sec3-opts");
let individualSecThreeOpt = document.querySelector(".opt-ind");
let companySecThreeOpt = document.querySelector(".opt-com");
let individualSecThreeFeature = document.querySelector(".sec3-feature-ind");
let companySecThreeFeature = document.querySelector(".sec3-feature-com");
let sideNavElements = sideNav.children;
let sectionThreeFeatures = document.querySelector(".sec3-features");
let sectionFourSlides = document.querySelectorAll(".sec4-slide");
let sectionFourSliderBtns = document.querySelector(".sec4-slider-btns");
let currentSlide = 1;
let dotCounter = 1;
slides.forEach(element => {
  let dot = `<div class="dot dot${dotCounter}" data-slide-number="${dotCounter++}"></div>`;
  dots.insertAdjacentHTML("beforeend", dot);
});
let goToSlide = function (curSlide) {
  slides.forEach((element, i) => {
    element.style.transform = `translateX(${100 * (i + 1 - curSlide)}%)`;
  });
};
let activateDot = function (slideNum) {
  let allDots = dots.children;
  Array.from(allDots).forEach(child => {
    child.classList.remove("active-dot");
  });
  document.querySelector(`.dot${slideNum}`).classList.add("active-dot");
};
goToSlide(currentSlide);
activateDot(currentSlide);

dots.addEventListener("click", event => {
  if (event.target.classList.contains("dot")) {
    let slideNum = Number(event.target.dataset.slideNumber);
    goToSlide(slideNum);
    activateDot(slideNum);
  }
});

/* <------------------------------------------------> */
//make the slides in home auto change every 10 seconds

setInterval(() => {
  currentSlide++;
  if (currentSlide > 3) {
    currentSlide = 1;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}, 10000);

/* <------------------------------------------------> */
// make the background of the current page colored when click on its nav-link
navLinks.addEventListener("click", event => {
  if (event.target.closest(".nav-link")) {
    let allNavLinks = document.querySelectorAll(".nav-link");
    allNavLinks.forEach(element => {
      // element.style.backgroundColor = "transparent";
      element.classList.remove("active-nav-link");
    });
    // event.target.closest(".nav-link").style.backgroundColor = "#79bfff38";
    event.target.closest(".nav-link").classList.add("active-nav-link");
  }
});

/* <------------------------------------------------> */
// make the left side nav bar
let hideSideNavElements = function () {
  Array.from(sideNavElements).forEach(element => {
    element.classList.add("deactivate");
  });
};
//make the children of the side nav display
hideSideNavElements();

bars.addEventListener("click", function () {
  sideNav.classList.add("active-side-nav");
  Array.from(sideNavElements).forEach(element => {
    element.classList.remove("deactivate");
  });
});
closeSideNav.addEventListener("click", function () {
  hideSideNavElements();
  sideNav.classList.remove("active-side-nav");
});

/* <------------------------------------------------> */
// make the background of the nav become white when it cross the first section

let obsCallback = function (entries) {
  let [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove("sticky-nav");
  else nav.classList.add("sticky-nav");
};
let obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${getComputedStyle(nav).height}`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(sectionOne);

/* <------------------------------------------------> */
// switch between section three options ;

let viewInd = function () {
  companySecThreeOpt.classList.remove("cli-trans-back");
  individualSecThreeOpt.classList.add("cli-trans-back");
  companySecThreeFeature.style.display = "none";
  individualSecThreeFeature.style.display = "flex";
};
let viewCom = function () {
  individualSecThreeOpt.classList.remove("cli-trans-back");
  companySecThreeOpt.classList.add("cli-trans-back");
  companySecThreeFeature.style.display = "flex";
  individualSecThreeFeature.style.display = "none";
};

secThreeOpts.addEventListener("click", event => {
  if (event.target.closest(".opt-ind")) {
    viewInd();
  } else if (event.target.closest(".opt-com")) {
    viewCom();
  }
});
/* <----------------------------------------------------> */
//make the right icon of the inner feature of section three move when mouseover
sectionThreeFeatures.addEventListener("mouseover", function (event) {
  if (event.target.closest(".sec3-inner-feature")) {
    let parentDiv = event.target.closest(".sec3-inner-feature");
    let rightIcon = parentDiv.querySelector(".ri-icon");
    rightIcon.style.transform = "rotate(360deg)";
    rightIcon.classList.add("cli-trans-back");
  }
});
sectionThreeFeatures.addEventListener("mouseout", function (event) {
  if (event.target.closest(".sec3-inner-feature")) {
    let parentDiv = event.target.closest(".sec3-inner-feature");
    let rightIcon = parentDiv.querySelector(".ri-icon");
    rightIcon.style.transform = "rotate(0deg)";
    rightIcon.classList.remove("cli-trans-back");
  }
});
/* <-----------------------------------------------------------------------------> */
// make the slider of the section four
let currentSectionFourSlide = 0;
let sectionFourGotoSlide = function (curSlide) {
  sectionFourSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - curSlide) * 33}rem)`;
  });
};
sectionFourGotoSlide(currentSectionFourSlide);
sectionFourSliderBtns.addEventListener("click", event => {
  if (event.target.closest(".sec4-slider-right")) {
    currentSectionFourSlide =
      currentSectionFourSlide >= 7 ? 0 : currentSectionFourSlide + 1;
    sectionFourGotoSlide(currentSectionFourSlide);
  }
  if (event.target.closest(".sec4-slider-left")) {
    currentSectionFourSlide =
      currentSectionFourSlide <= 0 ? 7 : currentSectionFourSlide - 1;
    sectionFourGotoSlide(currentSectionFourSlide);
  }
});
/* <----------------------------------------------------------------------------> */
//add transition background for  slider buttons in section 4 home page
sectionFourSliderBtns.addEventListener("mouseover", event => {
  if (event.target.closest(".sec4-slider-btn")) {
    event.target.closest(".sec4-slider-btn").classList.add("cli-trans-back");
  }
});
sectionFourSliderBtns.addEventListener("mouseout", event => {
  if (event.target.closest(".sec4-slider-btn")) {
    event.target.closest(".sec4-slider-btn").classList.remove("cli-trans-back");
  }
});

