(function () {
    "use strict"

    var players, currentPlayer, board;

    startGame();


    function startGame() {
        players = [
            new Player("Contrario", 0, false),
            new Player("ia-minimax", 1, true) //white
        ];
        currentPlayer = 1;
        board = new Board(players);

        renderBoard(board.board);
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
        if(currentPlayer === 1){
            if(players[currentPlayer].isIa) {
                setTimeout(function(){
                    var t0 = performance.now()
                    try {
                        var move = players[currentPlayer].getMove(board); 
                        var t1 = performance.now()
                        console.log("IA process time " + (t1 - t0) + " milliseconds.");
                        console.log("Movimiento a realizar " + move.x + ", " + move.y) 

                        document.getElementById("log").innerHTML= move.y + "" + move.x;                    
                    
                    } catch (error) {
                        // algun error en el movimiento   
                    }
                }, 3000);
            }
        }
    }
})();