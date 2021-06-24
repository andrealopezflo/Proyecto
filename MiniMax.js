function MiniMax(actualPlayer) {
    this.actualPlayer = actualPlayer;
    this.maxDepth = 5;
}
  
MiniMax.prototype.move = function(board) {
    this.visits = 0;
    var res = this.minimax(board, 0, this.actualPlayer, this.maxDepth, -100000, 100000);
    console.log("Total nodes: " + this.visits);
    return res;
}

MiniMax.prototype.minimax = function(board, depth, actualPlayer, maxDepth, alpha, beta) {
    this.visits++;
    var newBoard, score, move, bestMove;
    var moves = board.getAllValidMoves(actualPlayer);

    if(depth >= maxDepth || moves.length === 0){
        var he = this.mobility(board, actualPlayer);
        return he;
    }
    if(actualPlayer === this.actualPlayer){
        // Maximize
        for (var i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            newBoard = board.copyBoard();
            this.doMove(newBoard, move, actualPlayer);
            score = this.minimax(newBoard, (depth + 1), (actualPlayer ? 0 : 1), maxDepth, alpha, beta);
            move.score = score;
            if(score > alpha){
                alpha = score;
                bestMove = move;
            }
            if(beta <= alpha){
                break;
            }
        }
        if(depth === 0){
            return bestMove;
        } else {
            return alpha;
        }
    } else {
        // Minimize
        for (var i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            newBoard = board.copyBoard();
            this.doMove(newBoard, move, actualPlayer);
            score = this.minimax(newBoard, (depth + 1), (actualPlayer ? 0 : 1), maxDepth, alpha, beta);
            if(score < beta){
                beta = score;
            }
            if(beta <= alpha){
                break;
            }
        }
        return beta;
    }
}

MiniMax.prototype.doMove = function(board, move, actualPlayer) {
    board.shift(move.x, move.y, actualPlayer);
}

MiniMax.prototype.mobility = function(board, actualPlayer) {
    var aiMoves = board.getAllValidMoves(actualPlayer).length;
    var oppMoves = board.getAllValidMoves(actualPlayer ? 0 : 1).length;
    return Math.ceil((oppMoves + aiMoves) === 0 ? 0 : 100 * ((aiMoves - oppMoves)/(aiMoves + oppMoves)));
}
  