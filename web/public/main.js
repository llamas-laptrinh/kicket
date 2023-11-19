document
  .querySelectorAll("[data-modal-toggle='select-modal']")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      const dialog = document.querySelector("#select-modal");
      if (!dialog.open) {
        dialog.show();
      } else {
        dialog.close();
      }
    });
  });

const menu = document.getElementById("menu");

//Toggle
document.getElementById("btn").addEventListener(
  "click",
  function (e) {
    menu.classList.toggle("open");
  },
  false
);
