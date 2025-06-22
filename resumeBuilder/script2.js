//Creating tour for Resume Page using Shepherd Library
const tour = new Shepherd.Tour({
    defaultStepOptions: {
        cancelIcon: {
            enabled: true,
        },
        classes: 'shepherd-theme-default',
        scrollTo: { behavior: 'smooth', block: 'center' }
    },
 
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
    title: 'Welcome to the Resume Page',
    text: 'Fill Out Your Personal And Professional Details',
    attachTo: {
        element: '.main-body',
        on: 'top',
    },
    buttons: getStepButtons(true, false),
});

tour.addStep({
    title: 'Name..',
    text: 'Type Your Full Name Here',
    attachTo: {
        element: '.name',
        on: 'bottom',
    },
    buttons: getStepButtons(true, true),
});

tour.addStep({
    title: 'Adding Skill',
    text: 'Click Here To Add Skills',
    attachTo: {
        element: '.add-skill',
        on: 'bottom',
    },
    buttons: getStepButtons(true, true),
});

tour.addStep({
    title: 'Removing Skill',
    text: 'Click Here To Remove A Skill',
    attachTo: {
        element: '.remove-skill',
        on: 'bottom',
    },
    buttons: getStepButtons(true, true),
});

tour.addStep({
    title: 'Downloading',
    text: 'Click Here To Download Your Resume',
    attachTo: {
        element: '.download',
        on: 'right',
    },
    buttons: getStepButtons(true, true),
});

tour.addStep({
    title: 'Documenting',
    text: 'Click Here To Document Your Resume',
    attachTo: {
        element: '.document',
        on: 'right',
    },
    buttons: getStepButtons(true, true),
});

tour.addStep({
    title: 'Home Page',
    text: 'Click Here To Navigate To Home Page',
    attachTo: {
        element: '.home',
        on: 'right',
    },
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
});

// Function to start tour manually
function startResumeTour() {
    tour.start();
}

// Function to create and add the tour button for resume page
function createResumeTourButton() {
    // Check if button already exists
    if (document.getElementById('start-resume-tour-btn')) {
        return;
    }

    const tourButton = document.createElement('button');
    tourButton.id = 'start-resume-tour-btn';
    tourButton.className = 'resume-tour-button';
    tourButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 9.5V6.5C15 5.67 14.33 5 13.5 5H10.5C9.67 5 9 5.67 9 6.5V9.5L3 7V9L9 11.5V22H15V11.5L21 9Z"/>
        </svg>
        Resume Tour
    `;
    tourButton.onclick = startResumeTour;

    // Add the button to the navigation area (using one of the existing nav buttons as reference)
    const existingNavBtn = document.querySelector('.navbtn');
    if (existingNavBtn && existingNavBtn.parentElement) {
        existingNavBtn.parentElement.appendChild(tourButton);
    } else {
        // Fallback: add to body if nav structure is different
        document.body.appendChild(tourButton);
    }
}

// Function to check if user is new to resume page
function isFirstTimeOnResumePage() {
    return !localStorage.getItem('hasSeenResumeTour');
}

// Function to mark user as having seen the resume tour
function markResumeTourAsSeen() {
    localStorage.setItem('hasSeenResumeTour', 'true');
}

// Function to show a subtle first-time user notification for resume page
function showFirstTimeResumeNotification() {
    // Create a subtle notification element
    const notification = document.createElement('div');
    notification.className = 'first-time-resume-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>📝 New to the resume editor? Take a quick tour!</span>
            <button class="notification-tour-btn" onclick="startResumeTour()">Start Tour</button>
            <button class="notification-dismiss" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 8000);
}

// Modified window.onload - no auto-start tour, just show notification for first-time users on resume page
window.onload = () => {
    // Create the tour button
    createResumeTourButton();

    // Show subtle notification for first-time users instead of auto-starting tour
    if (isFirstTimeOnResumePage()) {
        showFirstTimeResumeNotification();
        // Mark as seen when notification is shown
        markResumeTourAsSeen();
    }
};

function printpdf() {
    const token = localStorage.getItem("token");
    var content = document.getElementById("resume");

    const allButtons = document.querySelectorAll("#print button");
    allButtons.forEach(button => {
        button.classList.add("none");
    });
    let allInputCheckboxes = document.querySelectorAll(".input-checkbox");
    allInputCheckboxes.forEach(input => {
        input.classList.add("none");
    })

    allButtons.forEach(button => {
        button.classList.remove("none");
    })
    allInputCheckboxes.forEach(input => {
        input.classList.remove("none");
    })

     if (token === null) {
        alert("Please login to download your resume!");
        return;
    }
    else{
        html2pdf(content, {
            html2canvas: { scale: 1, logging: true, dpi: 500 }
        });
    }
}

function addedu() {
    const head = document.createElement('div');
    document.getElementById("education").appendChild(head);
    head.innerHTML = ('<div class="edublock"><span><input type="checkbox" class="input-checkbox"></span><span class="education-head" contenteditable="true">YOUR DEGREE</span><div ><span contenteditable="true">Institute name</span> - <span contenteditable="true">Passing Year</span></div></div>');
    saveresume();
}

function remedu(event) {
    let val = 0;
    let empty = true;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        console.log(array);
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
}

function addskill() {
    const head = document.createElement('div');
    document.getElementById("skills").appendChild(head);
    head.innerHTML = ('<div class="skill"><span><input type="checkbox" class="input-checkbox"></span><span><i class="fas fa-chevron-circle-right"></i></span>   <span contenteditable="true">write your skill here</span></div>');
    saveresume();
}

function remskill(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        console.log(array);
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
}

function addLang() {
    const head = document.createElement('div');
    document.getElementById("languages").appendChild(head);
    head.innerHTML = ('<div class="language"><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">LANGNAME</span> - <span contenteditable="true">level u know</span></div>');
    saveresume();
}

function remLang(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        console.log(array);
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
}

function addAch() {
    const head = document.createElement('div');
    document.getElementById("achievement").appendChild(head);
    head.innerHTML = ('<div class="achieve" ><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Write your achievement</span></div>');
    saveresume();
}

function remAch(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        console.log(array);
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
}

function addInt() {
    const head = document.createElement('div');
    document.getElementById("interest").appendChild(head);
    head.innerHTML = ('<div class="achieve" ><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Write interest</span></div>');
    saveresume();
}

function remInt(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
}

let maxNewSection = 1;
function addsec() {
    if (maxNewSection < 2) {
        const head = document.createElement('div');
        document.getElementById("newsec").appendChild(head);
        if (maxNewSection === 0) {
            head.innerHTML = ('<div><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">NEW SECTION</span><br><br><div contenteditable="true">This is the description part of your new section. Try to stay within limit and write something which has less than 400 characters. The spaces and symbols you use will also be included so use them for an indentation effect.</div></div>');
        }
        else {
            head.innerHTML = ('<div><br><br><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">NEW SECTION</span><br><br><div contenteditable="true">This is the description part of your new section. Try to stay within limit and write something which has less than 400 characters. The spaces and symbols you use will also be included so use them for an indentation effect.</div></div>');
        }

        maxNewSection = maxNewSection + 1;
    }
    else {
        alert("Atmost 2 NEW SECTION can be added!")

    }
    saveresume();
}

function remsec(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        alert("No fields are present to be deleted!")
    }
    else {
        console.log(array);
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                maxNewSection = maxNewSection - 1;
                element.parentElement.parentElement.remove();
            }
        })
        if (val === 0) alert("Please select the checkboxes to delete the required field!")
    }
    saveresume();
}

function saveresume() {
    var sec = document.getElementById("print");
    value1 = sec.innerHTML;
    var info = document.getElementById("custinfo");
    info.value = value1;
}

// Function to reset resume tour status (for testing or user preference)
function resetResumeTourStatus() {
    localStorage.removeItem('hasSeenResumeTour');
    location.reload();
}

// Add keyboard shortcut to reset tour (Ctrl+Shift+R for testing resume tour)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        resetResumeTourStatus();
    }
});