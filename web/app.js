//Send Message Function
function sendMessage() {
    var message = document.getElementById('message').value;
    console.log(message);
    document.getElementById('message').value = '';
    return false;
}
