let currentDateEl = $("#current-date");
let currentTimeEl = $("#current-time");
let formSubmitEl = $("#form-submit");
let projectNameEl = $("#project-name");
let projectTypeEl = $("#project-type");
let projectDateEl = $("#project-date");
let projectDescEl = $("#project-description");

function setTime() {
  let timerInterval = setInterval(function () {
    let today = dayjs();
    currentDateEl.text(today.format("MMMM D, YYYY"));
    currentTimeEl.text(today.format("hh:mm:ss a"));
  }, 1000);
}

function clearModal(){
    projectNameEl.text('');
    projectNameEl.text('');
    projectNameEl.text('');
    projectNameEl.text('');
}

function handleFormSubmit(event) {
  let newProject = {
    name: projectNameEl.val(),
    type: projectTypeEl.val(),
    date: projectDateEl.val(),
    description: projectDescEl.val(),
  };

  let projects = JSON.parse(localStorage.getItem("projects"));
  projects.push(newProject);

  localStorage.setItem("projects", JSON.stringify(projects));

  clearModal();
}

function setUpLocalStorage() {
  if (localStorage.getItem("projects") === null) {
    localStorage.setItem("projects", JSON.stringify([]));
  }
}

setTime();
setUpLocalStorage();

formSubmitEl.on("click", handleFormSubmit);
