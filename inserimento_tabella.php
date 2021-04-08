<?php
   $host        = "host=2.236.50.195";
   $port        = "port=5432";
   $dbname      = "dbname = progettordc";
   $credentials = "user = postgres password=adminpass";

   $db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db) {
      echo "Error : non ha aperto il databasee\n";
   } else {
      echo "ha aperto il database\n";
   }

   $sql =<<<EOF
      INSERT INTO PRENOTAZIONI (cf,nome,email,datap)
      VALUES ('RSTGRG99P46U561B', 'Giorgia', 'prova@gmail.com', current_timestamp );

      INSERT INTO PRENOTAZIONI (cf,nome,email,datap)
      VALUES ('ABCDEF89HYUILO67','Giacomino','prova2@gmail.com', current_timestamp);
     

EOF;

   $ret = pg_query($db, $sql);
   if(!$ret) {
      echo pg_last_error($db);
   } else {
      echo "Tupla inserita correttamente\n";
   }
   pg_close($db);
?>