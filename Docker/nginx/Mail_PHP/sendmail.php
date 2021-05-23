<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer.php';
    require 'SMTP.php';
    require 'Exception.php';


    $host        = "host = postgres";
    $port        = "port = 5432";
    $dbname      = "dbname = postgres";
    $credentials = "user=postgres password=adminpass";

    $db = pg_connect("$host $port $dbname $credentials");
    $query = "SELECT * from prenotazioni where CF='" . $_GET["CF"] . "'";
    #$query = "SELECT * from prenotazioni where CF='AAAAAA00A00A000A'";
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
    $pdffile = $p->Output("S");


    $mail = new PHPMailer(false);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'rdcprogetto@gmail.com';
    $mail->Password = 'ncwkeexrfagortko';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('rdcprogetto@gmail.com', 'Prenotazione vaccino');
    $mail->addAddress($email);

    $mail->AddEmbeddedImage('LogoVacc.jpeg', 'logovacc');
    $mail->addStringAttachment($pdffile, 'Ricevuta.pdf');
    
    $mail->isHTML(true);
    $mail->Subject = 'Ecco la ricevuta della tua prenotazione!';
    $body = '<img src="cid:logovacc" width="50%">';
    $body .= '<p style="font-size:medium; font-weight: bold;">I dati della tua prenotazione:</p></br>';
    $body .= '<p style="font-size:medium;">Codice Fiscale: '.$cf.'</p></br>';
    $body .= '<p style="font-size:medium;">Nome e Cognome: '.$nome.'</p></br>';
    $body .= '<p style="font-size:medium;">Email: '.$email.'</p></br>';
    $body .= '<p style="font-size:medium;">Data prenotazione: '.$data[0].'</p></br>';
    $body .= '<p style="font-size:medium;">Ora prenotazione: '.$data[1].'</p></br>';
    $mail->Body = $body;
    try{
    $mail->send();
    }
    catch(Exception $e) {
        header("location: ../Success/exitiframe.php?CF=".$_GET["CF"]);
    }
    header("location: ../Success/exitiframe.php?CF=".$_GET["CF"]);
?>