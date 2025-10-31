// =========================
// VARIABLES
// =========================
let fstName, secName, dep, user, pass, confPass, email, contact;
const pattern = /@gmail\.com/;


// =========================
// BOOTSTRAP TOOLTIPS
// =========================
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// =========================
// NAME VALIDATION
// =========================
function nameCheck(value) {
    if (value.length > 14) {
        const nameModal = new bootstrap.Modal(document.getElementById('nameModal'));
        nameModal.show();
    }
}

// =========================
// PASSWORD LENGTH CHECK
// =========================
function passCheck(value) {
    if (value.length > 7) {
        const passModal = new bootstrap.Modal(document.getElementById('passModal'));
        passModal.show();
    }
}

// =========================
// PASSWORD STRENGTH CHECK
// =========================
function valueCheck() {
    const symbols = /[^a-zA-Z0-9]/;
    const numbers = /\d/;
    const pass = document.getElementById('pass').value;

    if (!(numbers.test(pass) && symbols.test(pass) && pass !== "")) {
        const warningModal = new bootstrap.Modal(document.getElementById('warningModal'));
        warningModal.show();
    }
}

// =========================
// MAIN VALIDATION FUNCTION
// =========================
function validation(event) {
    event.preventDefault();

    // Get all form values
    fstName = document.getElementById("first_name").value.trim();
    secName = document.getElementById("second_name").value.trim();
    dep = document.getElementById("dep").value;
    user = document.getElementById("user").value.trim();
    pass = document.getElementById("pass").value;
    confPass = document.getElementById("conf_pass").value;
    email = document.getElementById("email").value.trim();
    contact = document.getElementById("contact").value.trim();

    // Limit contact number to 10 digits
    document.getElementById("contact").addEventListener("input", function () {
        if (this.value.length > 10) this.value = this.value.slice(0, 10);
    });

    // Validation tokens
    let tok01, tok02, tok03, tok04, tok06, tok07, tok08, tok09, tok10, tok11, tok12;

    // =========================
    // FIRST NAME
    // =========================
    if (fstName === "") {
        showError("fst_name_valid", "Enter the name!", "name_box");
        tok01 = false;
    } else {
        showSuccess("fst_name_valid", "name_box");
        tok01 = true;
    }

    // =========================
    // DEPARTMENT
    // =========================
    if (dep === "") {
        showError("dep_valid", "Select the department!", "dep_box");
        tok02 = false;
    } else {
        showSuccess("dep_valid", "dep_box");
        tok02 = true;
    }

    // =========================
    // USERNAME
    // =========================
    // USERNAME (already checked by API when user leaves field)
    if (user === "") {
        showError("user_valid", "Enter the username!", "user_box");
        tok03 = false;
    } else {
        tok03 = true; // API check will update visual feedback automatically
    }


    // =========================
    // PASSWORD
    // =========================
    if (pass === "") {
        showError("pass_valid", "Enter the password!", "pass_box");
        tok04 = false;
    } else {
        if (pass.length === 8) {
            showSuccess("pass_valid", "pass_box");
            tok04 = true;
        } else {
            showError("pass_valid", "8 characters required!", "pass_box");
            tok04 = false;
        }
    }

    // =========================
    // CONFIRM PASSWORD
    // =========================
    if (confPass === "") {
        showError("confPass_valid", "Enter the confirm password!", "confPass_box");
        tok06 = false;
    } else {
        if (confPass.length === 8) {
            tok07 = true;
            if (pass === confPass) {
                showSuccess("confPass_valid", "confPass_box");
                tok08 = true;
            } else {
                showError("confPass_valid", "Password does not match!", "confPass_box");
                tok08 = false;
            }
        } else {
            showError("confPass_valid", "8 characters required!", "confPass_box");
            tok07 = false;
        }
        tok06 = true;
    }

    // =========================
    // EMAIL VALIDATION
    // =========================
    if (email === "") {
        showError("email_valid", "Enter the email!", "email_box");
        tok09 = tok11 = false;
    } else {
        if (pattern.test(email)) {
            showSuccess("email_valid", "email_box");
            tok09 = tok11 = true;
        } else {
            showError("email_valid", "Enter a valid format!", "email_box");
            tok09 = tok11 = false;
        }
    }

    // =========================
    // CONTACT VALIDATION
    // =========================
    if (contact === "") {
        showError("contact_valid", "Enter the contact!", "contact_box");
        tok10 = tok12 = false;
    } else {
        showSuccess("contact_valid", "contact_box");
        tok10 = tok12 = true;
    }

    // =========================
    // SUCCESS CONDITION
    // =========================
    //if (tok01 && tok02 && tok03 && tok04 && tok06 && tok07 && tok08 && tok09 && tok10 && tok11 && tok12) {
    //    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    //    successModal.show();
    //}
    if (tok01 && tok02 && tok03 && tok04 && tok06 && tok07 && tok08 && tok09 && tok10 && tok11 && tok12) {
    // Basic validation passed — do nothing here.
    // handleSubmit() will perform final username + backend checks.
        return true;
    } else {
        return false;
    }
}

// =========================
// HELPER FUNCTIONS
// =========================
function showError(preId, message, boxId) {
    document.getElementById(preId).innerHTML = message;
    const box = document.getElementById(boxId);
    box.classList.add("rounded-5");
    box.style.borderBottom = "3px solid red";
}

function showSuccess(preId, boxId) {
    document.getElementById(preId).innerHTML = "";
    const box = document.getElementById(boxId);
    box.classList.add("rounded-5");
    box.style.borderBottom = "2px solid green";
}
