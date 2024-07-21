"use strict";
let slides = document.querySelectorAll(".slide");
let dots = document.querySelector(".dots");
let navLinks = document.querySelector(".nav-links");
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
/* let obsCallback = function (entries) {
  let [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove('sticky-nav');
  else nav.classList.add('sticky-nav');
};
let obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${getComputedStyle(nav).height}`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header); */

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
      element.style.backgroundColor = "transparent";
    });
    event.target.closest(".nav-link").style.backgroundColor = "#79bfff38";
  }
});
