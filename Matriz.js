class Matriz {
    constructor() {
        /*
        Estado inicial
            2  2  2  2  2  2  2  2
            2  2  2  2  2  2  2  2
            2  2  2  2  2  2  2  2
            2  2  2  1  0  2  2  2
            2  2  2  0  1  2  2  2
            2  2  2  2  2  2  2  2
            2  2  2  2  2  2  2  2
            2  2  2  2  2  2  2  2
    
            indices de 0 - 7
            0 negro
            1 blanco
    
            https://www.luisespino.com/temp/games/reversi/random.php?turno=1&estado=2222222222222222222222222222221022222201222222222222222222222222222222
        */
        this.generateMatriz();
    }
    generateMatriz() {
        //var recibe = "22222222 22222222 22222222 22210222 22201222 22222222 22222222 22222222"
        var recibe = "2222222222222222222222222221022222201222222222222222222222222222";
        //var recibe = "2222222222210222222101122221022222110222212202221222022222220222"
        //             1234567812345678123456781234567812345678123456781234567812345678
        //             |       |       |       |       |       |       |       |        
        var space = recibe.replaceAll('2', '2 ').replaceAll('1', '1 ').replaceAll('0', '0 ');
        var position = space.split(' ');

        var matriz = [];
        for (var x = 0; x < 8; x++) {
            matriz[x] = [];
            for (var y = 0; y < 8; y++) {
                var num = this.separate(position);
                if (num == 0) {
                    matriz[x][y] = "black";
                } else if (num == 1) {
                    matriz[x][y] = "white";
                } else {
                    matriz[x][y] = null;
                }
            }
        }
        this.matriz = matriz;
    }
    separate(position) {
        var number = position.shift();
        return number;
    }
}



