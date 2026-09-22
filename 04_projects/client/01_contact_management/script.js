/**
 * 🔒 AUTHENTICATION APP MODULE (Object Pattern)
 */
const AuthApp = {
  // 1. CONFIGURATION & STATE
  config: {
    baseUrl: "http://localhost:8000/api/v1/auth",
  },

  state: {
    userEmailForOtp: "",
    statusTimer: null,
  },

  // 2. DOM ELEMENTS CACHE
  elements: {
    signUpForm: document.getElementById("signUpForm"),
    signInForm: document.getElementById("signInForm"),
    otpForm: document.getElementById("otpForm"),
    otpInput: document.getElementById("loginOtp"),
    statusMsg: document.getElementById("showErrors"),
  },

  //   3. Show status
  showStatus(msg, color) {
    if (!this.state.statusTimer) return;

    // Kill old active timer
    if (this.state.statusTimer) {
      clearTimeout(this.state.statusTimer);
    }

    // UI Updates
    this.elements.statusMsg.innerText = msg;
    this.elements.statusMsg.style.color = color;
    this.elements.statusMsg.classList.add("show");

    // Clear after 3 sec
    this.state.statusTimer = setTimeout(() => {
      this.elements.statusMsg.innerText = "";
      this.elements.statusMsg.classList.remove("show");
      this.state.statusTimer = null;
    }, 3000);
  },

  //   4. App Initialization Method
  init() {
    this.bindEvents();
  },

  // 5.  Bind Events
  bindEvents() {
    if (this.elements.signUpForm) {
      this.elements.signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSignUp()
      });
    }

    if (this.elements.signInForm) {
      this.elements.signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
      });
    }

    if (this.elements.otpForm) {
      this.elements.otpForm.addEventListener("submit", (e) => {
        e.preventDefault();
      });
    }
  },

  //   6. CENTRALIZED API REQUEST ENGINE
  async apiRequest(endPoint, method = "GET", bodyData = null) {
    // Request SetUP
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    // If request payload exists, convert js obj to json string
    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    }

    try {
      const response = await fetch(
        `${this.config.baseUrl}${endPoint}`,
        options,
      );
      const result = await response.json();

      // HTTP Error code check 4xx 5xx
      if (!response.ok) {
        const errorMessage = result.message || result.error || result.msg || "Validation Failed!";
        throw new Error(errorMessage);
      }

      // E. Success Response
      return result;
    } catch (error) {
      // F. Catch and rethrow to handle in UI form layer
      throw error;
    }
  },

  //   6. action handler
  async handleSignUp() {
    const formData = new FormData(this.elements.signUpForm);
    const payload = Object.fromEntries(formData.entries());
    console.log(payload);

    try {
      const result = await this.apiRequest("/register", "POST", payload);
      this.showStatus(result.message, false);
      this.elements.signUpForm.reset();

      setTimeout(() => {
        window.location.href = "./views/signIn.html";
      }, 1500);
    } catch (error) {
      this.showStatus(error.message, true);
    }
  },
};

// 🚀 START APPLICATION WHEN DOM IS READY
document.addEventListener("DOMContentLoaded", () => {
  AuthApp.init();
});
