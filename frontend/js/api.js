// =========================
// API ENDPOINTS CONFIGURATION
// =========================
const BASE_URL = "http://localhost:5000/api"; // Update this if deployed (e.g., Render or Netlify)
let usernameAvailable = false;
// =========================
// 1️⃣ CHECK USERNAME AVAILABILITY (runs when user moves to next field)
// =========================
async function checkUsernameAvailability(username) {
    if (!username || username.trim() === "") {
        showError("user_valid", "Enter the username!", "user_box");
        usernameAvailable = false;
        return false;
    }

    try {
        document.getElementById("user_valid").innerHTML = "Checking availability...";
        document.getElementById("user_valid").classList.add("text-warning");

        const response = await fetch(`${BASE_URL}/validate-username`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        });

        const data = await response.json();

        if (!data.available) {
            const message = `Username already taken!`;
            showError("user_valid", message, "user_box");
            usernameAvailable = false;
            return false;
        } else {
            showSuccess("user_valid", "user_box");
            document.getElementById("user_valid").innerHTML = '<span class="text-success fw-bold">Username available ✓</span>';
            document.getElementById("user_valid").classList.remove("text-warning");
            document.getElementById("user_valid").classList.add("text-success");
            usernameAvailable = true;
            return true;
        }
    } catch (error) {
        console.error("Error checking username:", error);
        showError("user_valid", "Unable to verify username.", "user_box");
        usernameAvailable = false;
        return false;
    }
}



// =========================
// 2️⃣ SUBMIT FORM DATA
// =========================
async function submitFormToAPI(payload) {
    try {
        const response = await fetch(`${BASE_URL}/submit-form`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.success) {
            // Show success modal first
            const successModal = new bootstrap.Modal(document.getElementById("successModal"));
            successModal.show();

            // ✅ Add event listener for the OK button
            const closeBtn = document.querySelector("#successModal .btn-danger");
            closeBtn.addEventListener("click", () => {
                // Refresh page after user closes modal
                window.location.reload();
            });

            console.log("Form submitted successfully!");
        } else {
            // Show backend validation errors
            for (const field in data.errors) {
                const preId = `${field}_valid`;
                showError(preId, data.errors[field], `${field}_box`);
            }
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
}


// =========================
// 3️⃣ INTEGRATION WITH VALIDATION + USERNAME CHECK
// =========================
async function handleSubmit(event) {
    event.preventDefault();

    // First run client-side validation
    const isFormValid = validation(event);
    if (!isFormValid) {
        console.warn("Form validation failed — fix errors before submitting.");
        return;
    }

    // Check if username was already validated
    if (!usernameAvailable) {
        showError("user_valid", "Please choose a valid username before submitting.", "user_box");
        console.warn("Form not submitted — username unavailable.");
        return;
    }

    // Prepare form payload
    const payload = {
        fullName: document.getElementById("first_name").value + " " + document.getElementById("second_name").value,
        email: document.getElementById("email").value,
        username: document.getElementById("user").value,
        password: document.getElementById("pass").value,
        phone: document.getElementById("contact").value,
        department: document.getElementById("dep").value,
    };

    // Submit form only if usernameAvailable === true
    await submitFormToAPI(payload);
}

