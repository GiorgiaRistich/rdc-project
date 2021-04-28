<?php
$CF=$_GET["CF"];

$couchdb = "http://admin:adminpass@couchdb:5984/";
$url = $couchdb."cf_medico/".$CF;
$data = array('_id'=>$CF);
$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'PUT',
        'content' => json_encode($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
?>