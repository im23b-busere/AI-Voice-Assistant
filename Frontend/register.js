// registration
document.getElementById("regForm").addEventListener("submit", async (event) => {
    event.preventDefault()

    // get inputs
    const nameInput = document.getElementById("name").value
    const emailInput = document.getElementById("email").value
    const passwordInput = document.getElementById("password").value


    // sending input to backend
    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameInput,
                email: emailInput,
                password: passwordInput
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message)
            goBack();
        } else {
            alert("Fehler: " + data.error);
        }
    } catch (error) {
        console.error(error);
        alert("Es gab ein Problem mit der Verbindung zum Server.");
    }
})

//back button
document.getElementById("back-button").addEventListener("click", goBack);

function goBack() {
    window.location.href = "index.html";
}