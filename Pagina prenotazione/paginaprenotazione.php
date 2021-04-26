<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagina di prenotazione</title>
    <link rel="stylesheet" href="pren.css">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">
    <script src="pren.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>   
</head>
<body>

<?php
    $CF = $_GET["CF"];
    $couchdb = "http://admin:adminpass@2.236.50.195:5984/";
    $res = @file_get_contents($couchdb."cookies/".$CF);
    if ($res===false) {
        die();
    }
    $res = json_decode($res, true);
    $coo = $res["cookie"];
    if(!isset($_COOKIE["cookie"])) {
        die();
    }
    if ($coo!==$_COOKIE["cookie"]) {
        die();
    }
?>

    <div id="alto">
        <img src="primula.png" id="primula"></img>
        <p id="cf"><b>CF: </b><?php echo $_GET["CF"]; ?></p>
        <p id="la"><b></b><p>
    </div>

<?php
    echo '<div id="divif" align="center"><iframe src="map.php?CF='.$_GET["CF"].'" width="950" height="460" frameBorder="0"></iframe></div>';
?>
</body>
</html>

