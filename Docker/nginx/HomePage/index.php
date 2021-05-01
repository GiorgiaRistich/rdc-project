<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Home Page</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet"
    type="text/css">
  <link href="style.css" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="main.js"></script>
</head>

<body>
  <?php 
    if(count($_GET)===1 && $_GET["from"]==='checkmail'){
      echo '<script>alert("Controlla la tua casella email per procedere")</script>';
    }
  ?>

  <!-- Navigation -->
  <nav class="navbar navbar-light bg-light static-top ml-auto border-info">
    <div class="container">
      <div>
        <img src="primulatesto.png" id="primulaheader">
        <p id="dotthead" class="navbar-brand">Dottor Mario Rossi</p>
      </div>
      <div>
        <div class="navbar-brand">Sei un medico?</div>
        <a type="button" class="btn btn-outline-primary" href="../pagina_medico/loginMedico.php">Accedi</a>
      </div>
    </div>
    </div>
  </nav>

  <!-- Masthead -->
  <header class="masthead text-white-50 text-xl-center headerform">
    <div class="overlay mx-auto"></div>
    <div class="container mx-auto ">
      <div class="row">
        <div class="col-xl-9 mx-lg-auto">
          <h1 class="mb-5" id="prenotaora">Prenota qui il tuo vaccino</h1>
        </div>
        <div class="col-md-15 col-lg-10 col-xl-10 ">


          <div class="form justify-content-xl-center">
            <form id="form" method="post" action="http://localhost:3000/form_iniziale">
              <div class="row">
                <div class="col-12 col-md-9 mb-2 mb-md-2">
                  <input class="form-control form-control-lg formelem" name="name" placeholder="nome e cognome"
                    oninvalid="formerror()" required>
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-md-9 mb-10 mb-md-2">
                  <input type="text" name="CF" size="16" maxlength="16" class="form-control form-control-lg formelem"
                    pattern="[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}"
                    placeholder="codice fiscale" oninvalid="formerror()" required>
                </div>

                <div class="col-12 col-md-9 mb-10 mb-md-2">
                  <input type="email" name="mail" class="form-control form-control-lg formelem" placeholder="email" oninvalid="formerror()"
                    required>
                </div>

              </div><br>
              <div class="col-12 col-md-3 mb-md-2">
                <button type="submit" class="btn btn-lg btn-primary border" id="accedi">Prenota subito!</button>
              </div>
            </form>
          </div>
        </div>


      </div>

    </div>
  </header>

  <!-- Icons Grid -->
  <section class="features-icons bg-light text-center" onmouseover="mostradosi()">
    <div class="container">
      <div class="row">

        <div class="img col-lg-4">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
            <div class="features-icons-icon d-lg-flex">
              <img src="syringe.png" id="siringa" class="img-circle">
            </div>
          </div>
        </div>
        <div class="col-lg-4 elemdosi">
          <p class="lead mb-0">Dosi totali di vaccino anti COVID-19 somministrate in Italia:</p>
          <br>
          <h3 id="pdosi">0</h3>
        </div>
        <div class="col-lg-4 text-white showcase-img">
          <img src="primula.png" id="primuladosi">
        </div>
      </div>
    </div>
  </section>

  <!-- Image Showcases -->
  <section class="showcase">
    <div class="container-fluid p-0">
      <div class="row no-gutters">

        <!--<div class="col-lg-6 order-lg-2 text-white showcase2-img" style="background-image: url('logoMedici.png');"></div>-->
        
        <div class="col-lg-4 order-lg-1 my-auto showcase-text" id="divmedico">
          <h2 id="hmedico">Dottor Mario Rossi</h2>
          <p class="lead mb-0"><i>Medico specialista in medicina generale</i></p>
          <p class="lead mb-0"><b>Indirizzo: </b>viale del Policlinico, 155</p>
          <p class="lead mb-0"><b>Telefono: </b><a href="tel:3339876543">333.9876543</a></p>
          <p class="lead "> <b>ORARIO: </b><br>lun: 10.00-13.00 <br>
            mar: 17.00-19.00 <br>
            mer: 10.00-13-00 <br>
            gio: 17.00-19.00 <br>
            ven: 10.00-13.00</p>

        </div>

        <div class="col-lg-4 order-lg-2">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.3407815737273!2d12.508352615026258!3d41.907032371582766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61242905ab5d%3A0x60bff8ec676f6027!2sPoliclinico%20Umberto%20I%20di%20Roma!5e0!3m2!1sit!2sit!4v1619377820884!5m2!1sit!2sit" width="500" height="450" class="mappa" allowfullscreen="" loading="lazy"></iframe>
        </div>

        <div class="col-lg-4 order-lg-3 text-white showcase-img">
          <img src="caduceo.png" id="immagine">
        </div>
      </div>

    </section>
    <section class="showcase bg-light">
      <div class="row no-gutters">
       
        <div class="col-lg-6 text-white showcase-img coppia">
          <a href="../Info/info.html"><img src="info.png" id="immagine2"></a>
          <br>
          <a type="button" class="btn btn-lg btn-info" id="bottone1" href="../Info/info.html">Info progetto</a>
          
        </div>

      
       
        <div class="col-lg-6 order-lg-2 text-white showcase-img coppia">
          <a href="../outApidoc/index.html"><img src="documents.png" id="immagine3"></a>
          <br>
          <a type="button" class="btn btn-lg btn-info" id="bottone2" href="../outApidoc/index.html">Documentazione API</a>
        </div>
      
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials text-center">
    <div class="container">
      <h2 class="mb-5">il Team</h2>
      <div class="row">
        <div class="col-lg-4">
          <div class="testimonial-item mx-auto mb-5 mb-lg-0">
            <img class="img-fluid rounded-circle mb-3" src="myAvatar-2.svg" alt="">
            <h5>Andrea</h5>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="testimonial-item mx-auto mb-5 mb-lg-0">
            <img class="img-fluid rounded-circle mb-3" src="myAvatar.svg" alt="">
            <h5>Chiara</h5>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="testimonial-item mx-auto mb-5 mb-lg-0">
            <img class="img-fluid rounded-circle mb-3" src="myAvatar-3.svg" alt="">
            <h5>Giorgia</h5>
          </div>
        </div>
      </div>
    </div>
  </section>



</body>

</html>