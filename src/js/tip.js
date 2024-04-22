export const tip = () => {
  const elemTip = document.querySelector(".tip");
  const img = document.querySelector(".img");
  img.addEventListener("click", () => {
    elemTip.classList.toggle("tip-active");
  });
};
