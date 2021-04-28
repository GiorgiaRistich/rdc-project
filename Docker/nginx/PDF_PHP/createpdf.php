<?php
    $host        = "host = postgres";
    $port        = "port = 5432";
    $dbname      = "dbname = postgres";
    $credentials = "user=postgres password=adminpass";

    $db = pg_connect("$host $port $dbname $credentials");
    $query = "SELECT * from prenotazioni where CF='" . $_GET["CF"] . "'";
    $ret = pg_query($query);
    
    while($row = pg_fetch_row($ret)) {
        $cf = $row[0];
        $nome = $row[1];
        $email = $row[2];
        $datap = $row[3];
    }

    $data=explode(" ", $datap);
    
    pg_close($db);

   
    define('FPDF_FONTPATH','./font/');
    require('fpdf.php');

    $p = new fpdf();
    $p->AddPage();
    $p->Image('LogoVacc.jpeg', 30, 0, 150);
    $p->SetFont('Helvetica', 'B', 20);
    $p->Text(20, 100, "I dati della tua prenotazione: \n");
    $p->Line(20, 70, 190, 70);
    $p->SetFont('Helvetica', '', 16);
    $p->Text(30, 120, "Codice Fiscale: " . $cf . "\n");
    $p->Text(30, 140, "Nome e Cognome: " . $nome . "\n");
    $p->Text(30, 160, "Email: " . $email . "\n");
    $p->Text(30, 180, "Data prenotazione: " . $data[0] . "\n");
    $p->Text(30, 200, "Ora prenotazione: " . $data[1] . "\n");
    $p->Output("D", "ricevuta.pdf");
?>