<?php
    $CF = $_POST["CF"];
    $data = $_POST["giorno"];
    $giorno = substr($data, 0, 10);
    $ora = substr($data, 10);
    $data = $giorno." ".$ora;

    $couchdb = "http://admin:adminpass@couchdb:5984/";
    $res = file_get_contents($couchdb."patients/".$CF);
    $res = json_decode($res, true);
    $nome = $res["name"];
    $mail = $res["mail"];
    

    $host        = "host=postgres";
    $port        = "port=5432";
    $dbname      = "dbname = postgres";
    $credentials = "user = postgres password=adminpass";

    $db = pg_connect("$host $port $dbname $credentials");
    
    $sql = "insert into prenotazioni(cf, nome, email, datap) ";
    $sql .= "values('".$CF."','".$nome."','".$mail."','".$data."')";
        
    $ret = pg_query($db, $sql);
    if(!$ret) {
        header("location: ../grafica/error.html");
    } else {
        header("location: ../Mail_PHP/sendmail.php?CF=".$CF);
    }

    $sql = "select giaprenotate from disponibilita where giorno='".$giorno."' and orario='".$ora."'";
    $ret = pg_query($db, $sql);
    $row = pg_fetch_row($ret);
    $newval = $row[0] + 1;

    $sql = "update disponibilita set giaprenotate=".$newval." where giorno='".$giorno."' and orario='".$ora."'";
    $ret = pg_query($db, $sql);

    pg_close($db);


    $url = $couchdb."patients/".$CF;
    $res["booked"]=true;

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'PUT',
            'content' => json_encode($res)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
   
?>