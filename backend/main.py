from groq import Groq
import pyttsx3
from dotenv import load_dotenv
import os

from openai import OpenAI

# import speech_recognition as sr
load_dotenv()
api_key = os.getenv('API_KEY')
secret_key = os.getenv('SECRET_KEY')

client = OpenAI(
    api_key=api_key
)

# not needed anymore. handled by frontend now
""" 
def speak(audio):
    engine = pyttsx3.init()
    engine.say(audio)
    engine.runAndWait()


def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Speak!")
        audio = r.listen(source)

        # code snippet inspired from https://github.com/Uberi/speech_recognition/blob/master/examples/microphone_recognition.py
        try:
            print("You: " + r.recognize_sphinx(audio))
            ask_AI(r.recognize_sphinx(audio))
        except sr.UnknownValueError:
            print("Could not understand audio")
        except sr.RequestError as e:
            print("Sphinx error; {0}".format(e))
            
"""


def ask_ai(input):
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": input
            }
        ]
    )
    ai_response = completion.choices[0].message.content
    return ai_response
