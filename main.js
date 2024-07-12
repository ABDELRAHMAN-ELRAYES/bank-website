"use strict";
let homeContents = document.querySelectorAll(".home-content");
let amount = 0;
homeContents.forEach(element => {
  element.style.transform = `translateX(${amount}%)`;
  amount += 100;
});
