<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualizza prenotazione</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link href="style.css" rel="stylesheet">
    <script src="main.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet"
    type="text/css">
</head>
<body>
<?php
    $CF = $_GET["CF"];
    $couchdb = "http://admin:adminpass@couchdb:5984/";
    $res = @file_get_contents($couchdb."cookies/".$CF);
    if ($res===false) {
        header("location: ../grafica/error.html");
        die();
    }
    $res = json_decode($res, true);
    $coo = $res["cookie"];
    if(!isset($_COOKIE["cookie"])) {
        header("location: ../grafica/error.html");
        die();
    }
    if ($coo!==$_COOKIE["cookie"]) {
        header("location: ../grafica/error.html");
        die();
    }
    echo "<p hidden id='codicefiscale'>".$CF."</p>";
?>
    <div id="alto">
        <table id="header">
            <tr>
                <td>
                    <img src="primula.png" id="primulaheader1">
                </td>
                <td>
                    <p id="testoheader">Visualizza la tua prenotazione</p>
                </td>
                <td>
                    <img src="primula.png" id="primulaheader2">
                </td>
            </tr>        
        </table>
    </div>


    <div id='dati'><table id='tdati'>
    <tr><td class='rigsx'>Codice Fiscale</td><td class='rigdx' id="elemcf"></td></tr>
    <tr><td class='rigsx'>Nome e Cognome</td><td class='rigdx' id="elemnc"></td></tr>
    <tr><td class='rigsx'>Indirizzo email</td><td class='rigdx' id="elemmail"></td></tr>
    <tr><td class='rigsx'>Data prenotazione</td><td class='rigdx' id="elemdata"></td></tr>
    <tr><td class='rigsx'>Orario prenotazione</td><td class='rigdx' id="elemora"></td></tr>
    </table></div>

    <div id="buttons">
        <table id="tableb"><tr>
            <td>
                <button onclick="progress('<?php echo $_GET['CF'] ?>')" class="noPrint buttons btn btn-primary" id="bpdf">Scarica PDF</button>
                <div class="progress" id="stat" hidden>
                    <div class="progress-bar" id="intstat" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </td>
            <td>
                <button onclick="window.open('http:\/\/localhost:3000/logincalendar?cf='+'<?php echo $_GET['CF'] ?>')" class="noPrint buttons btn btn-primary" id="bcalendar">Aggiungi evento al calendario!</button>
            </td>
            <td>
                <button onclick="window.print();" class="noPrint buttons btn btn-primary" id="bstampa">Stampa</button>
            </td>
        </tr></table>
    </div>

    <div id="fondo" class="noPrint">
        <img src="telegram.png" id="telegram">
        <div id="teletesto"><b>
            <p id="primot">Vuoi ricevere i dettagli della tua prenotazione su Telegram?</p></b><i>
            <div>Inquadra questo QR-Code e scrivi al bot il tuo Codice Fiscale!</div></i>
        </div>
    </div>

</body>
</html>