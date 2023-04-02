const lengthScroll = document.querySelector("#range");
const lengthDisplay = document.querySelector(".length-num");
const checkBoxes = document.querySelectorAll("[type=checkbox]");
const generate = document.querySelector(".mainbtn");
const password = document.querySelector("h1");
const lvl1 = document.querySelector(".one");
const lvl2 = document.querySelector(".two");
const lvl3 = document.querySelector(".three");
const lvl4 = document.querySelector(".four");
const copypasta = document.querySelector(".copy-paste");

/* variables */
let charLength = 5;
let passwordOutput;
let strengthLevel = 0;
const boxes = {
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
};
/* randoms variables needed */
const symbols = ["!", "@", "#", "$", "%", "^", "&", "*"];
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

window.addEventListener("DOMContentLoaded", () => {
  /* random num gen */
  function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  /* random symbols returned */
  function getSymbols() {
    let sym1 = randomNumber(0, symbols.length - 1);
    return symbols[sym1];
  }

  /* random letter */
  function getLetter() {
    let letter = randomNumber(0, alphabet.length - 1);
    return alphabet[letter];
  }

  function fisherShuffler(arr) {
    for (let i = 0; i < arr.length; i++) {
      let temp = arr[i];
      const randInt = randomNumber(0, arr.length - 1);
      arr[i] = arr[randInt];
      arr[randInt] = temp;
    }

    return arr;
  }

  function checkStrength() {
    if (strengthLevel >= 20 && strengthLevel < 40) {
      lvl1.style.backgroundColor = "yellow";
      lvl2.style.backgroundColor = "";
      lvl3.style.backgroundColor = "";
      lvl4.style.backgroundColor = "";
    } else if (strengthLevel >= 40 && strengthLevel < 60) {
      lvl1.style.backgroundColor = "yellow";
      lvl2.style.backgroundColor = "#ef9b0f";
      lvl3.style.backgroundColor = "";
      lvl4.style.backgroundColor = "";
    } else if (strengthLevel >= 60 && strengthLevel < 80) {
      lvl1.style.backgroundColor = "yellow";
      lvl2.style.backgroundColor = "#ef9b0f";
      lvl3.style.backgroundColor = "#ff726f";
      lvl4.style.backgroundColor = "";
    } else if (strengthLevel >= 80 && strengthLevel < 100) {
      lvl1.style.backgroundColor = "yellow";
      lvl2.style.backgroundColor = "#ef9b0f";
      lvl3.style.backgroundColor = "#ff726f";
      lvl4.style.backgroundColor = "red";
    }
  }

  function generateHandler(e) {
    e.preventDefault();
    let tempPass = [];
    Object.keys(boxes).forEach((index) => {
      console.log(boxes[index]);
      if (index === "uppercase" && boxes[index]) {
        let upper = getLetter().toString().toUpperCase();
        tempPass.push(upper);
      }
      if (index === "symbols" && boxes[index]) {
        let s1 = getSymbols();
        tempPass.push(s1);
      }
      if (index === "numbers" && boxes[index]) {
        let nums = randomNumber(0, 9);
        tempPass.push(nums);
      }
      if (index === "lowercase" && boxes[index]) {
        let lower = getLetter().toString();
        tempPass.push(lower);
      }
    });

    while (charLength >= tempPass.length + 1) {
      let lower = getLetter().toString();
      tempPass.push(lower);
    }

    console.log(tempPass);
    passwordOutput = fisherShuffler(tempPass);
    password.textContent = passwordOutput.join("");

    checkStrength();
  }

  /* changing character display */
  lengthScroll.addEventListener("change", function () {
    charLength = lengthScroll.value;
    lengthDisplay.textContent = charLength;
    checkStrength();
  });

  /* changing check box value */
  checkBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      Object.keys(boxes).forEach((index) => {
        if (box.id === index) {
          if (boxes[index]) {
            boxes[index] = false;
            strengthLevel -= 20;
          } else {
            boxes[index] = true;
            strengthLevel += 20;
          }
        }
      });
      checkStrength();
    });
  });

  generate.addEventListener("click", (e) => generateHandler(e));

  copypasta.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordOutput.join(""));
    copypasta.textContent = "✅";
    setTimeout(() => {
      copypasta.textContent = "📃";
    }, 1000);
  });
});

window.addEventListener("load", () => {
  checkBoxes.forEach((box) => {
    box.checked = false;
  });
  lengthScroll.value = 5;
});
