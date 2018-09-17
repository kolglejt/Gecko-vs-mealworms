let again = document.querySelector('#play-again');
again.addEventListener('click', function () {
    window.location.reload();
});

function Gecko(x, y, direction) { //gecko position

    this.x = 0;
    this.y = 0;
    this.direction = "right";


}

function Worm(x,y) { //position of worm

    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);

}

function Game(board, gecko, worm, score) {

    this.board = document.querySelectorAll("#board div");

    this.gecko = new Gecko();

    this.worm = new Worm();

    this.score = 0;

    this.on = true;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showGecko = function () {

        this.board[this.index(this.gecko.x, this.gecko.y)].classList.add("gecko");

    };

    this.showWorm = function () {

        this.board[this.index(this.worm.x, this.worm.y)].classList.add("worm");
    };

    this.startGame = function () {

        var self = this;

        this.idSetInterval = setInterval(function () {

            self.moveGecko();
        }, 250); // przypisanie funkcji do zmiennej by pobrac ID

        self.showWorm();
        self.showGecko();
        self.gameOver();

    };

    this.moveGecko = function () {

        var self = this;

        self.hideVisibleGecko();


        if (this.gecko.direction === "right") {
            this.gecko.x = this.gecko.x + 1;
        }
        else if (this.gecko.direction === "left") {
            this.gecko.x = this.gecko.x - 1;
        }
        else if (this.gecko.direction === "up") {
            this.gecko.y = this.gecko.y - 1;
        }
        else if (this.gecko.direction === "down") {
            this.gecko.y = this.gecko.y + 1;
        }

        self.gameOver();
        if (!this.on) {
            return;
        }
        self.checkWormCollision(); // check collision with worm
        self.showGecko();
        self.turnGecko();


    };

    this.hideVisibleGecko = function () {

        var element = document.querySelector(".gecko");

        element.classList.remove("gecko");
    };

    document.addEventListener('keydown', function (event) {
        game.turnGecko(event);
    });

    this.turnGecko = function (event) {

        switch (event.keyCode) {
            case 37:
                this.gecko.direction = 'left';
                break;
            case 39:
                this.gecko.direction = 'right';
                break;
            case 38:
                this.gecko.direction = 'up';
                break;
            case 40:
                this.gecko.direction = 'down';
                break;
        }

    };

    this.checkWormCollision = function () {

        var result = document.querySelector("#score div strong");


        if ((this.gecko.x === this.worm.x) && (this.worm.y === this.gecko.y)) {

            var self = this;

            document.querySelector(".worm").classList.remove("worm"); // delete worm

            var score = ++this.score; //+1 to score

            result.innerText = score; //show score



            this.worm = new Worm();
            self.showWorm();

        }



    };

    this.gameOver = function () {

        if (this.gecko.x < 0 || this.gecko.x > 9 || this.gecko.y < 0 || this.gecko.y > 9 )
        {

           /* clearInterval(this.idSetInterval);
            alert ("Game over");
            this.hideVisibleGecko();*/

            const sections = document.querySelectorAll("section");
            const scored = sections[2].querySelector("span");
            sections[0].classList.add("invisible");
            sections[1].classList.add("visible");
            sections[1].classList.add("lol");
            sections[2].classList.add("visible");


            scored.innerText = this.score;
            clearInterval(this.idSetInterval);
        }
        }
}

var game = new Game();

game.showWorm();
game.showGecko();
game.startGame();

document.addEventListener("keydown", function (event) {
    game.turnGecko(event);
});
