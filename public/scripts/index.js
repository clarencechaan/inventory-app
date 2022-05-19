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

let durationObj;

// duration in seconds
function setDurationObj(duration) {
  const seconds = duration % 60;
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor((duration / 60 / 60) % 24);
  const days = Math.floor((duration / 60 / 60 / 24) % 7);
  durationObj = { days, hours, minutes, seconds, totalDuration: duration };
}

function setInitialDurationObj() {
  const now = new Date();
  const sunday = new Date();
  sunday.setDate(now.getDate() - now.getDay() + 7); // Make Sunday
  sunday.setHours(11); // Set 11am
  sunday.setMinutes(0);
  sunday.setSeconds(0);

  // duration in seconds
  const duration = Math.round(sunday - now) / 1000;
  setDurationObj(duration);
}

function tickTimer() {
  const duration =
    durationObj.totalDuration > 0 ? durationObj.totalDuration - 1 : 0;
  setDurationObj(duration);
}

function setTimerElem() {
  const daysElem = document.querySelector(".count.day");
  const hoursElem = document.querySelector(".count.hour");
  const minutesElem = document.querySelector(".count.min");
  const secondsElem = document.querySelector(".count.sec");

  daysElem.innerText = durationObj.days;
  hoursElem.innerText = durationObj.hours;
  minutesElem.innerText = durationObj.minutes;
  secondsElem.innerText = durationObj.seconds;
}

function startTimer() {
  setInterval(() => {
    tickTimer();
    setTimerElem();
  }, 1000);
}

setInitialDurationObj();
setTimerElem();
startTimer();
