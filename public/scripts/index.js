const categoryBtns = document.querySelectorAll(".category-picker button");
const newArrivals = document.querySelectorAll(".new-arrivals .item");

// handle category button clicked
function switchCategory(e) {
  const categorySelected = e.target.innerText.toLowerCase();
  for (const item of newArrivals) {
    if (
      categorySelected === "all" ||
      item.dataset.category.includes(categorySelected)
    ) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
  for (const catBtn of categoryBtns) {
    catBtn.classList.remove("selected");
  }
  e.target.classList.add("selected");
}

// add event listeners to category buttons
for (const catBtn of categoryBtns) {
  catBtn.addEventListener("click", switchCategory);
}
