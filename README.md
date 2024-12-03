
# KI Sprachassistent

Ein interaktiver KI-gestützter Sprachassistent, der natürliche Sprache versteht und mit text- und sprachbasierten Antworten reagiert. Dieses Projekt kombiniert ein Flask-Backend, eine AI-Integration mit **Groq**, Eine MySQL-Datenbank und ein benutzerfreundliches HTML/CSS/JavaScript-Frontend.

<img src="https://github.com/user-attachments/assets/75afa8ec-08cf-404d-b20d-7719a4b0d79d" alt="AI-Voice-Assistant-Screenshot" width="700"/>

## Inhaltsverzeichnis

- [Features](#features)
- [Anforderungen](#anforderungen)
- [Installation](#installation)
- [Technologien](#technologien)
- [CORS-Policy](#cors-policy)
- [Autor](#autor)



## Features

- **Spracheingabe**: Sprachbefehle werden erkannt und an die KI gesendet.  
- **KI-Antworten**: Intelligente Antworten werden von der KI generiert und zurückgegeben.  
- **Text-to-Speech**: KI-Antworten werden in Echtzeit vorgelesen.  
- **Geschlechterauswahl**: Wähle zwischen einer weiblichen oder männlichen Stimme.  
- **Benutzerfreundliches Frontend**: Intuitives Design mit Animationen und Ladeanzeige.
- **Benutzer-Authentifizierung:** Benutzer können (und müssen) sich registrieren und einloggen, um den Sprachassistenten zu nutzen.





## Anforderungen

### Backend
1. Python 3.8+
2. Installierte Abhängigkeiten:
   ```bash
   pip install -r requirements.txt
   ```
3. Eine **.env**-Datei mit deinem API-Schlüssel, deinem Datenbank-Passwort und deinem Decodierungs-Schlüssel:
   ```
   API_KEY=dein_groq_api_schlüssel

   DB_PW='dein_datebank_passowrt'
   
   SECRET_KEY='dein_erstellter_Schlüssel'
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

2. **MySQL-Datenbank einrichten**:
    Erstelle eine Datenbank und lade die benötigten Tabellen mithilfe der bereitgestellten SQL-Datei im `backend/database/` Ordner.
      ```bash
      mysql -u root -p < database_schema.sql
      ```

4. **Frontend öffnen**:
   Öffne die Datei `frontend/index.html` in deinem Browser.

5. **Spracheingabe starten**:
   Klicke auf "Ask AI" und sprich in dein Mikrofon.



## Technologien

- **Backend**: Python, Flask, Groq API
- **Frontend**: HTML, CSS, JavaScript, Web Speech API
- **Datenbank**: MySQL
- **Zusätzliche Bibliotheken**: Flask-CORS, dotenv, pyttsx3, TypeIt.js


## CORS-Policy
Falls du auf Probleme mit der CORS-Policy stösst (z. B. eine Fehlermeldung im Browser wie Blocked by CORS policy), kannst du diese durch die Verwendung eines Plugins lösen.
Wir empfehlen die "Access-Control-Allow-Origin"-Browsererweiterung, die auf https://webextension.org/listing/access-control.html verfügbar ist.

- **Installiere das Plugin:** Lade das Plugin herunter und aktiviere es in deinem Browser.
- **Freigabe aktivieren:** Stelle sicher, dass die CORS-Freigabe aktiv ist, wenn du die Anwendung ausführst.




## Autor

**[im23b-busere](https://github.com/im23b-busere)**  
Feedback oder Vorschläge? Öffne ein Issue oder erstelle einen Pull-Request!


