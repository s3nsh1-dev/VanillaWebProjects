// importing details of buttons saved as Array of objects
import { logicBtn, formulaBtn, mechBtn, normNumBtn } from "./constants.js";

// parent node of buttons
const mechContainer = document.getElementById("mech-btn");
const formulaContainer = document.getElementById("formula");
const normNumContainer = document.getElementById("norm-num");
const logicContainer = document.getElementById("logic");
let stringValue = "";
let casioColor = false;
let previousInput = "";

// calling createButtons() when DOM is loaded, to create buttons dynamically
document.addEventListener("DOMContentLoaded", () => {
  createButtons(mechBtn, mechContainer);
  createButtons(formulaBtn, formulaContainer);
  createButtons(normNumBtn, normNumContainer);
  createButtons(logicBtn, logicContainer);
});

// generic function to create buttons of all types
function createButtons(btnAttributeArray, btnContainer) {
  for (let attribute of btnAttributeArray) {
    const newButton = buttonSkeleton(attribute);
    btnContainer.appendChild(newButton);
  }
}

// buttons are created here
function buttonSkeleton({ class: classname, value, text }) {
  const calButton = document.createElement("button");
  calButton.innerText = text;
  calButton.setAttribute("class", classname);
  calButton.setAttribute("value", value);
  return calButton;
}

// setting event listener for all buttons
setTimeout(() => {
  const allButtons = document.getElementsByTagName("button");
  Array.from(allButtons).forEach((calculatorButton) => {
    calculatorButton.addEventListener("click", (event) => {
      // filterLogic() will evaluate the button & act based on its value
      filterLogic(event.target);
    });
  });
}, 100);

// calulator buttons are evaluated and processed inside filterLogic()
function filterLogic(pressedBtn) {
  if (pressedBtn.value === "equals") {
    try {
      console.log("Results = ", eval(stringValue));
      stringValue = "";
    } catch (e) {
      console.log(e.message);
    }
  } else if (pressedBtn.value == "backspace") {
    stringValue = stringValue.slice(0, -1);
    console.log(
      `deleted value = ${previousInput}, current input = ${stringValue}`
    );
  } else if (pressedBtn.value == "clear") {
    stringValue = "";
  } else if (pressedBtn.value === "power") {
    casioColor = !casioColor;
    stringValue = "";
    previousInput = "";
    changeCasioColor(pressedBtn);
  } else if (pressedBtn.value === "root") {
    stringValue = eval(`Math.sqrt(${stringValue})`);
    console.log("input:", stringValue);
  } else {
    stringValue += pressedBtn.value;
    console.log("input:", stringValue);
  }
  previousInput = pressedBtn.value;
}

function changeCasioColor(powerBtn) {
  const box = document.getElementById("casio");
  if (casioColor) {
    box.style.border = "2px solid green";
    box.style.color = "green";
    powerBtn.innerText = "OFF";
  } else {
    box.style.color = "red";
    box.style.border = "2px solid red";
    powerBtn.innerText = "ON";
  }
}
