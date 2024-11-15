import openai
import speech_recognition as sr
import sphinx
import pyttsx3

openai.api_key = 'sk-...pmsA'


def speak(audio):
    engine = pyttsx3.init()
    engine.say(audio)
    engine.runAndWait()

def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Say something!")
        audio = r.listen(source)

        #code snippet inspired from https://github.com/Uberi/speech_recognition/blob/master/examples/microphone_recognition.py
        try:
            speak(r.recognize_sphinx(audio))
        except sr.UnknownValueError:
            print("Could not understand audio")
        except sr.RequestError as e:
            print("Sphinx error; {0}".format(e))




if __name__ == "__main__":
    listen()


