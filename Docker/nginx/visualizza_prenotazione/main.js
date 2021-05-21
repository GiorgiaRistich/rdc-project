function progress(CF) {
    $("#bpdf").attr("hidden", true);
    $("#stat").attr("hidden", false);
    $(".progress-bar").animate({
        width: "100%"
    }, 1000, "linear", function() {
        setTimeout(function() {
            $("#stat").attr("hidden", true);
            $(".progress-bar").css("width", '0%')
            window.open('../PDF_PHP/createpdf.php?CF='+CF);
            $("#bpdf").attr("hidden", false);
        }, 1000)
        
    });

}

$(document).ready(function(){
    jQuery.ajax({
        url: "http://localhost:3000/prenotazioni?token=token&cf="+$("#codicefiscale").text(),
        success: function (data) {
            var datapren=data.datap.substring(0,10)
            var orapren=data.datap.substring(11,19)
            $("#elemcf").text(data.cf)
            $("#elemnc").text(data.nome)
            $("#elemmail").text(data.email)
            $("#elemdata").text(datapren)
            $("#elemora").text(orapren)
        }
    })
})