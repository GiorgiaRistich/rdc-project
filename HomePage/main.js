function formerror() {
    $(".formelem").addClass("formerrato");
    setTimeout(() => {
        $(".formelem").removeClass("formerrato");
    }, 500);
}

function mostradosi() {
    $("dosi").ready(function () {
        jQuery.ajax({
            url: "http://localhost:3001/dosi",
            header: {
                "Access-Control-Allow-Origin":"*"
            },
            success: function (data) {
                console.log(data)
                $('#pdosi').val(data)
            }
        })
    });
}

window.onload = mostradosi()