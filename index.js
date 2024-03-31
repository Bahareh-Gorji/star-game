const numbersSection = document.querySelector(".numbers");

function createNumberBtn(numberOfBtns, parentEle) {
  for (let i = 1; i <= numberOfBtns; i++) {
    const buttonEle = document.createElement("button");
    buttonEle.innerText = i;
    buttonEle.classList.add("number-btn");

    parentEle.append(buttonEle);
  }
}

createNumberBtn(9, numbersSection);

let starsSection = document.querySelector(".stars");
let stars = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function createStars(parentEle) {
  let stars2 = [...stars];

  stars.forEach((star, index) => {
    stars.forEach((sstar, iindex) => {
      if (iindex > index) {
        let number = star + sstar;
        if (number <= 9) {
          stars2.push(number);
        }
      }
    });
  });

  const randomIndex = Math.floor(Math.random() * stars2.length);
  parentEle.innerHTML = "";
  for (let i = 1; i <= stars2[randomIndex]; i++) {
    const starEle = document.createElement("span");
    starEle.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="stars" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><polygon fill-rule="evenodd" points="12 16.667 5 22 8 14 2 9.5 9.5 9.5 12 2 14.5 9.5 22 9.5 16 14 19 22"></polygon></svg>`;

    parentEle.append(starEle);
  }
}
createStars(starsSection);

const numbersBtns = document.querySelectorAll(".number-btn");

numbersBtns.forEach((button) => {
  button.addEventListener("click", function abc() {
    let blueButtons = Array.from(
      document.querySelectorAll(".numbers button")
    ).filter((btn) => btn.style.background === "lightblue");

    let redButtons = Array.from(
      document.querySelectorAll(".numbers button")
    ).filter((btn) => btn.style.background === "firebrick");

    const numberOfStars = document.querySelectorAll(".stars span svg").length;

    const sum =
      blueButtons.reduce((sum, button) => sum + Number(button.innerText), 0) +
      Number(button.innerText);

    if (
      numberOfStars == button.innerText &&
      blueButtons.length === 0 &&
      redButtons.length === 0 &&
      button.style.background === ""
    ) {
      button.style.background = "limegreen";
      stars = stars.filter((item) => item !== numberOfStars);
      createStars(starsSection);
    } else if (
      numberOfStars < button.innerText &&
      blueButtons.length === 0 &&
      button.style.background === ""
    ) {
      button.style.background = "firebrick";
    } else {
      if (
        blueButtons.length === 0 &&
        button.innerText < numberOfStars &&
        button.style.background === ""
      ) {
        button.style.background = "lightblue";
      } else if (blueButtons.length !== 0 && button.style.background === "") {
        if (sum === numberOfStars) {
          button.style.background = "limegreen";
          blueButtons.forEach((btn) => (btn.style.background = "limegreen"));
          blueButtons.forEach((btn) => {
            stars = stars.filter((item) => item != btn.innerText);
          });
          stars = stars.filter((item) => item != button.innerText);

          createStars(starsSection);
        } else if (sum > numberOfStars) {
          button.style.background = "firebrick";
          blueButtons.forEach((btn) => (btn.style.background = "firebrick"));
        } else {
          button.style.background = "lightblue";
        }
      } else {
        if (button.style.background === "lightblue") {
          button.style.background = "";
        } else if (button.style.background === "firebrick") {
          redButtons.forEach((btn) => (btn.style.background = ""));
        }
      }
    }

    let greenButtons = Array.from(
      document.querySelectorAll(".numbers button")
    ).filter((btn) => btn.style.background === "limegreen");

    if (greenButtons.length === 9) {
      starsSection.innerHTML = `<span>YOU WON</span>
        <button onclick="reloadBtn()">Play Again</button>`;
      starsSection.style.color = "green";
      starsSection.style.fontSize = "20px";
      clearInterval(timer);
    }
  });
});

function reloadBtn() {
  location.reload();
}

const timerSection = document.querySelector(".timer span");
let time = 9;
const timer = setInterval(() => {
  timerSection.innerText = time;
  time--;
  if (
    time < 0 &&
    Array.from(document.querySelectorAll(".numbers button")).filter(
      (btn) => btn.style.background === "limegreen"
    ).length !== 9
  ) {
    clearInterval(timer);
    lose();
  }
}, 1000);

function lose() {
  starsSection.innerHTML = `<span>Game Over</span>
        <button onclick="reloadBtn()">Play Again</button>`;
  starsSection.style.color = "firebrick";
  starsSection.style.fontSize = "20px";
}
