//launch with 'npx apidoc -i SourceApidoc -o outApidoc'



/** 
 * 
 * @api {get} /logfile
 * @apiVersion 1.0.0
 * @apiName GetLog
 * @apiGroup Log
 * @apiExample {js} Example usage:
 *      GET http://localhost:3000/logfile?level=info
 *      GET http://localhost:3000/logfile?level=error
 *
 * @apiParam {String} level Livello del file di log richiesto: 'info' o 'error'
 *
 * 
 * @apiSuccess (Success 200) {String} level Livello di log richiesto
 * @apiSuccess (Success 200) {String[]} log Array di messaggi salvati nel file di log di livello 'level'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "level": "info",
 *          "log": [
 *              "si controlla che l'assistito si sia registrato",
 *              "si deve controllare la mail",
 *              "mail verificata",
 *              "cookie inviato"
 *          ]
 *      }
 * 
 * 
 * @apiError (Error 400) BadRequest Errore di sintassi
 * 
 * @apiErrorExample Error-Response 400:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "errore": "passati parametri errati"
 *     }
 * 
 *
 * 
 * @apiError (Error 500) InternalServerError Errore lettura file
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errore": "errore lettura file"
 *     }
 */



/**
 * @api {get} /registrati
 * @apiVersion 1.0.0
 * @apiName GetRegistrati
 * @apiGroup Registrati
 * @apiExample {js} Example usage:
 *      GET http://localhost:3000/registrati?token=TokenExample
 *      GET http://localhost:3000/registrati?token=TokenExample&cf=ABCDEF01G23H456
 * 
 *
 * @apiParam {String} token Token di autenticazione
 * @apiParam {String} [cf] Codice fiscale
 *
 * @apiSuccess (Success 200 without cf) {Object[]} registrati Elenco di utenti registrati
 *
 * @apiSuccessExample Success-Response without cf:
 *      HTTP/1.1 200 OK
 *      {
 *          "registrati": [
 *              {
 *                  "cf": "ABCDEF01G23H456I",
 *                  "nome": "Nome Cognome",
 *                  "mail": "mail@dominio.it",
 *                  "verificato": false,
 *                  "booked": false
 *              },
 *              {
 *                  "cf": "QWERTY01U23I456O",
 *                  "nome": "Nome Cognome",
 *                  "mail": "mail2@dominio.com",
 *                  "verificato": true,
 *                  "booked": false
 *              }
 *          ]
 *      }
 * 
 *
 * @apiSuccess (Success 200 with cf) {String} cf Codice fiscale assistito registrato
 * @apiSuccess (Success 200 with cf) {String} nome Nome e cognome 
 * @apiSuccess (Success 200 with cf) {String} mail Email 
 * @apiSuccess (Success 200 with cf) {Boolean} verificato True se la mail è stata verificata
 * @apiSuccess (Success 200 with cf) {Boolean} booked True se l'assistito ha già prenotato
 * 
 * 
 * @apiSuccessExample Success-Response with cf:
 *      HTTP/1.1 200 OK
 *      {
 *          "cf": "ABCDEF01G23H456I",
 *          "nome": "Nome Cognome",
 *          "mail": "mail@dominio.it",
 *          "verificato": false,
 *          "booked": false
 *      }
 * 
 * 
 * @apiError (Error 400) BadRequest Errore di sintassi
 * 
 * @apiErrorExample Error-Response 400:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "errore": "passati parametri errati"
 *     }
 * 
 *
 * @apiError (Error 401) Unauthorized Token errato
 *
 * @apiErrorExample Error-Response 401:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "errore": "token errato o mancante"
 *     }
 * 
 * 
 * @apiError (Error 500) InternalServerError Errore richiesta al database
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errore": "errore richiesta database"
 *     }
 */





/** 
 * 
 * @api {post} /insertdisp
 * @apiVersion 1.0.0
 * @apiName InserisciDisponibilità
 * @apiGroup Inserisci Disponibilità
 * @apiExample {js} Example usage:
 *      POST http://localhost:3000/insertdisp
 *
 *      body: {
 *          token: 'ExampleToken',
 *          giorno: '04-13-2021',
 *          orario: '08:00',
 *          totdisponibilita: 5
 *      }
 * 
 *
 * @apiParam {String} token Token di autenticazione
 * @apiParam {Date} giorno Data nuova disponibilità in formato americano (e.g. 04-13-2021)
 * @apiParam {Time} orario Orario nuova disponibilità
 * @apiParam {Number} totdisponibilita Totale disponibilità per la data ed ora inserite
 *
 * 
 * @apiSuccess (Success 200) {String} conferma Messaggio di conferma
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *         "conferma": "disponibilità inserita"
 *      }
 * 
 * 
 * @apiError (Error 400) BadRequest Errore di sintassi
 * 
 * @apiErrorExample Error-Response 400:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "errore": "passati parametri errati"
 *     }
 * 
 *
 * @apiError (Error 401) Unauthorized Token errato
 *
 * @apiErrorExample Error-Response 401:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "errore": "token errato o mancante"
 *     }
 * 
 * 
 * @apiError (Error 409) Conflict Disponibilità già presente in database
 *
 * @apiErrorExample Error-Response 409:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "errore": "data e orario già presenti nel database"
 *     }
 * 
 * 
 * @apiError (Error 500) InternalServerError Errore richiesta al database
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errore": "errore richiesta database"
 *     }
 */






/** 
 * 
 * @api {get} /prenotazioni
 * @apiVersion 1.0.0
 * @apiName GetPrenotazioni
 * @apiGroup Prenotazioni
 * @apiExample {js} Example usage:
 *      GET http://localhost:3000/prenotazioni?token=TokenExample
 *      GET http://localhost:3000/prenotazioni?token=TokenExample&cf=ABCDEF01G23H456
 * 
 *
 * @apiParam {String} token Token di autenticazione
 * @apiParam {String} [cf] Codice fiscale
 *
 * 
 * @apiSuccess (Success 200 without cf) {Number} totaleprenotazioni Numero assistiti prenotati
 * @apiSuccess (Success 200 without cf) {Object[]} elenco Elenco di assistiti prenotati
 *
 * @apiSuccessExample Success-Response without cf:
 *      HTTP/1.1 200 OK
 *      {
 *          "totaleprenotazioni": 2,
 *          "elenco": [
 *              {
 *                  "cf": "QWERTY01U23I456O",
 *                  "nome": "Nome Cognome",
 *                  "email": "mail@dominio.com",
 *                  "datap": "2021-04-08T07:30:00.000Z"
 *              },
 *              {
 *                  "cf": "ABCDEF01G23H456I",
 *                  "nome": "Nome Cognome",
 *                  "email": "mail2@dominio.it",
 *                  "datap": "2021-04-11T15:00:00.000Z"
 *              }
 *          ]
 *      }
 * 
 *
 * @apiSuccess (Success 200 with cf) {String} cf Codice fiscale assistito prenotato
 * @apiSuccess (Success 200 with cf) {String} nome Nome e cognome 
 * @apiSuccess (Success 200 with cf) {String} email Email 
 * @apiSuccess (Success 200 with cf) {Timestamp} datap Data e ora prenotazione
 * 
 * 
 * @apiSuccessExample Success-Response with cf:
 *      HTTP/1.1 200 OK
 *      {
 *          "cf": "ABCDEF01G23H456I",
 *          "nome": "Nome Cognome",
 *          "email": "mail@dominio.it",
 *          "datap": "2021-04-11T15:00:00.000Z"
 *      }
 * 
 * 
 * @apiError (Error 400) BadRequest Errore di sintassi
 * 
 * @apiErrorExample Error-Response 400:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "errore": "passati parametri errati"
 *     }
 * 
 *
 * @apiError (Error 401) Unauthorized Token errato
 *
 * @apiErrorExample Error-Response 401:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "errore": "token errato o mancante"
 *     }
 * 
 * 
 * @apiError (Error 500) InternalServerError Errore richiesta al database
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errore": "errore richiesta database"
 *     }
 */