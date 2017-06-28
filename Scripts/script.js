$(document).ready(function () {
    var table = {
        'colone': 24,
        'ligne': 16
    };
    var colors = [
        "92FF00",
        "E89B0C",
        "FF0000",
        "470CE8",
        "0DF8FF",
    ];
    
    ligneCount = 1;
    
    var content = "<table>";
    while (ligneCount <= table.ligne) {
        content += "<tr class='" + ligneCount + "'>";
        coloneCount = 1;
        while(coloneCount <= table.colone) {
            var randomColor = Math.floor(Math.random() * 5);
            content += "<th style='background-color:#" + colors[randomColor] + "' class='" + coloneCount + "'></th>";
            coloneCount ++;
        }
              var th = $('th');
        var randomColor = Math.floor(Math.random() * 5);
        for (var i = 0; i < th.length; i++) {
        $(th[i]).css('background-color', '#' + colors[randomColor]);
        }  ligneCount ++;
        content += "</tr>";
        
    }
    content += "</table>";
    $('body').append(content);

    var interval = setInterval(function() {
        randomizeColor();
    }, 500);
    function stopInterval() {
        clearInterval(interval)
    }
    

    $('body').on('click', stopInterval);
    function randomizeColor(th) {
        var th = $('th');
        for (var i = 0; i < th.length; i++) {
            var randomColor = Math.floor(Math.random() * 5);
            $(th[i]).css('background-color', '#' + colors[randomColor]);
        }
    }

    function beatColor() {

    }

    $('body').keydown(function (event) {
        var colorCode = 0;
        if(event.which == 38) {
            colorCode = 0;
            //Si c'est la touche du haut
        } else if(event.which == 40) {
            colorCode = 4;
            //Si c'est la touche du bas
        } else if(event.which == 37) {
            colorCode = 2;
            //Si c'est la touche de  gauche
        } else if(event.which == 39) {
            colorCode = 3;
            //Si c'est la touche de droite
        } else {
            return 0;
        }
        var th = $('th');
        for (var i = 0; i < th.length; i++) {
        $(th[i]).css('background-color', '#' + colors[colorCode]);
        }
    });
});