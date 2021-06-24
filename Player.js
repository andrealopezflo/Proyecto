function Player(name, number, isIa) {
    this.name = name;
    this.number = number;
    this.isIa = isIa;
    this.color = number === 0 ? "black" : "white";

    if(this.isIa){
        this.MiniMax = new MiniMax(this.number);
    }
}

Player.prototype.getMove = function(board) {
    return this.MiniMax.move(board);
}