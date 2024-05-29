function solveStringMathematically(str = "19+00100-.111111") {
  const separatedValues = [];
  let temp = "";
  console.log(str.length);
  for (let i = 0; i < str.length; i++) {
    if (isFinite(str[i])) {
      temp += str[i];
    } else if (!isFinite(str[i])) {
      separatedValues.push(Number(temp));
      separatedValues.push(str[i]);
      temp = "";
    }
    if (i == str.length - 1) {
      separatedValues.push(Number(temp));
      temp = "";
    }
    console.log("i=", i, "and temp", temp);
  }
  const joined = separatedValues.join("");
  // using eval() is counted as not a good practice so we used another similar approach
  const result = new Function(`return ${joined}`)().toFixed(3);
  // const result = eval(joined).toFixed(3);
  console.log(result.includes("."));
}
solveStringMathematically();
