document.getElementById("login").addEventListener("click", () => {window.location.href = "login.html"})
document.getElementById("signup").addEventListener("click", () => {window.location.href = "registration.html"})

function goBack() {
    window.location.href = "index.html";
}

document.getElementById("github-button").addEventListener("click", () => {  window.open('https://github.com/im23b-busere', '_blank');})
document.getElementById("voiceButton").addEventListener("click", () => {
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
                strings: [data.response],
                speed: 70,
                waitUntilVisible: true,
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
});