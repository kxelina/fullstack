```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: write on the the textbox and press save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server->>server: save text to database
    deactivate server

    browser->>server: if ok, then GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: send upated json file from database
    deactivate server
    browser->>browser: update page with new data
```