class MiniMax {
    constructor(actualPlayer) {
        this.actualPlayer = actualPlayer;
        this.maxDepth = 5;
    }

    move(board) {
        var res = this.minimax(board, 0, this.actualPlayer, this.maxDepth, -100000, 100000);
        return res;
    }

    mobility(board, actualPlayer) {
        var aiMoves = board.getAllValidMoves(actualPlayer).length;
        var oppMoves = board.getAllValidMoves(actualPlayer ? 0 : 1).length;
        return Math.ceil((oppMoves + aiMoves) === 0 ? 0 : 100 * ((aiMoves - oppMoves) / (aiMoves + oppMoves)));
    }

    doMove(board, move, actualPlayer) {
        board.shift(move.x, move.y, actualPlayer);
    }

    minimax(board, depth, actualPlayer, maxDepth, alpha, beta) {
        var newBoard, score, move, bestMove;
        var moves = board.getAllValidMoves(actualPlayer);

        if (depth >= maxDepth || moves.length === 0) {
            var he = this.mobility(board, actualPlayer);
            return he;
        }
        if (actualPlayer === this.actualPlayer) {
            // Maximize
            for (var i = moves.length - 1; i >= 0; i--) {
                move = moves[i];
                newBoard = board.copyBoard();
                this.doMove(newBoard, move, actualPlayer);
                score = this.minimax(newBoard, (depth + 1), (actualPlayer ? 0 : 1), maxDepth, alpha, beta);
                move.score = score;
                if (score > alpha) {
                    alpha = score;
                    bestMove = move;
                }
                if (beta <= alpha) {
                    break;
                }
            }
            if (depth === 0) {
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
                if (score < beta) {
                    beta = score;
                }
                if (beta <= alpha) {
                    break;
                }
            }
            return beta;
        }
    }
}