const startGameBtn = document.getElementById('start-game-btn');

function startGame() {
    console.log("Game is Starting....");
}

const person  = {
    name : 'Max',
    greet : function f(a, b) {
        console.log("Greet called " + (a + b));
    }
}

person.greet(2, 3);
console.dir(startGame);
