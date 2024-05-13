setInterval(() => {
  const dateTime = new Date();

  hourTime = dateTime.getHours();
  minTime = dateTime.getMinutes();
  secTime = dateTime.getSeconds();

  hourRotation = 30 * hourTime + minTime / 2;
  minRotation = 6 * minTime;
  secRotation = 6 * secTime;

  document.getElementById(
    "hour"
  ).style.transform = `rotate(${hourRotation}deg)`;
  document.getElementById(
    "minute"
  ).style.transform = `rotate(${minRotation}deg)`;
  document.getElementById(
    "second"
  ).style.transform = `rotate(${secRotation}deg)`;
}, 1000);
// its transform not transition to rotate and must use transform-origin  = bottom to move from bottom as center
// and its rotate({value}deg) not rotate({value})deg
