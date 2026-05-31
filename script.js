document.addEventListener("DOMContentLoaded", init);

/*INITIALISATION */

function init() {

    console.log("JavaScript Loaded");

    // Registration Page
    const registrationForm =
        document.getElementById("registrationForm");

    if (registrationForm) {
        registrationForm.addEventListener(
            "submit",
            validateRegistration
        );
    }

    // Reservation Page
    const reservationForm =
        document.getElementById("reservationForm");

    if (reservationForm) {

        reservationForm.addEventListener(
            "submit",
            validateReservation
        );

        const paymentMethods =
            document.querySelectorAll(
                'input[name="paymentMethod"]'
            );

        paymentMethods.forEach(function (radio) {
            radio.addEventListener(
                "change",
                togglePaymentFields
            );
        });

        document
            .getElementById("sameEmailCheck")
            .addEventListener(
                "change",
                copyEmail
            );
            document
    .getElementById("resEmail")
    .addEventListener(
        "input",
        copyEmail
    );

        document
            .getElementById("restaurantSelect")
            .addEventListener(
                "change",
                updateDeposit
            );
    }
}

/* REGISTRATION VALIDATION */


function validateRegistration(event) {

    let errors = [];

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();
const password =
    document.getElementById("password").value.trim();

const confirmPassword =
    document.getElementById("confirmPassword").value.trim();

    const country =
        document.getElementById("country").value.trim();

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    // Username
    if (username === "") {
        errors.push("Username is required.");
    }
    else if (!/^[A-Za-z0-9_]{5,}$/.test(username)) {
        errors.push(
            "Username must be at least 5 characters and contain only letters, numbers and underscores."
        );
    }

    // Email
    if (email === "") {
        errors.push("Email address is required.");
    }
    else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        errors.push("Please enter a valid email address.");
    }

    // Phone
    if (phone === "") {
        errors.push("Phone number is required.");
    }
    else if (!/^\d{8,15}$/.test(phone)) {
        errors.push(
            "Phone number must contain only digits and be between 8 and 15 digits."
        );
    }

   // Password
if (password === "") {
    errors.push("Password is required.");
}
else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/.test(password)
) {
    errors.push(
        "Password must be at least 10 characters and include uppercase, lowercase, number and special character."
    );
}

// Confirm Password
if (confirmPassword === "") {

    errors.push("Confirm Password is required.");

}
else {

    if (password !== confirmPassword) {

        errors.push("Passwords do not match.");

    }
}
    // Gender
    if (!gender) {
        errors.push("Please select a gender.");
    }

    // Country
    if (country === "") {
        errors.push("Country/Region is required.");
    }

    if (errors.length > 0) {

        event.preventDefault();

        displayErrors(
            "errorSummary",
            errors
        );
    }
}

/*RESERVATION VALIDATION */

function validateReservation(event) {

    let errors = [];

    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("resEmail").value.trim();

    const phone =
        document.getElementById("resPhone").value.trim();

    const restaurant =
        document.getElementById("restaurantSelect").value;

    const reservationDate =
        document.getElementById("resDate").value;

    const partySize =
        document.getElementById("partySize").value;

   let billingEmail =
    document.getElementById("billingEmail").value.trim();

const sameEmail =
    document.getElementById("sameEmailCheck");

if (sameEmail && sameEmail.checked) {
    billingEmail =
        document.getElementById("resEmail").value.trim();
      
}
}

    const paymentMethod =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );

    // Full Name
    if (fullName === "") {
        errors.push("Full Name is required.");
    }

    // Email
    if (email === "") {
        errors.push("Reservation email is required.");
    }
    else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        errors.push("Reservation email is invalid.");
    }

    // Phone
    if (phone === "") {
        errors.push("Phone number is required.");
    }
    else if (!/^\d{10,}$/.test(phone)) {
        errors.push(
            "Phone number must contain at least 10 digits."
        );
    }

    // Restaurant
    if (restaurant === "") {
        errors.push("Please select a restaurant.");
    }

    // Date
    if (reservationDate === "") {
        errors.push(
            "Reservation date and time is required."
        );
    }
    else {

        const selectedDate =
            new Date(reservationDate);

        const currentDate =
            new Date();

        if (selectedDate < currentDate) {
            errors.push(
                "Reservation date cannot be in the past."
            );
        }
    }

    // Party Size
    if (partySize === "") {
        errors.push(
            "Number of people is required."
        );
    }
    else if (parseInt(partySize) <= 0) {
        errors.push(
            "Number of people must be greater than 0."
        );
    }

    // Billing Email
    if (billingEmail === "") {
        errors.push(
            "Billing email is required."
        );
    }
    else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingEmail)
    ) {
        errors.push(
            "Billing email is invalid."
        );
    }

    // Payment Method
    if (!paymentMethod) {

        errors.push(
            "Please select a payment method."
        );

    } else {

        if (paymentMethod.value === "online") {

            const cardNumber =
                document.getElementById("cardNumber")
                .value.trim();

            if (cardNumber === "") {

                errors.push(
                    "Credit card number is required."
                );

            }
            else if (!/^\d+$/.test(cardNumber)) {

                errors.push(
                    "Credit card must contain digits only."
                );

            }
            else if (
                cardNumber.length !== 15 &&
                cardNumber.length !== 16
            ) {

                errors.push(
                    "Credit card must be 15 digits (Amex) or 16 digits (Visa/Mastercard)."
                );
            }
        }
    }

    if (errors.length > 0) {

        event.preventDefault();

        displayErrors(
            "reservationErrors",
            errors
        );
    }
}

/*ERROR DISPLAY*/

function displayErrors(boxId, errors) {

    const errorBox =
        document.getElementById(boxId);

    errorBox.innerHTML =
        "<strong>Please fix the following errors:</strong><br><br>" +
        errors.join("<br>");

    errorBox.classList.remove("hidden");

    alert(
        "Please fix the following errors:\n\n" +
        errors.join("\n")
    );
}

/*PAYMENT METHOD DISPLAY*/

function togglePaymentFields() {

    const payment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );

    if (!payment) return;

    const voucherSection =
        document.getElementById("voucherSection");

    const creditCardSection =
        document.getElementById("creditCardSection");

    if (payment.value === "voucher") {

        voucherSection.classList.remove("hidden");
        creditCardSection.classList.add("hidden");

    } else {

        creditCardSection.classList.remove("hidden");
        voucherSection.classList.add("hidden");
    }
}

/*SAME EMAIL CHECKBOX*/

function copyEmail() {

    const checkbox =
        document.getElementById("sameEmailCheck");

    const reservationEmail =
        document.getElementById("resEmail");

    const billingEmail =
        document.getElementById("billingEmail");

    if (checkbox.checked) {

        billingEmail.value =
            reservationEmail.value;

        billingEmail.readOnly = true;

    } else {

        billingEmail.readOnly = false;
        billingEmail.value = "";
    }
}

