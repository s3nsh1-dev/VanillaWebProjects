import fetchingData from "./fetching/fetchPrimary";

const callApiButton = document.querySelector("#make-api-call");
callApiButton!.addEventListener("click", fetchingData);
