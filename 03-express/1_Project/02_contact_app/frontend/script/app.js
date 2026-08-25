
const app = {

    statusTimer :null,

    // TARGET ELEMENTS
    form: document.querySelector("#register-form"),
    userName: document.querySelector("#name"),
    userEmail: document.querySelector("#email"),
    userPassword: document.querySelector("#password"),
    errorBox: document.querySelector("#errorBox"),


    // SHOW STATUS
    showStatus :function(msg, color){
        if(this.statusTimer) clearTimeout(this.statusTimer);

        this.errorBox.innerText = msg;
        this.errorBox.style.color = color;
        this.errorBox.classList.add('show');

        this.statusTimer = setTimeout(() => {
            this.errorBox.innerHTML = "";
            this.errorBox.classList.remove("show");
            this.statusTimer = null
        }, 3000);
    },

    // INIT FUNCTION 
    init: function () {

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.userRegister();
        });
    },

    // REGISTER FUNCTION 
    userRegister: async function () {
        const name = this.userName.value.trim();
        const email = this.userEmail.value.trim();
        const password = this.userPassword.value.trim();

        // Previous UI message clear karo
        this.errorBox.innerText = "";

        try {

            const response = await fetch(`http://localhost:8000/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });


            const data = await response.json();


            // Backend Express Validator Error Handling 
            if (!response.ok) {
                if (data.errors && data.errors.length > 0) {
                    const errorMessages = data.errors.map(err => err.message).join(" | ");
                    this.showStatus(`⚠ ${errorMessages}`, 'red');
                } else {
                    this.showStatus(`⚠ ${data.message || 'Registrain Failed'}`,'red');
                }
                return
                
            }

            // 2. Success Handling (201 Created)
            this.showStatus(`${data.message || 'User registered successfully!'}`, 'green')
            this.form.reset();

        } catch (error) {
            console.error('Errors: ' ,error.message)
            this.showStatus("⚠ Server unavailable or Network error!","red");
        }

    }
};

app.init();