const description = document.querySelector(
  ".item-detail-info .item-description"
);
const readMoreBtn = document.querySelector(
  ".item-detail-info button.read-more"
);
const fader = document.querySelector(".item-detail-info .fader");
console.log(description.clientHeight);

function truncateDescription() {
  description.style.height = "120px";
  readMoreBtn.classList.remove("hidden");
  fader.classList.remove("hidden");
}

function toggleReadMore() {
  if (readMoreBtn.innerText === "Read More") {
    description.style.height = "auto";
    readMoreBtn.innerText = "Read Less";
    fader.classList.add("hidden");
  } else {
    description.style.height = "120px";
    readMoreBtn.innerText = "Read More";
    fader.classList.remove("hidden");
  }
}

if (description.clientHeight > 140) {
  truncateDescription();
}

readMoreBtn.addEventListener("click", toggleReadMore);
