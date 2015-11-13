define(function() {
    var i = 0;
    setInterval(function() {
        $('#cont2').append('<li>Tuple Number: ' + i++ + ' renderend by last file</li>')
    }, 2000);
});