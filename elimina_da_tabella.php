<?php
   $host        = "host = 2.236.50.195";
   $port        = "port = 5432";
   $dbname      = "dbname = progettordc";
   $credentials = "user = postgres password=adminpass";

   $db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db) {
      echo "Error : impossibile aprire il database\n";
   } else {
      echo "database aperto \n";
   }
   $sql =<<<EOF
      DELETE from prenotazioni where cf='ABCDEF89HYUILO67';
EOF;
   $ret = pg_query($db, $sql);
   if(!$ret) {
      echo pg_last_error($db);
      exit;
   } else {
      echo "Record eliminato\n";
   }
   //serve a vedere le tuple rimanenti dopo l'eliminazione della tupla specifica
   
   $sql =<<<EOF
      SELECT * from prenotazioni;
EOF;

   $ret = pg_query($db, $sql);
   if(!$ret) {
      echo pg_last_error($db);
      exit;
   } 
   while($row = pg_fetch_row($ret)) { //pg_fetch_row carica un record dal risultato della query associato alla risorsa identificata da ret. La riga (record) è restituia sotto form di array. Ogni campo è identificato da un indice numerico, che inizia da 0;direi questa parte opzionale
      echo "cf = ". $row[0] . "\n";
      echo "nome = ". $row[1] ."\n";
      echo "email = ". $row[2] ."\n";
      echo "datap =  ".$row[3] ."\n\n";
   }
   echo "Lettura riuscita\n";
   pg_close($db);
?>