<?php
    $CF = $_GET["CF"];
    $database = 'http://admin:adminpass@2.236.50.195:5984/cookies/';
    $res = file_get_contents($database . $CF);
    $jsonres = json_decode($res, true);
    echo($jsonres["cookie"]);
?>