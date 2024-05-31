export function solveStringMathematically(str = "15+00100-15+20/20") {
  const separatedValues = [];
  let temp = "";
  for (let i = 0; i < str.length; i++) {
    // convert string into array separating integer and logical opertors
    if (isFinite(str[i]) || str[i] === ".") {
      // when we ge t a decimal point or any finite number
      temp += str[i];
    } else if (!isFinite(str[i])) {
      //when we get a non-finite number
      separatedValues.push(Number(temp));
      separatedValues.push(str[i]);
      temp = "";
    }
    if (i == str.length - 1) {
      // last entry
      if (!isFinite(str[i])) {
        // when last entry in string
        separatedValues.push("inValidEnding");
      } else {
        // when last entry is number
        separatedValues.push(Number(temp));
        temp = "";
      }
    }
  }
  return calculate(separatedValues);
}

function calculate(separatedValues) {
  let totalValue = 0;
  if (separatedValues.includes("inValidEnding")) {
    // user Input is Invalid...!
    return undefined;
  } else {
    for (let i = 0; i <= separatedValues.length - 2; i++) {
      if (!isFinite(separatedValues[i]) && isFinite(separatedValues[i + 1])) {
        // current input is not string, next string is number
        switch (separatedValues[i]) {
          case "+":
            totalValue += separatedValues[i + 1];
            break;
          case "-":
            totalValue -= separatedValues[i + 1];
            break;
          case "*":
            totalValue *= separatedValues[i + 1];
            break;
          case "/":
            totalValue /= separatedValues[i + 1];
            break;
          case "√":
            totalValue = Math.sqrt(separatedValues[i + 1]);
            break;
          case "%":
            totalValue %= separatedValues[i + 1];
            break;
          default:
            console.log("Invalid Operator");
            break;
        }
      } else if (
        isFinite(separatedValues[i]) &&
        !(i == separatedValues.length - 1) &&
        i == 0
      ) {
        // first Entry
        totalValue = separatedValues[i];
      }
    }
  }
  return totalValue;
}
