boardHeight = 500;
boardWidth = 500;
var canvas = document.getElementById("myCanvas");
var canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = "#2d35ff";
gameState = createArray(boardWidth);
gameNextState = createArray(boardWidth);

fillGame();
startGame();

function startGame() {
    drawGrid();
    updateGrid();
    requestAnimationFrame(startGame);
}

function fillGame() {
    for (var j = 1 ; j < boardHeight ; j++) {
        for (var k = 1; k < boardWidth; k++) {
            if (k % 19 === 0) {
                gameState[j][k] = Math.round(Math.random());

            } else {
                gameState[j][k] = 0;

            }

        }
    }
//   gameState['50']['32'] = 1;
//   gameState['51']['32'] = 1;
//   gameState['53']['32'] = 1;
//   gameState['54']['32'] = 1;
//   gameState['50']['31'] = 1;
//   gameState['50']['33'] = 1;

//   gameState['100']['32'] = 1;
//   gameState['101']['32'] = 1;
//   gameState['103']['32'] = 1;
//   gameState['104']['32'] = 1;
//   gameState['100']['31'] = 1;
//   gameState['100']['33'] = 1;

//   gameState['150']['32'] = 1;
//   gameState['151']['32'] = 1;
//   gameState['153']['32'] = 1;
//   gameState['154']['32'] = 1;
//   gameState['150']['31'] = 1;
//   gameState['150']['33'] = 1;
}

function createArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

function drawGrid() {
    var liveCount = 0;
    canvasContext.clearRect(0, 0, boardHeight, boardWidth);
    for (var j = 1; j < boardHeight; j++) {
        for (var k = 1; k < boardWidth; k++) {
            if (gameState[j][k] === 1) {
                canvasContext.fillRect(j, k, 1, 1);
                liveCount++;
            }
        }
    }
}

function updateGrid() {
    for (var j = 1; j < boardHeight - 1; j++) {
        for (var k = 1; k < boardWidth - 1; k++) {
            var neighbours = 0;
            neighbours += gameState[j - 1][k - 1];
            neighbours += gameState[j - 1][k];
            neighbours += gameState[j - 1][k + 1]

            neighbours += gameState[j + 1][k - 1];
            neighbours += gameState[j + 1][k];
            neighbours += gameState[j + 1][k + 1]

            neighbours += gameState[j][k - 1];
            neighbours += gameState[j][k + 1];

            switch(neighbours) {
                case 3:
                    gameNextState[j][k] = 1;
                    break;
                case 2:
                    gameNextState[j][k] = gameState[j][k];
                    break;
                default:
                    gameNextState[j][k] = 0;
            }
        }

    }
    gameState = gameNextState;
}



