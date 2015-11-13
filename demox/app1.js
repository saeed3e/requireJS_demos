// Start loading the main app file. Put all of
// your application logic in there.
define(['jquery','app/file1'], function($) {
    var j = 0;
    setInterval(function() {
        $('#cont2').append('<li>Tuple Number: ' + j++ +'</li>')
    }, 1000);
});
