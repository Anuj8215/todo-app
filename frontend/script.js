document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5001/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
         console.log("Response:", data);
        if (response.ok) {
            document.getElementById("message").textContent = "Signup successful! Redirecting...";
            document.getElementById("message").style.color = "green";
            setTimeout(() => window.location.href = "login.html", 2000);
        } else {
            document.getElementById("message").textContent = data.message || "Signup failed!";
            document.getElementById("message").style.color = "red";
        }
    } catch (error) {
        document.getElementById("message").textContent = "Network error! Please try again.";
        document.getElementById("message").style.color = "red";
    }
});

