<?php
   $host        = "host = 2.236.50.195";
   $port        = "port = 5432";
   $dbname      = "dbname = prova_pazienti";
   $credentials = "user = postgres password=adminpass";

   $db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db) {
      echo "Error : non ha aperto il database\n";
   } else {
      echo "ha aperto il database\n";
   }
   
   $sql =<<<EOF
      CREATE TABLE PAZIENTE
      (ID INT PRIMARY KEY     NOT NULL,
      NOME           TEXT    NOT NULL,
      CF             VARCHAR    NOT NULL,
      EMAIL      VARCHAR NOT NULL);
      
EOF;

   $ret = pg_query($db, $sql); /*serve a creare tabella in DB*/
   if(!$ret) {
      echo pg_last_error($db);
   } else {
      echo "Complimenti Tabella Creata\n";
   }
   pg_close($db);
?>