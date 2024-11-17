document.getElementById("testConnection").addEventListener("click", async () => {
    const responseElement = document.getElementById("response");
    try {
        const response = await fetch("http://127.0.0.1:5000/");
        const data = await response.json();
        responseElement.textContent = data.message;
    } catch (error) {
        responseElement.textContent = "Fehler bei der Verbindung!";
        console.error("Error:", error);
    }
});
