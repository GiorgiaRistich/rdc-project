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