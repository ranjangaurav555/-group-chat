
const API_URL = "http://localhost:3000/api";


// ===============================
// ELEMENTS
// ===============================

const signupForm =
    document.getElementById("signupForm");

const loginForm =
    document.getElementById("loginForm");

const formTitle =
    document.getElementById("formTitle");

const formSubtitle =
    document.getElementById("formSubtitle");

const switchText =
    document.getElementById("switchText");

const switchButton =
    document.getElementById("switchButton");

const message =
    document.getElementById("message");


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);


    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁";

    }

}


// ===============================
// SWITCH LOGIN / SIGNUP
// ===============================

switchButton.addEventListener(
    "click",
    function () {

        message.textContent = "";

        if (loginForm.classList.contains("hidden")) {

            // SHOW LOGIN

            signupForm.classList.add("hidden");

            loginForm.classList.remove("hidden");

            formTitle.textContent =
                "Welcome Back";

            formSubtitle.textContent =
                "Login to your account";

            switchText.textContent =
                "Don't have an account?";

            switchButton.textContent =
                "Sign Up";

        } else {

            // SHOW SIGNUP

            loginForm.classList.add("hidden");

            signupForm.classList.remove("hidden");

            formTitle.textContent =
                "Create Account";

            formSubtitle.textContent =
                "Sign up to create your account";

            switchText.textContent =
                "Already have an account?";

            switchButton.textContent =
                "Login";

        }

    }
);


// ===============================
// SIGNUP
// ===============================

signupForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "signupName"
            ).value.trim();


        const email =
            document.getElementById(
                "signupEmail"
            ).value.trim();


        const phone =
            document.getElementById(
                "signupPhone"
            ).value.trim();


        const password =
            document.getElementById(
                "signupPassword"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;


        // PHONE VALIDATION

        if (!/^[0-9]{10}$/.test(phone)) {

            message.textContent =
                "Please enter a valid 10-digit phone number.";

            return;

        }


        // PASSWORD VALIDATION

        if (password.length < 6) {

            message.textContent =
                "Password must contain at least 6 characters.";

            return;

        }


        // CONFIRM PASSWORD

        if (password !== confirmPassword) {

            message.textContent =
                "Password and Confirm Password do not match.";

            return;

        }


        try {

            message.textContent =
                "Creating account...";


            // SEND DATA TO BACKEND

            const response =
                await fetch(
                    `${API_URL}/signup`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            name: name,

                            email: email,

                            phone: phone,

                            password: password

                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                message.textContent =
                    data.message ||
                    "Signup failed.";

                return;

            }


            message.textContent =
                "✓ Account created successfully!";


            signupForm.reset();


            // SWITCH TO LOGIN AFTER SIGNUP

            setTimeout(function () {

                signupForm.classList.add(
                    "hidden"
                );

                loginForm.classList.remove(
                    "hidden"
                );

                formTitle.textContent =
                    "Welcome Back";

                formSubtitle.textContent =
                    "Login to your account";

                switchText.textContent =
                    "Don't have an account?";

                switchButton.textContent =
                    "Sign Up";

            }, 1000);


        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to server.";

        }

    }
);


// login 

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const emailOrPhone =
        document.getElementById("loginUser").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    try {

        message.textContent = "Logging in...";

        const response = await fetch(
            `${API_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    emailOrPhone: emailOrPhone,
                    password: password
                })
            }
        );

        const data = await response.json();

        console.log("Login Response:", data);

        if (!response.ok) {

            message.textContent =
                data.message || "Login failed.";

            return;
        }

        // Save JWT token
        localStorage.setItem(
            "token",
            data.token
        );

        // Save user information
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        // Directly open Chat Window
        window.location.href = "/chat.html";

    } catch (error) {

        console.error("Login Error:", error);

        message.textContent =
            "Unable to connect to server.";
    }
});