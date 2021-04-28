function showDay(selday) {
    Array.from(document.getElementById("divdisp").childNodes).forEach(
        function(element, index, array) {
            element.hidden=true
        }
    );
    Array.from(document.getElementsByClassName(selday)).forEach(
        function(element, index, array) {
            element.hidden=false
        }
    );
}

function showAll(){
    Array.from(document.getElementById("divdisp").childNodes).forEach(
        function(element, index, array) {
            element.hidden=false
        }
    );
}

function validateForm() {
    if ($('input[name=giorno]:checked').length === 0) {
        alert("Effettuare una scelta")
        return false
    }
    $(parent.document.getElementsByTagName("*")).css("cursor", "wait")
    $(document.getElementsByTagName("*")).css("cursor", "wait")
}