function myFunction() {
    var input=document.getElementById("pass");
    if(input.type==="password") {
        input.type="text";
    }else {
        input.type="password";
    }
}