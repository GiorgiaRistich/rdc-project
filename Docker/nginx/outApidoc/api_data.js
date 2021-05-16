define({ "api": [
  {
    "type": "post",
    "url": "/insertdisp",
    "title": "",
    "version": "1.0.0",
    "name": "InserisciDisponibilità",
    "group": "Inserisci_Disponibilità",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST http://localhost:3000/insertdisp\n\nbody: {\n    token: 'ExampleToken',\n    giorno: '04-13-2021',\n    orario: '08:00',\n    totdisponibilita: 5\n}",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token di autenticazione</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "giorno",
            "description": "<p>Data nuova disponibilità in formato americano (e.g. 04-13-2021)</p>"
          },
          {
            "group": "Parameter",
            "type": "Time",
            "optional": false,
            "field": "orario",
            "description": "<p>Orario nuova disponibilità</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "totdisponibilita",
            "description": "<p>Totale disponibilità per la data ed ora inserite</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "conferma",
            "description": "<p>Messaggio di conferma</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"conferma\": \"disponibilità inserita\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Errore di sintassi</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Token errato</p>"
          }
        ],
        "Error 409": [
          {
            "group": "Error 409",
            "optional": false,
            "field": "Conflict",
            "description": "<p>Disponibilità già presente in database</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Errore richiesta al database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 400:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errore\": \"passati parametri errati\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"errore\": \"token errato o mancante\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 409:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errore\": \"data e orario già presenti nel database\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 500:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"errore\": \"errore richiesta database\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "SourceApidoc/apisource.js",
    "groupTitle": "Inserisci_Disponibilità",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/insertdisp"
      }
    ]
  },
  {
    "type": "get",
    "url": "/logfile",
    "title": "",
    "version": "1.0.0",
    "name": "GetLog",
    "group": "Log",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET http://localhost:3000/logfile?level=info\nGET http://localhost:3000/logfile?level=error",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>Livello del file di log richiesto: 'info' o 'error'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>Livello di log richiesto</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "log",
            "description": "<p>Array di messaggi salvati nel file di log di livello 'level'</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"level\": \"info\",\n    \"log\": [\n        \"si controlla che l'assistito si sia registrato\",\n        \"si deve controllare la mail\",\n        \"mail verificata\",\n        \"cookie inviato\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Errore di sintassi</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Errore lettura file</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 400:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errore\": \"passati parametri errati\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 500:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"errore\": \"errore lettura file\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "SourceApidoc/apisource.js",
    "groupTitle": "Log",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/logfile"
      }
    ]
  },
  {
    "type": "get",
    "url": "/prenotazioni",
    "title": "",
    "version": "1.0.0",
    "name": "GetPrenotazioni",
    "group": "Prenotazioni",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET http://localhost:3000/prenotazioni?token=TokenExample\nGET http://localhost:3000/prenotazioni?token=TokenExample&cf=ABCDEF01G23H456",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token di autenticazione</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "cf",
            "description": "<p>Codice fiscale</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200 without cf": [
          {
            "group": "Success 200 without cf",
            "type": "Number",
            "optional": false,
            "field": "totaleprenotazioni",
            "description": "<p>Numero assistiti prenotati</p>"
          },
          {
            "group": "Success 200 without cf",
            "type": "Object[]",
            "optional": false,
            "field": "elenco",
            "description": "<p>Elenco di assistiti prenotati</p>"
          }
        ],
        "Success 200 with cf": [
          {
            "group": "Success 200 with cf",
            "type": "String",
            "optional": false,
            "field": "cf",
            "description": "<p>Codice fiscale assistito prenotato</p>"
          },
          {
            "group": "Success 200 with cf",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome e cognome</p>"
          },
          {
            "group": "Success 200 with cf",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200 with cf",
            "type": "Timestamp",
            "optional": false,
            "field": "datap",
            "description": "<p>Data e ora prenotazione</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response without cf:",
          "content": "HTTP/1.1 200 OK\n{\n    \"totaleprenotazioni\": 2,\n    \"elenco\": [\n        {\n            \"cf\": \"QWERTY01U23I456O\",\n            \"nome\": \"Nome Cognome\",\n            \"email\": \"mail@dominio.com\",\n            \"datap\": \"2021-04-08T07:30:00.000Z\"\n        },\n        {\n            \"cf\": \"ABCDEF01G23H456I\",\n            \"nome\": \"Nome Cognome\",\n            \"email\": \"mail2@dominio.it\",\n            \"datap\": \"2021-04-11T15:00:00.000Z\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response with cf:",
          "content": "HTTP/1.1 200 OK\n{\n    \"cf\": \"ABCDEF01G23H456I\",\n    \"nome\": \"Nome Cognome\",\n    \"email\": \"mail@dominio.it\",\n    \"datap\": \"2021-04-11T15:00:00.000Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Errore di sintassi</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Token errato</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Errore richiesta al database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 400:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errore\": \"passati parametri errati\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"errore\": \"token errato o mancante\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 500:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"errore\": \"errore richiesta database\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "SourceApidoc/apisource.js",
    "groupTitle": "Prenotazioni",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/prenotazioni"
      }
    ]
  },
  {
    "type": "get",
    "url": "/registrati",
    "title": "",
    "version": "1.0.0",
    "name": "GetRegistrati",
    "group": "Registrati",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET http://localhost:3000/registrati?token=TokenExample\nGET http://localhost:3000/registrati?token=TokenExample&cf=ABCDEF01G23H456",
        "type": "js"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token di autenticazione</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "cf",
            "description": "<p>Codice fiscale</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200 without cf": [
          {
            "group": "Success 200 without cf",
            "type": "Object[]",
            "optional": false,
            "field": "registrati",
            "description": "<p>Elenco di utenti registrati</p>"
          }
        ],
        "Success 200 with cf": [
          {
            "group": "Success 200 with cf",
            "type": "String",
            "optional": false,
            "field": "cf",
            "description": "<p>Codice fiscale assistito registrato</p>"
          },
          {
            "group": "Success 200 with cf",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome e cognome</p>"
          },
          {
            "group": "Success 200 with cf",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>Email</p>"
          },
          {
            "group": "Success 200 with cf",
            "type": "Boolean",
            "optional": false,
            "field": "verificato",
            "description": "<p>True se la mail è stata verificata</p>"
          },
          {
            "group": "Success 200 with cf",
            "type": "Boolean",
            "optional": false,
            "field": "booked",
            "description": "<p>True se l'assistito ha già prenotato</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response without cf:",
          "content": "HTTP/1.1 200 OK\n{\n    \"registrati\": [\n        {\n            \"cf\": \"ABCDEF01G23H456I\",\n            \"nome\": \"Nome Cognome\",\n            \"mail\": \"mail@dominio.it\",\n            \"verificato\": false,\n            \"booked\": false\n        },\n        {\n            \"cf\": \"QWERTY01U23I456O\",\n            \"nome\": \"Nome Cognome\",\n            \"mail\": \"mail2@dominio.com\",\n            \"verificato\": true,\n            \"booked\": false\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Success-Response with cf:",
          "content": "HTTP/1.1 200 OK\n{\n    \"cf\": \"ABCDEF01G23H456I\",\n    \"nome\": \"Nome Cognome\",\n    \"mail\": \"mail@dominio.it\",\n    \"verificato\": false,\n    \"booked\": false\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Errore di sintassi</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Token errato</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Errore richiesta al database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response 400:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errore\": \"passati parametri errati\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 401:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"errore\": \"token errato o mancante\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response 500:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"errore\": \"errore richiesta database\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "SourceApidoc/apisource.js",
    "groupTitle": "Registrati",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/registrati"
      }
    ]
  }
] });
