
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
    $("dosi").ready(function () {
        jQuery.ajax({
            url: "http://node:3000/dosi",
            success: function (data) {
                updatedosi(data)
            }
        })
    });
}