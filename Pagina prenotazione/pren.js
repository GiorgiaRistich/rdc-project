window.onload = function() {
    var ultim = localStorage.getItem("lastaccess");
    $("#la").text("ULTIMO ACCESSO: "+ultim)
    var options = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit'}
    data = Date().toLocaleString('it-IT', options)
    localStorage.setItem("lastaccess", data.toString().substring(0, 24))
}