$(document).ready(function () {
  
  $('#formcf').submit(function (e) {
  e.preventDefault();
  $.get('pergiorgia.php?CF=' + $('#InputcodFisc').val(), function () {
      $('#InputcodFisc').val('')
    }
  )
})

$('#formtelegram').submit(function (e) {
  e.preventDefault();
  $.get('http://localhost:3000/telegrammedico')
})



function bottonup() {
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

}



  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#divdisp h2").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });



  const locale = navigator.language;

  const localeFormat = new Intl.DateTimeFormat(locale, { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format;
  $(".date-intl").each(function (elem) {
    const date = new Date(this.innerHTML);
    this.innerHTML = localeFormat(date);
  })



  $("#animatebutton").click(function () {
    const element = document.querySelector('.animatebutton');
    element.classList.add('clicked');
    setTimeout(function () {
      element.classList.remove('clicked');
    }, 500);
  });



  bottonup()

});

function adddisp() {
  $.post('http://localhost:3000/insertdisp',
    {
      token: 'token',
      giorno: $('#start').val(),
      orario: $('#appt').val(),
      totdisponibilita: $('#dispon').val(),
    }, function() {
      alert('Disponibilità inserita')
    }
  )
}


function checkcf() {
  var pattern = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/;
  var CodiceFiscale = document.getElementById("InputcodFisc");

  if (CodiceFiscale.value.search(pattern) == -1) {
    alert("Il valore inserito non è un codice fiscale!");
    CodiceFiscale.value = "";
    CodiceFiscale.focus();
    return 0
  } else {
    alert("Codice fiscale aggiunto")
    return 1
  }
}


function update_users_count() {
  $('#users b').animate({
    counter: 1492
  }, {
    duration: 2000,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    },
    complete: update_users_count
  });
};


function update_users_count2() {
  $('#users2 b').animate({
    counter: 129
  }, {
    duration: 2000,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    },
    complete: update_users_count
  });
};

function update_users_count3() {
  $('#users3 b').animate({
    counter: 327
  }, {
    duration: 2000,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    },
    complete: update_users_count
  });
};

function update_users_count4() {
  $('#users4 b').animate({
    counter: 783
  }, {
    duration: 2000,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    },
    complete: update_users_count
  });
};

function updateonscroll() {
  update_users_count();
  update_users_count2();
  update_users_count3();
  update_users_count4();
}

function logout() {
  document.cookie = "LOGIN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/pagina_medico;";
}