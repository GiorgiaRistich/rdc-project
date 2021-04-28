<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Map</title>
   <link rel="stylesheet" href="map.css">
   <script src="map.js"></script>
   <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>   
</head>

<body>
   <img src="june.jpg" alt="Workplace" usemap="#workmap" id="mapimg" class="map">

   <map name="workmap" id="map">
      <area href="" alt="1" title="1" coords="85,80,169,140" shape="rect" onclick="showDay('2021-06-01'); return false">
      <area href="" alt="2" title="2" coords="170,80,254,140" shape="rect" onclick="showDay('2021-06-02'); return false">
      <area href="" alt="3" title="3" coords="255,80,339,140" shape="rect" onclick="showDay('2021-06-03'); return false">
      <area href="" alt="4" title="4" coords="340,80,424,140" shape="rect" onclick="showDay('2021-06-04'); return false">
      <area href="" alt="5" title="5" coords="425,80,509,140" shape="rect" onclick="showDay('2021-06-05'); return false">
      <area href="" alt="6" title="6" coords="510,80,599,140" shape="rect" onclick="showDay('2021-06-06'); return false">
      <area href="" alt="7" title="7" coords="0,140,84,200" shape="rect" onclick="showDay('2021-06-07'); return false">
      <area href="" alt="8" title="8" coords="85,140,169,200" shape="rect" onclick="showDay('2021-06-08'); return false">
      <area href="" alt="9" title="9" coords="170,140,254,200" shape="rect" onclick="showDay('2021-06-09'); return false">
      <area href="" alt="10" title="10" coords="255,140,339,200" shape="rect" onclick="showDay('2021-06-10'); return false">
      <area href="" alt="11" title="11" coords="340,140,424,200" shape="rect" onclick="showDay('2021-06-11'); return false">
      <area href="" alt="12" title="12" coords="425,140,509,200" shape="rect" onclick="showDay('2021-06-12'); return false">
      <area href="" alt="13" title="13" coords="510,140,599,200" shape="rect" onclick="showDay('2021-06-13'); return false">
      <area href="" alt="14" title="14" coords="0,200,84,255" shape="rect" onclick="showDay('2021-06-14'); return false">
      <area href="" alt="15" title="15" coords="85,200,169,255" shape="rect" onclick="showDay('2021-06-15'); return false">
      <area href="" alt="16" title="16" coords="170,200,254,255" shape="rect" onclick="showDay('2021-06-16'); return false">
      <area href="" alt="17" title="17" coords="255,200,339,255" shape="rect" onclick="showDay('2021-06-17'); return false">
      <area href="" alt="18" title="18" coords="340,200,424,255" shape="rect" onclick="showDay('2021-06-18'); return false">
      <area href="" alt="19" title="19" coords="425,200,509,255" shape="rect" onclick="showDay('2021-06-19'); return false">
      <area href="" alt="20" title="20" coords="510,200,599,255" shape="rect" onclick="showDay('2021-06-20'); return false">
      <area href="" alt="21" title="21" coords="0,255,84,315" shape="rect" onclick="showDay('2021-06-21'); return false">
      <area href="" alt="22" title="22" coords="85,255,169,315" shape="rect" onclick="showDay('2021-06-22'); return false">
      <area href="" alt="23" title="23" coords="170,255,254,315" shape="rect" onclick="showDay('2021-06-23'); return false">
      <area href="" alt="24" title="24" coords="255,255,339,315" shape="rect" onclick="showDay('2021-06-24'); return false">
      <area href="" alt="25" title="25" coords="340,255,424,315" shape="rect" onclick="showDay('2021-06-25'); return false">
      <area href="" alt="26" title="26" coords="425,255,509,315" shape="rect" onclick="showDay('2021-06-26'); return false">
      <area href="" alt="27" title="27" coords="510,255,599,315" shape="rect" onclick="showDay('2021-06-27'); return false">
      <area href="" alt="28" title="28" coords="0,315,84,375" shape="rect" onclick="showDay('2021-06-28'); return false">
      <area href="" alt="29" title="29" coords="85,315,169,375" shape="rect" onclick="showDay('2021-06-29'); return false">
      <area href="" alt="30" title="30" coords="170,315,254,375" shape="rect" onclick="showDay('2021-06-30'); return false">
   </map>
   <div id="rightdiv">
      <p id="sca">Premi su un giorno in calendario per visualizzare le disponibilità</p>
      <form id="formdisp" action="book.php" onsubmit="return validateForm()" method="POST">
         <div id="divdisp">

<?php

      echo '<input type="hidden" name="CF" value="'.$_GET["CF"].'" />';

      $host        = "host = postgres";
      $port        = "port = 5432";
      $dbname      = "dbname = postgres";
      $credentials = "user = postgres password=adminpass";

      $db = pg_connect("$host $port $dbname $credentials");
      $sql = "select * from disponibilita order by giorno, orario";

      $ret = pg_query($db, $sql);
      $currday=0;
      while ($row = pg_fetch_row($ret)) {
         $giorno=$row[0];
         $orario=$row[1];
         $disprimaste=$row[2]-$row[3];
         if ($disprimaste>0){
            if ($currday===0) {
               $currday=$row[0];
               echo '<p class="day '.$giorno.'">'.$currday.' </p>'."\n";
            }
            if ($currday!==$giorno) {
               $currday=$row[0];
               echo '<hr>';
               echo '<p class="day '.$giorno.'">'.$currday.' </p>'."\n";
            }
            echo '<p class="'.$giorno.'">';
            echo '<input type="radio" name="giorno" value="'.$giorno.$orario.'" id="'.$giorno.$orario.'">'."\n";
            echo '<label for="'.$giorno.$orario.'">'.$orario.' | Disponibili: '.$disprimaste.' </label>'."\n";
            echo '</p>';
         }
      }
      pg_close($db);
?>
   
         </div>
         <div id="buttons">
            <button type="button" id="showall" onclick="showAll()">Mostra tutto</button>
            <button type="submit">Prenota!</button>
         </div>
      </form>
   </div>


</body>

</html>