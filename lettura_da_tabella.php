<?php
   $host        = "host = 2.236.50.195";
   $port        = "port = 5432";
   $dbname      = "dbname = progettordc";
   $credentials = "user = postgres password=adminpass";

   $db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db) {
      echo "Error :impossibile aprire il database\n";
   } else {
      echo "database aperto\n";
   }

   $sql =<<<EOF
      SELECT * from prenotazioni;
EOF;

   $ret = pg_query($db, $sql); //prendo le tuple inserite con inserimento_tabella e le salvo in una variabile
   if(!$ret) {
      echo pg_last_error($db);
      exit;
   } 
   while($row = pg_fetch_row($ret)) { //i valori delle tuple vengono salvati in un array da cui prendo i valori con un ciclo
     //$time = strtotime($row[3]);
      echo "cf = ". $row[0] . "\n";
      echo "nome = ". $row[1] ."\n";
      echo "email = ". $row[2] ."\n";
      echo "datap =  ".$row[3]."\n\n";
   }
   echo "Lettura effettuata con successo\n";
   pg_close($db);
?>