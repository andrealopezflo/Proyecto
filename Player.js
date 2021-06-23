function Player(name, number, isIa) {
    this.name = name;
    this.number = number;
    this.isIa = isIa;
    this.color = number === 0 ? "black" : "white";

    if(this.isIa){
        this.IA = new IA(this.number);
    }
}

Player.prototype.getMove = function(board) {
    return this.IA.move(board);
}