from groq import Groq
import speech_recognition as sr
import pyttsx3
from backend.key import key

groq_client = Groq(
    api_key = key
)


def speak(audio):
    engine = pyttsx3.init()
    engine.say(audio)
    engine.runAndWait()

def listen():
    while True:
        r = sr.Recognizer()
        with sr.Microphone() as source:
            print("Speak!")
            audio = r.listen(source)

            #code snippet inspired from https://github.com/Uberi/speech_recognition/blob/master/examples/microphone_recognition.py
            try:
                print("You: " + r.recognize_sphinx(audio))
                ask_AI(r.recognize_sphinx(audio))
            except sr.UnknownValueError:
                print("Could not understand audio")
            except sr.RequestError as e:
                print("Sphinx error; {0}".format(e))


def ask_AI(input):
    completion = groq_client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "user", "content": input}
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
    )
    ai_response = completion.choices[0].message.content
    print(f"AI Response: {ai_response}")
    speak(ai_response)


if __name__ == "__main__":
    listen()


