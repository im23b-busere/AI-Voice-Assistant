document.getElementById("voiceButton").addEventListener("click", () => {
    const recognizedTextElement = document.getElementById("recognizedText");
    const aiResponseElement = document.getElementById("aiResponse");


    // https://dev.to/devsmitra/convert-text-to-speech-in-javascript-using-speech-synthesis-api-223g
    function speak(dataResponse) {
        const utterance = new SpeechSynthesisUtterance(dataResponse);

        const voices = speechSynthesis.getVoices();
        utterance.voice = voices[0];

        speechSynthesis.speak(utterance);
    }


    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognizedTextElement.textContent = "Listening...";

    recognition.start();

    recognition.onresult = async (event) => {
        // Get input from the result
        const userInput = event.results[0][0].transcript;
        recognizedTextElement.textContent = `You said: ${userInput}`;

        // sending input to backend
        try {
            const response = await fetch("http://127.0.0.1:5000/voice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: userInput }),
            });

            const data = await response.json();

            aiResponseElement.textContent = `AI Response: ${data.response}`;
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