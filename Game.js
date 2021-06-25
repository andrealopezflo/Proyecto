"use strict"

var players, actualPlayer, board;

startGame();

function startGame() {
    players = [
        new Player("ia_negro", 0, true),
        new Player("ia-blanco", 1, true) //white
    ];
    actualPlayer = 1;
    board = new Board(players);

    var turnoac = getParameterByName('turno');
    var estadoac = getParameterByName('estado');
    
    console.log(turnoac);
    console.log(estadoac);

    renderBoard(board.board);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function renderBoard(board) {
    for (var y = 0; y < board.length; ++y) {
        for (var x = 0; x < board.length; ++x) {
            var piece = board[x][y] ? board[x][y] : "";
        }
    }
    play();
}

function play() {
    if(actualPlayer === 1){
        if(players[actualPlayer].isIa) {
            setTimeout(function(){
                var t0 = performance.now()
                try {
                    var move = players[actualPlayer].getMove(board); 
                    var t1 = performance.now()
                    console.log("IA process time " + (t1 - t0) + " milliseconds.");
                    console.log("Movimiento a realizar " + move.x + ", " + move.y) 

                    let body = document.getElementsByTagName("body")[0];
                    body.innerHTML = "53";

                    //document.getElementById("log").innerHTML= move.y + "" + move.x;                    
                
                } catch (error) {
                    // algun error en el movimiento   
                }
            }, 1000);
        }
    }
}
