// Click a publication figure to see it full size; click anywhere or press Esc to close.
document.addEventListener("click", function (e) {
  var box = document.querySelector(".lightbox");
  if (box) { box.remove(); return; }
  if (!e.target.classList.contains("preview")) return;
  box = document.createElement("div");
  box.className = "lightbox";
  var img = document.createElement("img");
  img.src = e.target.src;
  img.alt = e.target.alt;
  box.appendChild(img);
  document.body.appendChild(box);
});
document.addEventListener("keydown", function (e) {
  var box = document.querySelector(".lightbox");
  if (box && e.key === "Escape") box.remove();
});
