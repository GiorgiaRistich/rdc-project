<!--Da aggiungere all'inizio di ogni pagina protetta da cookie-->
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