document.getElementById("voiceButton").addEventListener("click", () => {
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


        function getVoices(){
            const voices = speechSynthesis.getVoices();

            if (voices.length > 0) {
                 const englishVoice = voices.find(voice => voice.lang.startsWith("en"));
                utterance.voice = englishVoice;
                console.log(utterance.voice)
                speechSynthesis.speak(utterance);
            } else {
                setTimeout(getVoices,100)
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