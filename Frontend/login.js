// login
document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault()

    // get inputs
    const emailInput = document.getElementById("email").value
    const passwordInput = document.getElementById("password").value


    // sending input to backend
    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput
            }),
        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem("authToken",data.token);
            alert(data.message);
            goBack()

        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error(error);
        alert("There was a problem connecting to the server.");
    }
});

document.getElementById("back-button").addEventListener("click", goBack);

function goBack() {
    window.location.href = "index.html";
}

