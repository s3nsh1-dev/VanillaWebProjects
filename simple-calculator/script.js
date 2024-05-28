import { logicBtn, formulaBtn, mechBtn, normNumBtn } from "./constants.js";

document.addEventListener("DOMContentLoaded", () => {
  // calling create functions with DOM load, to create button dynamically
  createMechButtons(mechBtn, mechBtn.length);
  createFormulaButtons(formulaBtn, formulaBtn.length);
  createNormNumButtons(normNumBtn, normNumBtn.length);
  createLogicButtons(logicBtn, logicBtn.length);
});

// create buttons as much as mechBtn Array length
function createMechButtons(btnAttributeArray, totalBtnCount) {
  const mechContainer = document.getElementById("mech-btn");
  for (let attribute of btnAttributeArray) {
    const newButton = buttonSkeleton(attribute);
    mechContainer.appendChild(newButton);
  }
}

// create buttons as much as formulaBtn Array length
function createFormulaButtons(btnAttributeArray, totalBtnCount) {
  const formulaContainer = document.getElementById("formula");
  for (let attribute of btnAttributeArray) {
    const newButton = buttonSkeleton(attribute);
    formulaContainer.appendChild(newButton);
  }
}

// create buttons as much as normNumBtn Array length
function createNormNumButtons(btnAttributeArray, totalBtnCount) {
  const normNumContainer = document.getElementById("norm-num");
  for (let attribute of btnAttributeArray) {
    const newButton = buttonSkeleton(attribute);
    normNumContainer.appendChild(newButton);
  }
}

// create buttons as much as logicBtn Array length
function createLogicButtons(btnAttributeArray, totalBtnCount) {
  const logicContainer = document.getElementById("logic");
  for (let attribute of btnAttributeArray) {
    const newButton = buttonSkeleton(attribute);
    logicBtn.appendChild(newButton);
  }
}

function buttonSkeleton({ class: classname, value, text }) {
  const calButton = document.createElement("button");
  calButton.innerText = text;
  calButton.setAttribute("class", classname);
  calButton.setAttribute("value", value);
  return calButton;
}
