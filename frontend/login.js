
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                console.log("Attempting login...");

                const response = await fetch("http://localhost:5001/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();
                console.log("Response Data:", data);

                if (response.ok) {
                    alert(data.message);
                    localStorage.setItem("token", data.token); 
                    console.log("Redirecting to dashboard...");
                    window.location.href = "dashboard.html";
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Login failed. Try again.");
            }
        });
    }
});

