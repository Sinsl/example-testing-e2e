/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/tip.js
const tip = () => {
  const elemTip = document.querySelector(".tip");
  const img = document.querySelector(".img");
  img.addEventListener("click", () => {
    elemTip.classList.toggle("tip-active");
  });
};
;// CONCATENATED MODULE: ./src/js/app.js
// TODO: write code here

// comment this to pass build
const unusedVariable = "variable";

// for demonstration purpose only
function demo(value) {
  return `Demo: ${value}`;
}
console.log("app.js included");
tip();
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;