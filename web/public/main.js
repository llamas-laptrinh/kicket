const btn = document.getElementById("btn");
const menu = document.getElementById("menu");

//Toggle
btn.addEventListener(
  "click",
  function (e) {
    menu.classList.toggle("open");
  },
  false
);
