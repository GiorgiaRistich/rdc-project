<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Pagina Gestione Medico</title>

  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> 
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js"></script> -->
  
  <link href="style.css" rel="stylesheet">
  <script src="main.js"></script>

</head>

<body>
<?php
    if(!isset($_COOKIE["LOGIN"])) {
        header("location: ../grafica/error.html");
        die();
    }
    if ("6644b56f6215447b5af219a41923c5a9"!==$_COOKIE["LOGIN"]) {
        header("location: ../grafica/error.html");
        die();
    }
?>

  <!-- ======= Header ======= -->
  <header id="header" class="navbar-default navbar-fixed-top d-flex align-items-center"> <!--classe specifica Bootstrap-->
    <div class="container d-flex align-items-center justify-content-between">

      <h1 class="logo">Medico</h1>
      

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto" href="#prenotazioni">Prenotazioni</a></li>
          <li><a class="nav-link scrollto" href="#codicefiscale">Aggiungi Codice Fiscale</a></li>
          <li><a class="nav-link scrollto" href="#slot_temporale">Slot Temporale</a></li>
          <li><a class="nav-link scrollto " href="#telegram">Telegram</a></li>
          <li><a class="nav-link scrollto " onclick="logout()" href="https://localhost/HomePage/index.php">Log Out</a></li>
        </ul>
        
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->

  <!-- ======= Prenotazioni Section ======= -->
  <section id="prenotazioni">
  <br><br><br><br>
    <div class="container">
    <div>  
      <h1 class="h1pren">Prenotazioni effettuate</h1>
      <input id="myInput" type="text" placeholder="Search.." class="search">
    </div>
      <?php
     
$db = pg_connect("host=postgres port=5432 dbname=postgres user=postgres password=adminpass");
$result = pg_query($db,"SELECT * FROM prenotazioni order by datap");
echo "<div id='divdisp'>";
echo "<div class='accordion' id='accordion_prenotazioni' >";
  echo "<div class='accordion-item'>";
  while($row=pg_fetch_assoc($result)){
    echo "<h2 class='accordion-header' id='heading_".$row['cf']."' >";
      echo "<button class='accordion-button collapsed' type='button' data-toggle='collapse' data-target='#collapse_".$row['cf']."' aria-expanded='true' aria-controls='collapse_".$row['cf']."'>";
        echo "<div class='row rowpren'>";
          echo "<div class='col-sm-6 date-intl'>";
           echo $row['datap'];
         echo "</div>";
         echo "<div class='col-sm-6 cf'>";
           echo $row['cf'];
         echo "</div>";
      echo" </div>";
      echo "</button>";
    echo "</h2>";
    echo "<div style='background-color:#e3efff' id='collapse_".$row['cf']."' class='accordion-collapse collapse' aria-labelledby='heading_".$row['cf']."' data-bs-parent='#accordion_prenotazioni'>";
      echo "<div class='accordion-body'>";
      echo "<div class='row rowpren'>";
      echo "<div class='col-sm-2 nomin'>";
       echo "Nominativo:&nbsp;";
       echo "</div>";
      echo "<div class='col-sm-4 nome'>";
       echo $row['nome'];
     echo "</div>";
     echo "<div class='col-sm-2 ma'>";
       echo "e-mail:&nbsp;";
       echo "</div>";
     echo "<div class='col-sm-4 email '>";
       echo $row['email'];
     echo "</div>";
  echo" </div>";
      echo "</div>";
    echo "</div>";
  }
  echo "</div>";
echo "</div>";
echo "</div>";
?>

  </section>
      
  

  <main id="main">

    

    <!-- ======= Codice Fiscale Section ======= -->
    <section id="codicefiscale" class="codicefiscale section-bg">
    <br><br><br><br>
      <div class="container">

        <div class="section-title">
          <h2>Codice Fiscale</h2>
          <h3>Aggiungi <span>Codice Fiscale</span></h3>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <img src="logoMedici.png" class="img-fluid" alt="">
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center">
          <form id="formcf" onsubmit="return checkcf()">
  <div class="form-group">
    <label for="exampleInputEmail1">Codice Fiscale</label>
    <input type="text" class="form-control" id="InputcodFisc"  placeholder="Mettere codice fiscale">
  </div>
  <button type="submit" class="btn btn-primary " >Aggiungi</button>
</form>
        </div>

      </div>
    </section><!-- End Codice Fiscale Section -->

    

    <!-- ======= Numeri ======= -->
    <section id="counts" class="counts">
    <br><br><br><br>
      <div class="container" onmouseover="updateonscroll()">

        <div class="row">

          <div class="col-lg-3 col-md-6">
            <div class="count-box" id="users">
            <img src="stethoscope.png" class="img-fluid" alt="">
             <p>Pazienti Totali</p>
                <b counter="0">0</b>
                
            </div>
          </div>

           <div class="col-lg-3 col-md-6 ">
            <div class="count-box" id="users2">
            <img src="syringe.png" class="img-fluid" alt="">
             <p>Prima Dose</p>
              <b counter="0" >0</b>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 ">
            <div class="count-box" id="users3">
            <img src="ciao.png" class="img-fluid" alt="">
              <p>Seconda Dose</p>
              <b counter="0" >0</b> 
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="count-box" id="users4">
            <img src="vaccine.png" class="img-fluid" alt="">
              <p>Tot Somministrazioni</p>
              <b counter="0" >0</b> 
            </div>
          </div>
 
        </div>

      </div>
    </section><!-- End Numeri Section -->

    

    </section><!-- End Slot Temporale Section -->

    <section id="testimonials" class="testimonials">
     <!-- <h2 id="giuro">Giuro</h2> -->
      <div class="container">
 

      <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="2000">

<div class="carousel-inner">
  <div class="item active">
  <h2 id="giuro">Giuro</h2>

    <blockquote>
    <h3 id="slider"> <i>"di rispettare il segreto professionale e tutelare la riservatezza su tutto ciò che mi è confidato, che osservo o ho osservato, inteso o intuito nella mia professione o in ragione del mio stato o ufficio"
 </i></h3>
 </blockquote>
  </div>

  <div class="item">
  <h2 id="giuro">Giuro</h2>
  <blockquote>
    <h3 id="slider"><i>"di prestare assistenza d'urgenza a chi ne abbisogni e di mettermi, in caso di pubblica calamità, a disposizione dell'autorità competente"
</i></h3>
 </blockquote>
  </div>

  <div class="item">
  <h2 id="giuro">Giuro</h2>
  <blockquote>
    <h3 id="slider"><i>"di prestare, in scienza e coscienza, la mia opera, con diligenza, perizia e prudenza e secondo equità, osservando le norme deontologiche che regolano l'esercizio della professione"
</i></h3>
</blockquote>
  </div>
</div>
<br><br>
<ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0"  class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1" ></li>
      <li data-target="#myCarousel" data-slide-to="2" ></li>
    </ol>

  </div>
</div>
      
<p class="giur"><cite>Giuramento di Ippocrate</cite></p>
    </section><!-- End Giuramento Section -->

    <!-- ======= Slot Temporale Section ======= -->
    <section id="slot_temporale" class="services">
    <br><br><br><br>
      <div class="container">

        <div class="section-title">
          <h2>Slot Temporale</h2>
          <h3>Aggiungi <span>Slot Temporale</span></h3>
        </div>
        
        <div class="row">
          <div class="col-md-4 d-flex align-items-stretch">
          <div class="form-group">
          <label for="start">Data da inserire:</label>
          <input type="date" class="img" id="start" name="trip-start"
               value="2021-06-01"
               min="2021-06-01" max="2021-07-01" required>
</div>
</div>
<div class="col-md-4">
               <div class="form-group">
                  <label class="control-label">Orario: </label>
                  <input type="time" class="img" id="appt" name="appt"
       min="09:00" max="18:00" required>
       <small>Gli appuntamenti sono ogni 30 min!</small>
               </div>
            </div>
          

            <div class="col-md-4">
               <div class="form-group">
                  <label class="control-label">Disponibilità: </label>
                  <input type="text" class="img" id="dispon" name="dispon" required>
               </div>
            </div>

            
         </div>
         <div class="row container d-flex justify-content-center col-sm-2"> <button type="button" id="animatebutton" class="btn btn-icon-text animatebutton" onclick="adddisp()"> <p class="btn-icon-prepend" id="buttoninsert">INSERISCI</p></button> </div>

        </div>
    </section><!-- End Slot Temporale Section -->

    <section id="testimonials" class="testimonials">
      <div class="container">
      <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="2000">

<div class="carousel-inner">
  <div class="item active">
  <h2 id="giuro">Giuro</h2>

    <blockquote>
    <h3 id="slider"> <i>"di perseguire con la persona assistita una relazione di cura fondata sulla fiducia e sul rispetto dei valori e dei diritti di ciascuno e su un'informazione, preliminare al consenso, comprensibile e completa"


 </i></h3>
 </blockquote>
  </div>

  <div class="item">
  <h2 id="giuro">Giuro</h2>
  <blockquote>
    <h3 id="slider"><i>"di attenermi ai principi morali di umanità e solidarietà nonché a quelli civili di rispetto dell'autonomia della persona"

</i></h3>
 </blockquote>
  </div>

  <div class="item">
  <h2 id="giuro">Giuro</h2>
  <blockquote>
    <h3 id="slider"><i>"di mettere le mie conoscenze a disposizione del progresso della medicina, fondato sul rigore etico e scientifico della ricerca, i cui fini sono la tutela della salute e della vita"

</i></h3>
</blockquote>
  </div>
  
  
  <div class="item">
  <h2 id="giuro">Giuro</h2>
  <blockquote>
    <h3 id="slider"><i>"di affidare la mia reputazione professionale alle mie competenze e al rispetto delle regole deontologiche e di evitare ogni comportamento che possa ledere il decoro e la dignità della professione" 

</i></h3>
</blockquote>
  </div>

</div>

<br><br>
<ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0"  class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1" ></li>
      <li data-target="#myCarousel" data-slide-to="2" ></li>
      <li data-target="#myCarousel" data-slide-to="3" ></li>
    </ol>

  </div>
      </div>
      <p class="giur"><cite>Giuramento di Ippocrate</cite></p>
    </section><!-- End Giuramento Section -->

    <!-- ======= Telegram Section ======= -->
    <section id="telegram" class="telegram">
    <br><br><br><br>
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Telegram</h2>
          <h3>Inviare Prenotazione con <span>Telegram</span></h3>
        </div>

        <div class="row portfolio-container">

          <div class="col-lg-4 col-md-6 portfolio-item filter-app teleg">
          <a href="https://desktop.telegram.org/" target="_blank" id="ateleg"><img src="telegram.png" id="imgteleg" class="img-fluid" alt=""></a>
              
            
            
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
          

            <div class="portfolio-info">
              <form id="formtelegram">
            <button type="submit" class="btn btn-primary" id="bottone">Invia</button>
          </form>
              
    
  </div>
</div>
            </div>
          </div>  

         
        </div>

      </div>
    </section>
    <!-- End Telegram Section -->



    <!-- ======= Giuramento Section ======= -->
    <section id="testimonials" class="testimonials">
      <div class="container">
      <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="2000">

<div class="carousel-inner">
  <div class="item active">
  <h2 id="giuro">Giuro</h2>

    <blockquote>
    <h3 id="slider"> <i>"di esercitare la medicina in autonomia di giudizio e responsabilità di comportamento contrastando ogni indebito condizionamento che limiti la libertà e l'indipendenza della professione"



 </i></h3>
 </blockquote>
  </div>

  <div class="item">
  <h2 id="giuro">Giuro</h2>
  <blockquote>
    <h3 id="slider"><i>"di perseguire la difesa della vita, la tutela della salute fisica e psichica, il trattamento del dolore e il sollievo dalla sofferenza nel rispetto della dignità e libertà della persona"

</i></h3>
 </blockquote>
  </div>

  <div class="item">
  <h2 id="giuro">Giuro</h2>
  <blockquote>
    <h3 id="slider"><i>"di curare ogni paziente con scrupolo e impegno, senza discriminazione alcuna, promuovendo l'eliminazione di ogni forma di diseguaglianza nella tutela della salute"

</i></h3>
</blockquote>
  </div>
  
  
  <div class="item">
  <h2 id="giuro">Giuro</h2>
  <blockquote>
    <h3 id="slider"><i>"di non intraprendere né insistere in procedure diagnostiche e interventi terapeutici clinicamente inappropriati ed eticamente non proporzionati, senza mai abbandonare la cura del malato"


</i></h3>
</blockquote>
  </div>

</div>

<br><br>
<ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0"  class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1" ></li>
      <li data-target="#myCarousel" data-slide-to="2" ></li>
      <li data-target="#myCarousel" data-slide-to="3" ></li>
    </ol>

  </div>
      </div>
      <p class="giur"><cite>Giuramento di Ippocrate</cite></p>
    </section><!-- End Giuramento Section -->

    
  </main><!-- End #main -->

  
        Idea di :
        Andrea Rodriguez,
        Giorgia Ristich,
        Chiara Rizzato
     
  <!--Pulsante per tornare direttamente all'inizio della pagina-->
  <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><p style="color:white">SU</p></a>


</body>

</html>