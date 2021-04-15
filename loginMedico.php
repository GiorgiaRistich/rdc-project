<!DOCTYPE html>
<html lang="en">

<head>
  <title>login medico</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="styleMedicoLogin.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script>
    function showPassword() {
      var input = document.getElementById("pass");
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }
  </script>

</head>

<body>

  <?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $codPassword = md5($_POST["inputPassword"]);
    if ($_POST["inputEmail"] === "medico@gmail.com") #medico@gmail.com
    {
      if ($codPassword === "6644b56f6215447b5af219a41923c5a9") #passwordmedico
      {
        if ($_POST["remember"] === true)
          $TempoDiValidita = 2592000;  //Cookie attivo per 30 giorni
        else
          $TempoDiValidita = 7200; //Cookie attivo per 2 ore
        setcookie('LOGIN', $codPassword, time() + $TempoDiValidita);
        header('Location: paginaMedico.php');
      } else { ?>
        <script>alert("mail o password sbagliata")</script>
      <?php }
    } else { ?>
      <script>alert("mail o password sbagliata")</script>
    <?php }
  }
  ?>

  <form action="loginMedico.php" class="form-signin" method="POST" name="medico-login">
    <div class="form-group-lg">
      <div class="jumbotron">
        <img src="logoMedici.png" class="img-circle">
        <h3 class="h3 mb-3 text-center">LOGIN</h3>
        <input type="email" name="inputEmail" class="form-control" placeholder="Email address" required autofocus />
        <input type="password" name="inputPassword" id="pass" class="form-control" placeholder="Password" required />
        <input type="checkbox" onclick="showPassword()" id="showpass" value="mostra/nascondi password">
        <label for="inputPassword">mostra password</label>
        <div id="divRemember">
          <input type="checkbox" name="remember" />
          <label for="remember">ricorda password</label>
        </div>
        <button class="btn btn-lg btn-info" name="loginBotton" type="submit"> accedi</button>

      </div>
    </div>
  </form>
</body>

</html>