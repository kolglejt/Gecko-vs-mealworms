
function Furry(x, y, direction) { //pozycja początkowa furry

    this.x = 0;
    this.y = 0;
    this.direction = "right";


}

function Coin(x,y) { //pozycja monety na planszy

    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);

}

function Game(board, furry, coin, score) {

    this.board = document.querySelectorAll("#board div");

    this.furry = new Furry();

    this.coin = new Coin();

    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {

        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");

    };

    this.showCoin = function () {

        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    };

    this.startGame = function () {

        var self = this;

        this.idSetInterval = setInterval(function () {

            self.moveFurry();
        }, 250); // przypisanie funkcji do zmiennej by pobrac ID

        self.showCoin();
        self.showFurry();
        self.gameOver();

    };

    this.moveFurry = function () {

        var self = this;

        self.hideVisibleFurry();

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        }
        else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        }
        else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        }
        else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }


        self.gameOver();
        self.checkCoinCollision(); // sprawdzam, czy występuje kolizja z monetą
        self.showFurry();
        self.turnFurry();



    };

    this.hideVisibleFurry = function () {

        var element = document.querySelector(".furry");

        element.classList.remove("furry");
    };

    this.turnFurry = function (event) {

        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }


    };

    this.checkCoinCollision = function () {

        var result = document.querySelector("#score div strong");


        if ((this.furry.x === this.coin.x) && (this.coin.y === this.furry.y)) {

            var self = this;

            document.querySelector(".coin").classList.remove("coin"); // usuwa monetę z ekranu

            var score = ++this.score; //dodaje 1 do wyniku

            result.innerText = score; //pokazuje wynik na ekranie


            this.coin = new Coin();
            self.showCoin();

        }



    };

    this.gameOver = function () {

        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9 )
        {

            clearInterval(this.idSetInterval);

            alert ("Game over");


            this.hideVisibleFurry();


        }
    }

}


var game = new Game();

game.showCoin();
game.showFurry();
game.startGame();

document.addEventListener("keydown", function (event) {
    game.turnFurry(event);
});
