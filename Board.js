class Board {
    constructor(players, existentBoard) {
        this.size = 8;
        this.players = players;

        this.initialBoard(existentBoard);
    }

    initialBoard(existentBoard) {
        if (existentBoard) {
            this.board = existentBoard;
        } else {
            var matriz = new Matriz();
            this.board = matriz.matriz;
        }
    }

    copyBoard() {
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
    searchUp(x, y, player) {
        var pieces = [];

        y--;
        while (y >= 0) {
            if (!this.board[x][y]) {
                return false;
            }
            if (this.board[x][y] === player.color) {
                if (pieces.length === 0) {
                    return false;
                } else {
                    return pieces;
                }
            }
            pieces.push({ x: x, y: y });
            y--;
        }

        return [];
    }

    //BUSCANDO ABAJO
    searchDown(x, y, player) {
        var pieces = [];

        y++;
        while (y < this.size) {
            if (!this.board[x][y]) {
                return false;
            }
            if (this.board[x][y] === player.color) {
                if (pieces.length === 0) {
                    return false;
                } else {
                    return pieces;
                }
            }
            pieces.push({ x: x, y: y });
            y++;
        }

        return [];
    }

    //BUSCANDO IZQUIERDA
    searchLeft(x, y, player) {
        var pieces = [];

        x--;
        while (x >= 0) {
            if (!this.board[x][y]) {
                return false;
            }
            if (this.board[x][y] === player.color) {
                if (pieces.length === 0) {
                    return false;
                } else {
                    return pieces;
                }
            }
            pieces.push({ x: x, y: y });
            x--;
        }

        return [];
    }

    //BUSCANDO DERECHA
    searchRight(x, y, player) {
        var pieces = [];

        x++;
        while (x < this.size) {
            if (!this.board[x][y]) {
                return false;
            }
            if (this.board[x][y] === player.color) {
                if (pieces.length === 0) {
                    return false;
                } else {
                    return pieces;
                }
            }
            pieces.push({ x: x, y: y });
            x++;
        }

        return [];
    }

    //BUSCANDO ARRIBA IZQUIERDA
    searchUpLeft(x, y, player) {
        var pieces = [];

        x--;
        y--;
        while (x >= 0 && y >= 0) {
            if (!this.board[x][y]) {
                return false;
            }
            if (this.board[x][y] === player.color) {
                if (pieces.length === 0) {
                    return false;
                } else {
                    return pieces;
                }
            }
            pieces.push({ x: x, y: y });
            x--;
            y--;
        }

        return [];
    }

    //BUSCANDO ARRIBA DERECHA
    searchUpRight(x, y, player) {
        var pieces = [];

        x++;
        y--;
        while (x < this.size && y >= 0) {
            if (!this.board[x][y]) {
                return false;
            }
            if (this.board[x][y] === player.color) {
                if (pieces.length === 0) {
                    return false;
                } else {
                    return pieces;
                }
            }
            pieces.push({ x: x, y: y });
            x++;
            y--;
        }

        return [];
    }

    //BUSCANDO ABAJO IZQUIERDA
    searchDownLeft(x, y, player) {
        var pieces = [];

        x--;
        y++;
        while (x >= 0 && y < this.size) {
            if (!this.board[x][y]) {
                return false;
            }
            if (this.board[x][y] === player.color) {
                if (pieces.length === 0) {
                    return false;
                } else {
                    return pieces;
                }
            }
            pieces.push({ x: x, y: y });
            x--;
            y++;
        }

        return [];
    }
    
    //BUSCANDO ABAJO DERECHA
    searchDownRight(x, y, player) {
        var pieces = [];

        x++;
        y++;
        while (x < this.size && y < this.size) {
            if (!this.board[x][y]) {
                return false;
            }
            if (this.board[x][y] === player.color) {
                if (pieces.length === 0) {
                    return false;
                } else {
                    return pieces;
                }
            }
            pieces.push({ x: x, y: y });
            x++;
            y++;
        }

        return [];
    }
    
    getOpponentPosition(x, y, player) {
        var pieces = [];

        if (this.board[x][y]) {
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
    
    getPlayer(actualPlayer, opp) {
        var player;

        if (!opp) {
            player = this.players[actualPlayer];
        } else {
            player = this.players[actualPlayer ? 0 : 1];
        }

        return player;
    }
    
    validMove(x, y, actualPlayer) {
        var player = this.getPlayer(actualPlayer);

        return this.getOpponentPosition(x, y, player).length !== 0;
    }
    
    getAllValidMoves(actualPlayer) {
        var validMoves = [];

        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                if (this.validMove(x, y, actualPlayer)) {
                    validMoves.push({ x: x, y: y });
                }
            }
        }

        return validMoves;
    }
    
    shift(x, y, actualPlayer) {
        var player = this.getPlayer(actualPlayer);
        var otherPlayer = this.getPlayer(actualPlayer, true);

        var pieces = this.getOpponentPosition(x, y, player);

        for (var i = 0; i < pieces.length; i++) {
            var piece = pieces[i];

            this.board[piece.x][piece.y] = player.color;
        }
        this.board[x][y] = player.color;

        player.qtdPieces += pieces.length + 1;
        otherPlayer.qtdPieces -= pieces.length;
    }
}