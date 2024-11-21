
# KI Sprachassistent

Ein interaktiver KI-gestützter Sprachassistent, der natürliche Sprache versteht und mit text- und sprachbasierten Antworten reagiert. Dieses Projekt kombiniert ein Flask-Backend, eine AI-Integration mit **Groq**, und ein benutzerfreundliches HTML/CSS/JavaScript-Frontend.

<img src="https://github.com/user-attachments/assets/b834b4b1-59d8-46ec-958a-a1f6f74c61d2" alt="AI-Voice-Assistant-Screenshot" width="700"/>


## Inhaltsverzeichnis

- [Features](#features)
- [Anforderungen](#anforderungen)
- [Installation](#installation)
- [Technologien](#technologien)
- [Autor](#autor)



## Features

- **Spracheingabe**: Sprachbefehle werden erkannt und an die KI gesendet.  
- **KI-Antworten**: Intelligente Antworten werden von der KI generiert und zurückgegeben.  
- **Text-to-Speech**: KI-Antworten werden in Echtzeit vorgelesen.  
- **Geschlechterauswahl**: Wähle zwischen einer weiblichen oder männlichen Stimme.  
- **Benutzerfreundliches Frontend**: Intuitives Design mit Animationen und Ladeanzeige.  





## Anforderungen

### Backend
1. Python 3.8+
2. Installierte Abhängigkeiten:
   ```bash
   pip install -r requirements.txt
   ```
3. Eine **.env**-Datei mit deinem API-Schlüssel:
   ```
   API_KEY=dein_groq_api_schlüssel
   ```

### Frontend
1. Browser mit Unterstützung für Web Speech API.
2. Internetverbindung für die KI-API und externe JavaScript-Bibliotheken.



## Installation

1. **Backend starten**:
   ```bash
   cd backend
   python config.py
   ```
   Der Server läuft standardmäßig auf `http://127.0.0.1:5000`.

2. **Frontend öffnen**:
   Öffne die Datei `frontend/index.html` in deinem Browser.

3. **Spracheingabe starten**:
   Klicke auf "Ask AI" und sprich in dein Mikrofon.



## Technologien

- **Backend**: Python, Flask, Groq API
- **Frontend**: HTML, CSS, JavaScript, Web Speech API
- **Zusätzliche Bibliotheken**: Flask-CORS, dotenv, pyttsx3, TypeIt.js



## Autor

**[im23b-busere](https://github.com/im23b-busere)**  
Feedback oder Vorschläge? Öffne ein Issue oder erstelle einen Pull-Request!


