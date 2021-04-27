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

<?php
    $db = pg_connect("host=2.236.50.195 port=5432 dbname=progettordc user=postgres password=adminpass");
    $result = pg_query($db,"SELECT * FROM prenotazioni where CF='".$_GET["CF"]."'");
    $row=pg_fetch_assoc($result);
    $data=explode(" ", $row["datap"]);
    echo "<div id='dati'><table id='tdati'>";
    echo "<tr><td class='rigsx'>Codice Fiscale</td><td class='rigdx'>".$row["cf"]."</td></tr>";
    echo "<tr><td class='rigsx'>Nome e Cognome</td><td class='rigdx'>".$row["nome"]."</td></tr>";
    echo "<tr><td class='rigsx'>Indirizzo email</td><td class='rigdx'>".$row["email"]."</td></tr>";
    echo "<tr><td class='rigsx'>Data prenotazione</td><td class='rigdx'>".$data[0]."</td></tr>";
    echo "<tr><td class='rigsx'>Orario prenotazione</td><td class='rigdx'>".$data[1]."</td></tr>";
    echo "</table></div>";
?>
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

    <p>TELEGRAM QRCODE CHAT BOT</p>

</body>
</html>