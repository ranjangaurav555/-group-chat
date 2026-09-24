
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


let isLogin = false;


// SWITCH LOGIN / SIGNUP

switchButton.addEventListener("click", function () {

    isLogin = !isLogin;

    message.textContent = "";


    if (isLogin) {

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

});


// SIGNUP

signupForm.addEventListener(
    "submit",
    function (event) {

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


        // PASSWORD LENGTH

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


        // USER OBJECT

        const user = {

            name: name,

            email: email,

            phone: phone,

            password: password

        };


        // SAVE USER

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        message.textContent =
            "✓ Account created successfully!";


        signupForm.reset();

    }
);


// LOGIN

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const loginUser =
            document.getElementById(
                "loginUser"
            ).value.trim();


        const loginPassword =
            document.getElementById(
                "loginPassword"
            ).value;


        const savedUser =
            JSON.parse(
                localStorage.getItem("user")
            );


        if (!savedUser) {

            message.textContent =
                "No account found. Please sign up first.";

            return;
        }


        const userMatches =
            loginUser === savedUser.email ||
            loginUser === savedUser.phone;


        const passwordMatches =
            loginPassword === savedUser.password;


        if (
            userMatches &&
            passwordMatches
        ) {

            message.textContent =
                `✓ Login successful. Welcome ${savedUser.name}!`;

            loginForm.reset();

        } else {

            message.textContent =
                "Invalid email/phone or password.";

        }

    }
);

