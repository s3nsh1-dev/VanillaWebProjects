// importing details of buttons saved as Array of objects and sound effects
import { logicBtn, formulaBtn, mechBtn, normNumBtn } from "./constants.js";
import {
  onSound,
  offSound,
  clearSound,
  clickSound,
  backspaceSound,
  resultSound,
  errorSound,
} from "./constants.js";
import { solveStringMathematically } from "./calculation-logic.js";

// parent node of buttons
const mechContainer = document.getElementById("mech-btn");
const formulaContainer = document.getElementById("formula");
const normNumContainer = document.getElementById("norm-num");
const logicContainer = document.getElementById("logic");
let stringValue = "";
let casioColor = false;
let previousInput = "";
let numSign = true;
let GTsum = 0;
let memoryValue = 0;

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
      // filterLogic() will evaluate the button & act based on its value'
      if (event.target.value === "GT") {
        event.target.addEventListener("dblclick", () => {
          GTsum = 0;
          console.log("GT = ", GTsum);
        });
      } else if (event.target.value === "MRC") {
        event.target.addEventListener("dblclick", () => {
          memoryValue = 0;
          console.log("Memory Value = ", memoryValue);
        });
      }
      filterLogic(event.target);
    });
  });
}, 100);

// calulator buttons are evaluated and processed inside filterLogic()
function filterLogic(pressedBtn) {
  if (pressedBtn.value !== "power" && casioColor) {
    switch (pressedBtn.value) {
      case "backspace":
        backspaceSound.play();
        stringValue = stringValue.slice(0, -1);
        console.log(
          `deleted value = ${previousInput}, current input = ${stringValue}`
        );
        break;

      case "clear":
        clearSound.play();
        stringValue = "";
        break;

      case "GT":
        setTimeout(() => {
          try {
            if (isNaN(GTsum)) {
              GTsum = 0;
            }
            let currentSum = Math.round(parseFloat(eval(stringValue)), 2);
            GTsum += currentSum;
          } catch (e) {
            errorSound.play();
            console.log(e.message);
          }
          console.log("GT = " + GTsum);
        }, 2000);
        break;

      case "MRC":
        console.log("Displaying =", memoryValue);
        break;

      case "sign change":
        numSign = !numSign;
        if (!numSign) {
          stringValue = "-" + stringValue;
          console.log("input:", stringValue);
        } else {
          stringValue = stringValue.replace("-", "");
          console.log("input:", stringValue);
        }
        break;

      case "root":
        stringValue = eval(`Math.sqrt(${stringValue})`);
        console.log("input:", stringValue);
        break;

      case "M+":
        memoryValue += stringValue;
        break;

      case "M-":
        memoryValue -= stringValue;
        break;

      case "equals":
        try {
          const result = "" + solveStringMathematically(stringValue);
          console.log("Result:", result);
          resultSound.play();
          stringValue = result;
        } catch (e) {
          stringValue = stringValue.slice(0, -1);
          console.error("Error evaluating expression:", e);
        }
        break;

      default:
        clickSound.play();
        stringValue += pressedBtn.value;
        console.log("input:", stringValue);
        break;
    }
    previousInput = pressedBtn.value;
  } else if (pressedBtn.value === "power") {
    casioColor = !casioColor;
    changeCasioColor(pressedBtn);
    stringValue = "";
    previousInput = "";
  }
}

function changeCasioColor(powerBtn) {
  const box = document.getElementById("casio");
  if (casioColor) {
    onSound.play();
    box.style.border = "2px solid green";
    box.style.color = "green";
    powerBtn.innerText = "OFF";
  } else {
    offSound.play();
    box.style.color = "red";
    box.style.border = "2px solid red";
    powerBtn.innerText = "ON";
  }
}
