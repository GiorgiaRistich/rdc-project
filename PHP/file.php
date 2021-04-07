<!DOCTYPE html>
<html>
    <body>


<?php

header("Content-Type: application/octet-stream");

$file = $_GET["file"] . ".pdf"; //$_GET è una super global variabile which is used to collect form data after submitting an HTML form with method="get"

header("Content-Disposition: attachment; filename=" . urlencode($file));
header("Content-Type: application/download");
header("Content-Description: File Transfer");			
header("Content-Length: " . filesize($file));

flush(); 

$fp = fopen($file, "r");
while (!feof($fp)) { //feof() function checks if the "end-of-file" (EOF) has been reached for an open file.
	echo fread($fp, 65536); //echo equivale alla read in php
	flush(); // This is essential for large downloads
}

fclose($fp);
?>
</body>
</html>
