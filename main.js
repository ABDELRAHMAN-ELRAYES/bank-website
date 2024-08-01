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
let serviceSlides = document.querySelectorAll(".service-slide");
let rightServiceBtn = document.querySelector(".service-right");
let leftServiceBtn = document.querySelector(".service-left");
let servicesSlider = document.querySelector(".services-slider");
let serviceSections = document.querySelectorAll(".service-section");
let currentServiceSlide = 1;
let currentSectionFourSlide = 0;
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

let sectionFourGotoSlide = function (curSlide) {
  sectionFourSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - curSlide) * 30}rem)`;
    if (i === currentSectionFourSlide) {
      slide.querySelector("img").style.filter = "none";
    } else {
      slide.querySelector("img").style.filter = "blur(5px)";
    }
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
sectionFourSliderBtns.addEventListener("click", event => {
  if (event.target.closest(".sec4-slider-right")) {
    event.target.closest(".sec4-slider-right").classList.add("cli-trans-back");
    document
      .querySelector(".sec4-slider-left")
      .classList.remove("cli-trans-back");
  }
});
sectionFourSliderBtns.addEventListener("click", event => {
  if (event.target.closest(".sec4-slider-left")) {
    event.target.closest(".sec4-slider-left").classList.add("cli-trans-back");
    document
      .querySelector(".sec4-slider-right")
      .classList.remove("cli-trans-back");
  }
});

/* <------------------------------------------------------------------------------> */
// section five service slider

let goToServiceSlide = function (curSlide) {
  serviceSlides.forEach((element, i) => {
    element.style.transform = `translateX(${14 * (i + 1 - curSlide)}rem)`;
  });
};
goToServiceSlide(1);
rightServiceBtn.addEventListener("click", event => {
  if (currentServiceSlide < serviceSlides.length - 2) {
    currentServiceSlide++;
  } else {
    currentServiceSlide = 1;
  }
  goToServiceSlide(currentServiceSlide);
});
leftServiceBtn.addEventListener("click", event => {
  if (currentServiceSlide !== 1) {
    currentServiceSlide--;
  } else {
    currentServiceSlide = serviceSlides.length - 2;
  }
  goToServiceSlide(currentServiceSlide);
});
/* <-------------------------------------------------------------------------------> */
// add a circle transition background to the service-icon when hover on its slide
// make each slide view a section of summary of its topic on click

let resetServiceIcon = function () {
  serviceSlides.forEach(sli => {
    sli.querySelector(".service-icon").classList.remove("circ-trans-back");
    sli.querySelector("h1").style.color = "var(--soft-text-color)";
  });
};
let viewServiceSection = function (currentServiceSection) {
  serviceSections.forEach((sec, i) => {
    if (i + 1 === +currentServiceSection) {
      sec.classList.remove("deactivate-opc");
      sec.style.zIndex = "30";
    } else {
      sec.classList.add("deactivate-opc");
    }
  });
};
servicesSlider.addEventListener("click", event => {
  resetServiceIcon();
  if (event.target.closest(".service-slide")) {
    let serviceIconParent = event.target.closest(".service-slide");
    let serviceIcon = serviceIconParent.querySelector(".service-icon");

    serviceIcon.classList.add("circ-trans-back");
    serviceIconParent.querySelector("h1").style.color = "var(--con-color)";

    viewServiceSection(serviceIconParent.dataset.sectionNumber);
  }
});
/* <-------------------------------------------------------------------------------> */
