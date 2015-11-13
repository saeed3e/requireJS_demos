require(['jquery'], function($) {
    var j = 0;
    setInterval(function() {
        $('#cont2').append('<li>Tuple Number: ' + j++ +'</li>')
    }, 1000);
});
