/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var again = document.querySelector('#play-again');
again.addEventListener('click', function () {
    window.location.reload();
});

again.addEventListener('mouseover', function () {

    document.getElementById('button-click').play();
});

function Gecko(x, y, direction) {
    //gecko position

    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Worm(x, y) {
    //position of worm

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
        return x + y * 10;
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
        } else if (this.gecko.direction === "left") {
            this.gecko.x = this.gecko.x - 1;
        } else if (this.gecko.direction === "up") {
            this.gecko.y = this.gecko.y - 1;
        } else if (this.gecko.direction === "down") {
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

        if (this.gecko.x === this.worm.x && this.worm.y === this.gecko.y) {

            var self = this;

            document.querySelector(".worm").classList.remove("worm"); // delete worm

            var score = ++this.score; //+1 to score

            result.innerText = score; //show score

            document.getElementById('audio').play(); //audio

            this.worm = new Worm();
            self.showWorm();
        }
    };

    this.gameOver = function () {

        if (this.gecko.x < 0 || this.gecko.x > 9 || this.gecko.y < 0 || this.gecko.y > 9) {

            document.getElementById('end').play();

            /* clearInterval(this.idSetInterval);
             alert ("Game over");
             this.hideVisibleGecko();*/

            var sections = document.querySelectorAll("section");
            var scored = sections[2].querySelector("span");
            sections[0].classList.add("invisible");
            sections[1].classList.add("visible");
            sections[1].classList.add("lol");
            sections[2].classList.add("visible");

            scored.innerText = this.score;
            clearInterval(this.idSetInterval);
        }
    };
}

var game = new Game();

game.showWorm();
game.showGecko();
game.startGame();

document.addEventListener("keydown", function (event) {
    game.turnGecko(event);
});

/***/ })

/******/ });
//# sourceMappingURL=out.js.map