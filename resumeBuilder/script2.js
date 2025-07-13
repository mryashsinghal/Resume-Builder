//Creating tour for Resume Page using Shepherd Library
const tour = new Shepherd.Tour({
<<<<<<< HEAD
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
    classes: "shepherd-theme-default",
    scrollTo: { behavior: "smooth", block: "center" },
  },
=======
    defaultStepOptions: {
        cancelIcon: {
            enabled: true,
        },
        classes: 'shepherd-theme-default',
        scrollTo: { behavior: 'smooth', block: 'center' }
    },
 
>>>>>>> upstream/main
});

//Helper function to add Skip button to steps
function getStepButtons(hasNext, hasBack) {
    const buttons = [];
    if (hasBack) {
        buttons.push({
            action() { return this.back(); },
            classes: 'shepherd-button-secondary',
            text: 'Back',
        });
    }
    if (hasNext) {
        buttons.push({
            action() { return this.next(); },
            text: 'Next',
        });
    }
    // Add Skip button to all but last step
    buttons.push({
        action() { return this.cancel(); },
        classes: 'shepherd-button-secondary',
        text: 'Skip',
    });
    return buttons;
}

//Clear previous steps
if (tour.steps) tour.steps = [];

tour.addStep({
  title: "Welcome to the Resume Page",
  text: "Fill Out Your Personal And Professional Details",
  attachTo: {
    element: ".main-body",
    on: "top",
  },
  buttons: [
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
<<<<<<< HEAD
  ],
=======
    buttons: getStepButtons(true, false),
>>>>>>> upstream/main
});

tour.addStep({
  title: "Name..",
  text: "Type Your Full Name Here",
  attachTo: {
    element: ".name",
    on: "bottom",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
<<<<<<< HEAD
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
=======
    buttons: getStepButtons(true, true),
>>>>>>> upstream/main
});

tour.addStep({
  title: "Adding Skill",
  text: "Click Here To Add Skills",
  attachTo: {
    element: ".add-skill",
    on: "bottom",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
<<<<<<< HEAD
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
=======
    buttons: getStepButtons(true, true),
>>>>>>> upstream/main
});

tour.addStep({
  title: "Removing Skill",
  text: "Click Here To Remove A Skill",
  attachTo: {
    element: ".remove-skill",
    on: "bottom",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
<<<<<<< HEAD
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
=======
    buttons: getStepButtons(true, true),
>>>>>>> upstream/main
});

tour.addStep({
  title: "Downloading",
  text: "Click Here To Download Your Resume",
  attachTo: {
    element: ".download",
    on: "right",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
<<<<<<< HEAD
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
=======
    buttons: getStepButtons(true, true),
>>>>>>> upstream/main
});

tour.addStep({
  title: "Documenting",
  text: "Click Here To Document Your Resume",
  attachTo: {
    element: ".document",
    on: "right",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
<<<<<<< HEAD
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
=======
    buttons: getStepButtons(true, true),
>>>>>>> upstream/main
});

tour.addStep({
  title: "Home Page",
  text: "Click Here To Navigate To Home Page",
  attachTo: {
    element: ".home",
    on: "right",
  },
  buttons: [
    {
      action() {
        return this.back();
      },
      classes: "shepherd-button-secondary",
      text: "Back",
    },
<<<<<<< HEAD
    {
      action() {
        return this.next();
      },
      text: "Got it",
    },
  ],
=======
    buttons: [
        {
            action() { return this.back(); },
            classes: 'shepherd-button-secondary',
            text: 'Back',
        },
        {
            action() { return this.cancel(); },
            classes: 'shepherd-button-secondary',
            text: 'Skip',
        },
        {
            action() { return this.next(); },
            text: 'Got it',
        },
    ],
>>>>>>> upstream/main
});

// Starting the tour on page load
window.onload = () => {
  tour.start();
};


function saveResume() {
  const resumeData = {};

  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]'
  );
  resumeData.editables = Array.from(editableElements).map((el) => el.innerHTML);

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  resumeData.checkboxes = Array.from(checkboxes).map((cb) => cb.checked);

  localStorage.setItem("resumeData", JSON.stringify(resumeData));
}

function loadResume() {
  const savedData = localStorage.getItem("resumeData");
  if (!savedData) return;

  const resumeData = JSON.parse(savedData);
  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]'
  );

  resumeData.editables.forEach((val, i) => {
    if (editableElements[i]) {
      editableElements[i].innerHTML = val;
    }
  });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  resumeData.checkboxes.forEach((val, i) => {
    if (checkboxes[i]) {
      checkboxes[i].checked = val;
    }
  });
}

function printpdf() {
  var content = document.getElementById("resume");

function printpdf() {
    const token = localStorage.getItem("token");
    var content = document.getElementById("resume");


  const allButtons = document.querySelectorAll("#print button");
  allButtons.forEach((button) => {
    button.classList.add("none");
  });
  let allInputCheckboxes = document.querySelectorAll(".input-checkbox");
  allInputCheckboxes.forEach((input) => {
    input.classList.add("none");
  });

  allButtons.forEach((button) => {
    button.classList.remove("none");
  });
  allInputCheckboxes.forEach((input) => {
    input.classList.remove("none");
  });

<<<<<<< HEAD
  html2pdf(content, {
    html2canvas: { scale: 1, logging: true, dpi: 500 },
  });
=======
     if (token === null) {
        alert("Please login to download your resume!");
        return;
    }
    else{
        html2pdf(content, {
            html2canvas: { scale: 1, logging: true, dpi: 500 }
        });
    }
>>>>>>> upstream/main
}

function addedu() {
  const head = document.createElement("div");
  document.getElementById("education").appendChild(head);
  head.innerHTML =
    '<div class="edublock"><span><input type="checkbox" class="input-checkbox"></span><span class="education-head" contenteditable="true">YOUR DEGREE</span><div ><span contenteditable="true">Institute name</span> - <span contenteditable="true">Passing Year</span></div></div>';
  saveresume();
}
function remedu(event) {
  let val = 0;
  let empty = true;
  const allInputCheckboxes =
    event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
    alert("No fields are present to be deleted!");
  } else {
    console.log(array);
    array.forEach((element) => {
      if (element.checked === true) {
        val = 1;
        element.parentElement.parentElement.remove();
      }
    });
    if (val === 0)
      alert("Please select the checkboxes to delete the required field!");
  }
  saveresume();
}

function addskill() {
  const head = document.createElement("div");
  document.getElementById("skills").appendChild(head);
  head.innerHTML =
    '<div class="skill"><span><input type="checkbox" class="input-checkbox"></span><span><i class="fas fa-chevron-circle-right"></i></span>   <span contenteditable="true">write your skill here</span></div>';
  saveresume();
}

function remskill(event) {
  let val = 0;
  const allInputCheckboxes =
    event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
    alert("No fields are present to be deleted!");
  } else {
    console.log(array);
    array.forEach((element) => {
      if (element.checked === true) {
        val = 1;
        element.parentElement.parentElement.remove();
      }
    });
    if (val === 0)
      alert("Please select the checkboxes to delete the required field!");
  }
  saveresume();
}

function addLang() {
  const head = document.createElement("div");
  document.getElementById("languages").appendChild(head);
  head.innerHTML =
    '<div class="language"><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">LANGNAME</span> - <span contenteditable="true">level u know</span></div>';
  saveresume();
}
function remLang(event) {
  let val = 0;
  const allInputCheckboxes =
    event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
    alert("No fields are present to be deleted!");
  } else {
    console.log(array);
    array.forEach((element) => {
      if (element.checked === true) {
        val = 1;
        element.parentElement.parentElement.remove();
      }
    });
    if (val === 0)
      alert("Please select the checkboxes to delete the required field!");
  }
  saveresume();
}

function addAch() {
  const head = document.createElement("div");
  document.getElementById("achievement").appendChild(head);
  head.innerHTML =
    '<div class="achieve" ><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Write your achievement</span></div>';
  saveresume();
}
function remAch(event) {
  let val = 0;
  const allInputCheckboxes =
    event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
    alert("No fields are present to be deleted!");
  } else {
    console.log(array);
    array.forEach((element) => {
      if (element.checked === true) {
        val = 1;
        element.parentElement.parentElement.remove();
      }
    });
    if (val === 0)
      alert("Please select the checkboxes to delete the required field!");
  }
  saveresume();
}

function addInt() {
  const head = document.createElement("div");
  document.getElementById("interest").appendChild(head);
  head.innerHTML =
    '<div class="achieve" ><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Write interest</span></div>';
  saveresume();
}
function remInt(event) {
  let val = 0;
  const allInputCheckboxes =
    event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
    alert("No fields are present to be deleted!");
  } else {
    array.forEach((element) => {
      if (element.checked === true) {
        val = 1;
        element.parentElement.parentElement.remove();
      }
    });
    if (val === 0)
      alert("Please select the checkboxes to delete the required field!");
  }
  saveresume();
}

let maxNewSection = 1;
function addsec() {
  if (maxNewSection < 2) {
    const head = document.createElement("div");
    document.getElementById("newsec").appendChild(head);
    if (maxNewSection === 0) {
      head.innerHTML =
        '<div><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">NEW SECTION</span><br><br><div contenteditable="true">This is the description part of your new section. Try to stay within limit and write something which has less than 400 characters. The spaces and symbols you use will also be included so use them for an indentation effect.</div></div>';
    } else {
      head.innerHTML =
        '<div><br><br><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">NEW SECTION</span><br><br><div contenteditable="true">This is the description part of your new section. Try to stay within limit and write something which has less than 400 characters. The spaces and symbols you use will also be included so use them for an indentation effect.</div></div>';
    }

    maxNewSection = maxNewSection + 1;
  } else {
    alert("Atmost 2 NEW SECTION can be added!");
  }
  saveresume();
}
function remsec(event) {
  let val = 0;
  const allInputCheckboxes =
    event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
    alert("No fields are present to be deleted!");
  } else {
    console.log(array);
    array.forEach((element) => {
      if (element.checked === true) {
        val = 1;
        maxNewSection = maxNewSection - 1;
        element.parentElement.parentElement.remove();
      }
    });
    if (val === 0)
      alert("Please select the checkboxes to delete the required field!");
  }
  saveresume();
}

function saveresume() {
  var sec = document.getElementById("print");
  value1 = sec.innerHTML;
  var info = document.getElementById("custinfo");
  info.value = value1;
}

window.onload = loadResume;
