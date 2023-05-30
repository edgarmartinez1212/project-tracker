let currentDate = $("#current-date");
let currentTime = $("#current-time");

function setTime() {
  let timerInterval = setInterval(function () {
    let today = dayjs();
    currentDate.text(today.format("MMMM D, YYYY"));
    currentTime.text(today.format("hh:mm:ss a"));
  }, 1000);
}

setTime();
