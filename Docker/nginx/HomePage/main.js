
function formerror() {
    $(".formelem").addClass("formerrato");
    setTimeout(() => {
        $(".formelem").removeClass("formerrato");
    }, 500);
}

function updatedosi(val) {
    $('#pdosi').animate({
    counter: val
  }, {
    duration: 2000,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    }
  });
}

function mostradosi() {
    if ($("#pdosi").html()=="0") {
        jQuery.ajax({
            url: "http://localhost:3000/dosi",
            success: function (data) {
                updatedosi(data)
            }
        })
    }
}