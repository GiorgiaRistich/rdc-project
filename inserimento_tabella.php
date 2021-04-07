<?php
   $host        = "host=2.236.50.195";
   $port        = "port=5432";
   $dbname      = "dbname = prova_pazienti";
   $credentials = "user = postgres password=adminpass";

   $db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db) {
      echo "Error : non ha aperto il databasee\n";
   } else {
      echo "ha aperto il database\n";
   }

   $sql =<<<EOF
      INSERT INTO PAZIENTE (ID,NOME,CF,EMAIL)
      VALUES (1, 'Giorgia', 'nonricordo', 'giorgia.ristich@gmail.com ');
     

EOF;

   $ret = pg_query($db, $sql);
   if(!$ret) {
      echo pg_last_error($db);
   } else {
      echo "Tupla inserita correttamente\n";
   }
   pg_close($db);
?>