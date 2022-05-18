const itemArr = document.querySelectorAll(".item");
const dropDown = document.querySelector(".drop-down");
const dropDownBtns = document.querySelectorAll(".drop-down button");
const gameconsoleBtnWindow = document.querySelector(".gameconsole-btn-window");
const currBtn = document.querySelector(".btn-text");

function showDropDown() {
  dropDown.style.display = "flex";
}

function hideDropDown() {
  dropDown.style.display = "none";
}

// show/hide drop-down on gameconsole-btn-window hover
gameconsoleBtnWindow.addEventListener("mouseenter", showDropDown);
gameconsoleBtnWindow.addEventListener("mouseleave", hideDropDown);

// event to trigger when filter category in drop-down clicked
function filterItems(e) {
  for (const item of itemArr) {
    const gameconsole = item.dataset.gameconsole;
    console.log(gameconsole);
    if (
      e.target.innerText === "View All" ||
      e.target.innerText === gameconsole
    ) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
  hideDropDown();
  currBtn.innerText = e.target.innerText;
  for (const btn of dropDownBtns) {
    console.log(currBtn.innerText);
    if (currBtn.innerText === btn.innerText) {
      btn.style.display = "none";
    } else {
      btn.style.display = "block";
    }
  }
}

// add event listeners to filter categories in drop-down
for (const btn of dropDownBtns) {
  btn.addEventListener("click", filterItems);
}
