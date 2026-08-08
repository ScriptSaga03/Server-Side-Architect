const usersList = [
    { email: "mehtab@example.com", password: "password123", name: "Mehtab Ansari" },
    { email: "test@gmail.com", password: "123456", name: "Test User" }
];

const app = {
    users: [...usersList],
    timer: null,

    // TARGET ELEMENTS (Corrected selectors)
    authForm: document.querySelector(".auth-form"),
    emailInput: document.querySelector("#login-email"),
    passInput: document.querySelector("#login-pass"),
    notify: document.querySelector(".status-msg"),
    rememberCheckbox: document.querySelector('input[name="remember"]'),

    // Delay helper 
    delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

    // SHOW STATUS MSG FUNCTION 
    showNotification: function (msg, color) {
        if (this.timer) clearTimeout(this.timer);

        this.notify.textContent = msg;
        this.notify.style.color = color;
        this.notify.classList.add('add');

        this.timer = setTimeout(() => {
            this.notify.textContent = "";
            this.notify.classList.remove('add');
            this.timer = null;
        }, 3000);
    },

    init: function () {
        this.authForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    },

    handleLogin: async function () {
        try {
            // Correct inputs reading
            const email = this.emailInput.value.trim();
            const password = this.passInput.value.trim();

            if (!email || !password) {
                this.showNotification("⚠️ All fields are required!", "orange");
                return;
            }

            this.showNotification("⏳ Connecting to server...", "purple");

            const response = await fetch(`http://localhost:8000/notex/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            // Convert Response to JSON
            const data = await response.json();

            // Server Response Check (400/401/404 handling)
            if (!response.ok) {
                this.showNotification(`${data.message || 'Login Failed'}`, "red");
                return; // Stop execution here
            }

            // Success Flow
            this.showNotification("✔ Login Successful.", "green");
            const isRememberMe = this.rememberCheckbox.checked;

            if (data.token) {
                if(isRememberMe){
                    localStorage.setItem('authToken', data.token)
                }else{
                    sessionStorage.setItem('authToken', data.token)
                }
            }
            if (data.user) {
                sessionStorage.setItem('activeUser', JSON.stringify(data.user));
            }

            this.authForm.reset()
            // await this.delay(1500);
            // window.location.href = "dashboard.html";

        } catch (error) {
            console.error("Login Error:", error);
            this.showNotification("❌ Server down or connection is not established!", "red");
        }
    }
};

app.init();