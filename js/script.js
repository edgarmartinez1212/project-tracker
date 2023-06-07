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

// FIX
// updates projejcts form by refreshing
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

  location.reload();
}

// creates localstorage with key "projects"
function setUpLocalStorage() {
  if (localStorage.getItem("projects") === null) {
    localStorage.setItem("projects", JSON.stringify([]));
  }
}

// displays projects on #project-table, adds remove button to each project
function displayProjects() {
  let projectTableEl = $("#project-table");
  projectTableEl.children().remove();
  let projects = JSON.parse(localStorage.getItem("projects"));

  projects.forEach((project, i) => {
    let rowEl = $("<form>");
    let keys = Object.keys(project);

    keys.forEach((key) => {
      let colEl = $("<div>");
      colEl.text(project[key]);
      colEl.addClass("col");
      rowEl.append(colEl);
    });
    rowEl.addClass("row");
    let removeBtn = $("<button>");
    removeBtn.addClass("col btn btn-danger");
    removeBtn.text("Remove");
    removeBtn.attr("id", i);
    removeBtn.on("click", removeProject);
    rowEl.append(removeBtn);
    projectTableEl.append(rowEl);
  });
}

// need to remove element
function removeProject(event) {
  event.preventDefault();
  let toRemove = event.target.id;
  let projects = JSON.parse(localStorage.getItem("projects"));
  projects.splice(toRemove, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  displayProjects();
}

// initializes app
function init() {
  setTime();
  setUpLocalStorage();
  displayProjects();
}

init();
formSubmitEl.on("click", handleFormSubmit);
