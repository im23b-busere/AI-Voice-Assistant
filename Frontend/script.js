if (sessionStorage.getItem("authToken")!=null) {
    const loginButton = document.getElementById("login");
    const signupButton = document.getElementById("signup");
    const logoutButton = document.createElement("button");

// Replace "Log In" and "Sign Up" with "Log Out"
    loginButton.style.display = "none";
    signupButton.style.display = "none";

    const nav = document.querySelector(".popup-window ul"); // Your navigation container
    const logoutListItem = document.createElement("li");
    logoutListItem.appendChild(logoutButton);
    nav.appendChild(logoutListItem);

    logoutButton.id = "logout";
    logoutButton.innerHTML = `
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19 4v6.406l-3.753 3.741-6.463-6.462 3.7-3.685h6.516zm2-2h-12.388l1.497 1.5-4.171 4.167 9.291 9.291 4.161-4.193 1.61 1.623v-12.388zm-5 4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-1c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm6.708.292l-.708.708v3.097l2-2.065-1.292-1.74zm-12.675 9.294l-1.414 1.414h-2.619v2h-2v2h-2v-2.17l5.636-5.626-1.417-1.407-6.219 6.203v5h6v-2h2v-2h2l1.729-1.729-1.696-1.685z"
                ></path>
            </svg>
            <span>Log Out</span>
        `;
    // log out action
    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem("authToken");
        window.location.reload();
    });
}


// Github clicked
document.getElementById("github-button").addEventListener("click", () => {
    window.open('https://github.com/im23b-busere', '_blank');
})

// Ask AI button clicked
document.getElementById("voiceButton").addEventListener("click", () => {
    //check for token
    if (sessionStorage.getItem("authToken")) {
        speechSynthesis.cancel()
        const recognizedTextElement = document.getElementById("recognizedText");
        const aiResponseElement = document.getElementById("aiResponse");

        // loader from: https://uiverse.io/abrahamcalsin/breezy-panther-14
        function showLoader() {
            recognizedTextElement.innerHTML = `
            <div class="loaderRectangle">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        `;
        }

        function hideLoader() {
            recognizedTextElement.textContent = "";
        }

        // https://dev.to/devsmitra/convert-text-to-speech-in-javascript-using-speech-synthesis-api-223g
        function speak(dataResponse) {
            const utterance = new SpeechSynthesisUtterance(dataResponse);
            getVoices();


            function getVoices() {
                const voices = speechSynthesis.getVoices();

                // Check if voices are loaded
                if (voices.length > 0) {
                    const isFemale = document.getElementById('female').checked;
                    let selectedVoice;


                    // Find a voice that matches the selected gender
                    if (isFemale) {
                        selectedVoice = voices.find(voice => voice.name.includes('Susan') || voice.name.includes('Google UK English Female'));
                        console.log('selected voice:', selectedVoice);
                    } else {
                        selectedVoice = voices.find(voice => voice.name.includes('George') || voice.name.includes('Google UK English Male'));
                        console.log('selected voice:', selectedVoice);
                    }
                    console.log(selectedVoice);

                    if (selectedVoice) {
                        utterance.voice = selectedVoice;
                        console.log(`Selected voice: ${selectedVoice.name}`);
                        speechSynthesis.speak(utterance);
                    }
                } else {
                    setTimeout(getVoices, 100);
                }
            }
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        showLoader();

        recognition.start();

        recognition.onresult = async (event) => {
            // Get input from the result
            const userInput = event.results[0][0].transcript;
            hideLoader();
            recognizedTextElement.textContent = `You said: ${userInput}`;

            // sending input to backend
            try {
                const response = await fetch("http://127.0.0.1:5000/voice", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({input: userInput}),
                });

                const data = await response.json();

                aiResponseElement.innerHTML = `<strong>AI Response:</strong> <span id="animatedResponse"></span>`;

                // animate response using TypeIt library
                new TypeIt("#animatedResponse", {
                    strings: [data.response], speed: 70, waitUntilVisible: true,
                }).go();
                speak(data.response);

            } catch (err) {
                aiResponseElement.textContent = "Error connecting to the server.";
                console.error(err);
            }
        };


        recognition.onspeechend = () => {
            recognition.stop();
        };
    } else {
        alert("You must be logged in to use this feature.");
        window.location.href = "login.html"
    }
});


//login
document.getElementById("login").addEventListener("click", () => {
    window.location.href = "login.html"
})

//register
document.getElementById("signup").addEventListener("click", () => {
    window.location.href = "registration.html"
})

