/**
 * Created by DrShenanigan on 9/30/2015.
 */

function GameBoard(width, height) {
    this.width = width;
    this.height = height;
    var theBoard = [];

    this.init = function () {
        for (var y = 0; y < height; y++) {
            theBoard[y] = new Array(width);
            for (var x = 0; x < width; x++) {
                var random = Math.floor(Math.random() + 0.3); //.3 is to give plenty of blank squares
                if (random == "1")
                    theBoard[y][x] = "*";
                else
                    theBoard[y][x] = " ";
            }
        }
    };

    this.init();

    this.clear = function () {
        for (var y = 0; y < height; y++) {
            theBoard[y] = new Array(width);
            for (var x = 0; x < width; x++) {
                theBoard[y][x] = " ";
            }
        }
    };

    this.getCoord = function (x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height)
            return theBoard[y][x];
        else
            return "-1";
    };

    // we can return true or false to tell if the code managed to change the value.
    this.setCoord = function (x, y, val) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            theBoard[y][x] = val;
            return true;
        }
        else {
            console.log("Tried to set an invalid number");
            return false;
        }

    };
    this.theArray = function () {
        return theBoard;
    };

    this.getNumberOfNeighbors = function (x, y) {
        var theneighbors = 0;
        if (this.getCoord(x - 1, y) != " " && this.getCoord(x - 1, y).length === 1) {
            theneighbors++;
        }
        if (this.getCoord(x + 1, y) != " " && this.getCoord(x + 1, y).length === 1) {
            theneighbors++;
        }
        if (this.getCoord(x, y - 1) != " " && this.getCoord(x, y - 1).length === 1) {
            theneighbors++;
        }
        if (this.getCoord(x, y + 1) != " " && this.getCoord(x, y + 1).length === 1) {
            theneighbors++;
        }
        if (this.getCoord(x - 1, y - 1) != " " && this.getCoord(x - 1, y - 1).length === 1) {
            theneighbors++;
        }
        if (this.getCoord(x + 1, y + 1) != " " && this.getCoord(x + 1, y + 1).length === 1) {
            theneighbors++;
        }
        if (this.getCoord(x + 1, y - 1) != " " && this.getCoord(x + 1, y - 1).length === 1) {
            var nockers = this.getCoord(x + 1, y - 1);
            theneighbors++;
        }
        if (this.getCoord(x - 1, y + 1) != " " && this.getCoord(x - 1, y + 1).length === 1) {
            theneighbors++;
        }
        return theneighbors;
    };

    this.ParseText = function (text) {
        var textArray = text.split('\n');
        for (var y = 0; y < height; y++) {
            theBoard[y] = new Array(width);
            for (var x = 0; x < width; x++) {
                theBoard[y][x] = textArray[y].charAt(x); //.3 is to give plenty of blank squares
            }
        }
    }
}


var GameBoardObj = new GameBoard(70, 20);

var GameBoardTmp = new GameBoard(70, 20);

var GameBoardString = "";

var GameRunning = false;

function DrawGameBoard() {
    GameBoardString = "";
    for (var y = 0; y < GameBoardObj.height; y++) {
        for (var x = 0; x < GameBoardObj.width; x++) {
            GameBoardString += GameBoardObj.getCoord(x, y);
        }
        GameBoardString += "\n";
    }
    document.getElementById("game-board").value = GameBoardString;
}


/*
 Any cell that is alive and zero or just one living neighbor is dead in the next generation.
 Any cell that is alive and has two or three living neighbors lives happily on to the next generation.
 Any cell that is alive and has four or more neighbors get "smothered" and is dead in the next generation.
 Any cell that is dead and has exactly three neighbors is "born", and is thus alive in the next generation.
 */

function GameStep() {
    //Apply all the rules. We have to use two arrays otherwise changing cells with change the results of the other cells
    for (var y = 0; y < GameBoardObj.height; y++) {
        for (var x = 0; x < GameBoardObj.width; x++) {
            var neighbors = GameBoardObj.getNumberOfNeighbors(x, y);
            if (GameBoardObj.getCoord(x, y) == " ") { // the space character is a dead cell
                if (neighbors == 3)
                    GameBoardTmp.setCoord(x, y, GetLocalValue(x,y));
                else GameBoardTmp.setCoord(x, y, " ");
            } else {
                if (neighbors <= 1)
                    GameBoardTmp.setCoord(x, y, " ");
                else if (neighbors >= 4)
                    GameBoardTmp.setCoord(x, y, " ");
                else
                    GameBoardTmp.setCoord(x, y, GetLocalValue(x,y));
            }
        }
    }

    // Copy the object from the tmp to the original.
    for (var y = 0; y < GameBoardObj.height; y++) {
        for (var x = 0; x < GameBoardObj.width; x++) {
            GameBoardObj.setCoord(x, y, GameBoardTmp.getCoord(x, y));
        }
    }
}

function GetLocalValue(x,y)
{
    for(var row = -1; row<=1;row++)
    {
        for(var col=-1;col<=1;col++)
        {
            if(GameBoardObj.getCoord(x+col,y+row) != " " && GameBoardObj.getCoord(x+col,y+row) != "-1")
            {
                return GameBoardObj.getCoord(x+col,y+row);
                break;
            }
        }
    }
    return "*";
}

// UI Functions
function DisableGameBoard()
{
    var gameboard = document.getElementById("game-board");
    gameboard.disabled = true;
    gameboard.className = "game-board-disabled";
}

function EnableGameBoard()
{
    var gameboard = document.getElementById("game-board");
    gameboard.disabled = false;
    gameboard.className = "game-board-enabled";
}

function GameRun() {
    if(GameRunning == true){
		GameStep();
		setTimeout( function() { GameRun(); },300);
        DrawGameBoard();
		console.log("asdf");
	}
}

function GameStop(){
    GameRunning = false;
    EnableGameBoard();
}

function btnStart() {
    GameRunning = true;
    DisableGameBoard();
	
	// We don't want to run the game right away for UX reasons.
	// Changing the background and the content is confusing. 
	setTimeout( function() { GameRun(); },100);
}

function btnStop() {
	// Even though there is only one function inside this function,
	// we are seperating the btn callbacks and functionality.
	GameStop();
}

function btnStep() //This is called when we press the gamestart button. Try to seperate this logic later. 
{
    // Don't update if the game is running and taking care of updates for us.
    if(GameRunning == false){
        GameStep();
        DrawGameBoard();
    }
}
function btnReset() {
    GameStop();
    GameBoardObj.init();
    DrawGameBoard();
}


function btnClear() {
    GameStop();
    GameBoardObj.clear();
    DrawGameBoard();
}