$(document).ready(function() {
  var player;
  var table = {
    'column': 3,
    'row': 3
  };
  $("button[data-action='restart']").on('click', initGame);
  $("button[data-action='ia']").on('click', enemyIa);

  function enable() {
      $("body").on('mousedown', 'th', gameTurn);
      $("body").on('mouseup', 'table', enemyIa);
  }

  function disable() {
      $("body").off('mousedown', 'th');
      $("body").off('mouseup', 'table');
  }


  /*
  * Will play for player 2;
  */
  function enemyIa()
  {
    if(player != 2) {
      alert('Skynet detecté');
      return 0;
    } else {
      // Logique de notre IA
      var th = $('body').find('th');
      var freeCell = new Array();
      for (var i = 0; i < th.length; i++) {
        if($(th[i]).html() == "X") {
          // Do nothing
        } else if ($(th[i]).html() == "O") {
          // Add to synapse as already captured
        } else {
          freeCell.push($(th[i]));
          // Add to freeCell as free
        }
      }
      var cellPlayed = Math.floor(Math.random() * freeCell.length);
      $(freeCell[cellPlayed]).html('O');
      if(checkVictor() == 1) {
        disable();
      } else {
        player = 1;
        displayInfo('Tour du joueur ' + player);
      }

    }
  }

  /*
  * Allow to display information for better understanding of the game
  */
  function displayInfo(string)
  {
    $("p[data-binding='info']").html(string);
  }

  /*
  * If the current player has won, stop the game
  * Is the gameboard is full, stop the game also
  */
  function checkVictor()
  {
    var symbol;
    if(player == 1) {
      symbol = 'X';
    } else {
      symbol = 'O';
    }
    var th = $('body').find('th');
    if($(th[0]).html() == symbol && $(th[1]).html() == symbol && $(th[2]).html() == symbol) {
      displayInfo('Victoire du joueur ' + player);
      return 1;
    } else if($(th[3]).html() == symbol && $(th[4]).html() == symbol && $(th[5]).html() == symbol) {
      displayInfo('Victoire du joueur ' + player);
      return 1;

    } else if($(th[6]).html() == symbol && $(th[7]).html() == symbol && $(th[8]).html() == symbol) {
      displayInfo('Victoire du joueur ' + player);
      return 1;

    } else if($(th[0]).html() == symbol && $(th[3]).html() == symbol && $(th[6]).html() == symbol) {
      displayInfo('Victoire du joueur ' + player);
      return 1;

    } else if ($(th[1]).html() == symbol && $(th[4]).html() == symbol && $(th[7]).html() == symbol) {
      displayInfo('Victoire du joueur ' + player);
      return 1;

    } else if ($(th[2]).html() == symbol && $(th[5]).html() == symbol && $(th[8]).html() == symbol) {
      displayInfo('Victoire du joueur ' + player);
      return 1;

    } else if ($(th[0]).html() == symbol && $(th[4]).html() == symbol && $(th[8]).html() == symbol) {
      displayInfo('Victoire du joueur ' + player);
      return 1;

    } else if ($(th[2]).html() == symbol && $(th[4]).html() == symbol && $(th[6]).html() == symbol) {
      displayInfo('Victoire du joueur ' + player);
      return 1;

    } else {
      var matchNul = 1;
      for (var i = 0; i < th.length; i ++) {
        if($(th[i]).html() == "") {
          matchNul = 0;
        }
      }
      if(matchNul == 1) {
        displayInfo('Match Nul');
        return 1;
      } else {
        console.log('on continue');
      }
    }
  }
  /*
  * Add the corresponding symbol to the gameboard
  */
  function addSymbol(el) {
    if(player == 1) {
      el.html('X');
    } else if(player == 2) {
      el.html('O');
    } else {
      alert('erreur de joueur');
    }
  }

  /*
  * Return 1 if the cell is empty or 0 if there something
  */
  function checkContent(el)
  {
    if(el.html() == "") {
      return 1;
    } else {
      return 0;
    }
  }

  /*
  * When a player click on the gameboard, check wich one, then, if the cell
  * is empty, put a cross or a circle
  * Check victory
  * Then, change player.
  */
  function gameTurn()
  {
    if(player == 1) {
      var clickedElement = $(this);
      var response = checkContent(clickedElement);
      if(response == 1) {
        addSymbol(clickedElement);
      } else {
        alert('Erreur de cellule');
      }
      if(checkVictor() == 1) {
        disable();
      } else {
        player = 2;
        displayInfo('Tour du joueur ' + player);
      }
    } else if(player == 2) {
      var clickedElement = $(this);
      var response = checkContent(clickedElement);
      if(response == 1) {
        addSymbol(clickedElement);
      } else {
        alert('Erreur de cellule');
      }
      if(checkVictor() == 1) {
        disable();
      } else {
        player = 1;
        displayInfo('Tour du joueur ' + player);
      }
    } else {
      alert('erreur : ' + player);
    }
  }
  /*
  * Initialize the game, remove all shape on the gameboard
  * Restart to player one
  */
  function initGame()
  {
    player = 1;
    displayInfo('Tour du joueur ' + player);
    $('#gameboard').remove();
    var rowCount = 1;
    var content = "<table id='gameboard'>";
    while (rowCount <= table.row) {
      content += "<tr class='row" + rowCount + "'>";
      var columnCount = 1;
      while (columnCount <= table.column) {
        content += "<th class='column" + columnCount + "'></th>";
        columnCount ++;
      }
      content += "</tr>";
      rowCount ++;
    }
    content += "</table>";
    $('body').append(content);
    enable();
    console.log('joueur en cours : ' + player);
  }


});
