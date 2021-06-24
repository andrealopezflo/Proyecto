function Board(players, existentBoard) {
    this.size = 8;
    this.players = players;
  
    this.startBoard(existentBoard);
}

Board.prototype.startBoard = function(existentBoard) {
    if(existentBoard) {
        this.board = existentBoard;
    } else {
        var matriz = new Matriz();
        this.board = matriz.matriz;
    }
}

Board.prototype.copy = function() {
    var tempPlayers = [];
    for (var i = this.players.length - 1; i >= 0; i--) {
      tempPlayers[i] = new Player(this.players[i].name, this.players[i].number, this.players[i].isIa);
    };

    var tempBoard = [];
    for (var i = 0; i < this.board.length; i++) {
        tempBoard[i] = this.board[i].slice();
    }
    
    return new Board(tempPlayers, tempBoard);
}

//BUSCANDO ARRIBA
Board.prototype.searchUp = function(x, y, player) {
    var pieces = [];

    y--;
    while(y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        y--;
    }

    return [];
}

//BUSCANDO ABAJO
Board.prototype.searchDown = function(x, y, player) {
    var pieces = [];

    y++;
    while(y < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        y++;
    }
    
    return [];
}

//BUSCANDO IZQUIERDA
Board.prototype.searchLeft = function(x, y, player) {
    var pieces = [];

    x--;
    while(x >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
    }

    return [];
}

//BUSCANDO DERECHA
Board.prototype.searchRight = function(x, y, player) {
    var pieces = [];

    x++;
    while(x < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
    }

    return [];
}

//BUSCANDO ARRIBA IZQUIERDA
Board.prototype.searchUpLeft = function(x, y, player) {
    var pieces = [];

    x--;
    y--;
    while(x >= 0 && y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
        y--;
    }

    return [];
}

//BUSCANDO ARRIBA DERECHA
Board.prototype.searchUpRight = function(x, y, player) {
    var pieces = [];

    x++;
    y--;
    while(x < this.size && y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
        y--;
    }

    return [];
}

//BUSCANDO ABAJO IZQUIERDA
Board.prototype.searchDownLeft = function(x, y, player) {
    var pieces = [];

    x--;
    y++;
    while(x >= 0 && y < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
        y++;
    }

    return [];
}

//BUSCANDO ABAJO DERECHA
Board.prototype.searchDownRight = function(x, y, player) {
    var pieces = [];

    x++;
    y++;
    while(x < this.size && y < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
        y++;
    }

    return [];
}

Board.prototype.getOpponentPieces = function(x, y, player) {
    var pieces = [];

    if(this.board[x][y]) {
        return [];
    }

    var up = this.searchUp(x, y, player);
    pieces = pieces.concat(up ? up : []);
    var down = this.searchDown(x, y, player);
    pieces = pieces.concat(down ? down : []);
    var left = this.searchLeft(x, y, player);
    pieces = pieces.concat(left ? left : []);
    var right = this.searchRight(x, y, player);
    pieces = pieces.concat(right ? right : []);
    var upLeft = this.searchUpLeft(x, y, player);
    pieces = pieces.concat(upLeft ? upLeft : []);
    var downLeft = this.searchDownLeft(x, y, player);
    pieces = pieces.concat(downLeft ? downLeft : []);
    var upRight = this.searchUpRight(x, y, player);
    pieces = pieces.concat(upRight ? upRight : []);
    var downRight = this.searchDownRight(x, y, player);
    pieces = pieces.concat(downRight ? downRight : []);
    
    return pieces;
}

Board.prototype.getPlayer = function(actualPlayer, opp) {
    var player;

    if(!opp) {
        player = this.players[actualPlayer]
    } else {
        player = this.players[actualPlayer ? 0 : 1]
    }

    return player;
}

Board.prototype.validMove = function(x, y, actualPlayer) {
    var player = this.getPlayer(actualPlayer);

    return this.getOpponentPieces(x, y, player).length !== 0;
}

Board.prototype.getAllValidMoves = function(actualPlayer) {
    var validMoves = [];

    for (var x = 0; x < this.size; x++) {
        for (var y = 0; y < this.size; y++) {
            if(this.validMove(x, y, actualPlayer)) {
                validMoves.push({x: x, y: y});
            }
        }
    }

    return validMoves;
}

Board.prototype.shift = function(x, y, actualPlayer) {
    var player = this.getPlayer(actualPlayer);
    var otherPlayer = this.getPlayer(actualPlayer, true);

    var pieces = this.getOpponentPieces(x, y, player)

    for (var i = 0; i < pieces.length; i++) {
        var piece = pieces[i];

        this.board[piece.x][piece.y] = player.color;
    }
    this.board[x][y] = player.color;

    player.qtdPieces += pieces.length + 1;
    otherPlayer.qtdPieces -= pieces.length;
}