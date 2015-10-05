/**
 * Created by DrShenanigan on 10/1/2015.
 */

// Requires lifeframework.js (included) and bootstrap.css (not included)

// Yes, I am aware that using innerHTML opens me up for potential cross site scripting attacks.
// However, I believe coding it this way makes the code more readable and easier to maintain.
// As this is for internal tests only, the end user will never be open for attack.
function TestGameBoardGet() {
    var result = "";
    var testFailed = false;
    var GameBoardTest = new GameBoard(3, 3);

    if (GameBoardTest.getCoord(-1, 0) != "-1") {
        result += "<div class='alert alert-danger' role='alert'>Managed to get negative x coord</div>";
        testFailed = true;
    }
    if (GameBoardTest.getCoord(GameBoardTest.width, 0) != "-1") {
   //     result += "<div class='alert alert-danger' role='alert'>Managed to get x coord larger than the valid width</div>";
        testFailed = true;
    }

    if (GameBoardTest.getCoord(0, -1) != "-1") {
        result += "<div class='alert alert-danger' role='alert'>Managed to get negative y coord</div>";
        testFailed = true;
    }

    if (GameBoardTest.getCoord(0, GameBoardTest.height) != "-1") {
        result += "<div class='alert alert-danger' role='alert'>Managed to get y coord larger than the valid height</div>";
        testFailed = true;
    }

    if (testFailed == false) {
        result += "<div class='alert alert-success' role='alert'>Game board getting has passed.</div>";
    }
    return result;
}

function TestGameBoardSet() {
    var result = "";
    var testFailed = false;
    var GameBoardTest = new GameBoard(3, 3);
    //what happens with the wrong number of arguments?

    if (GameBoardTest.setCoord(-1, 0, "0") == true) {
        result += "<div class='alert alert-danger' role='alert'>Managed to set negative x coord</div>";
        testFailed = true;
    }
    if (GameBoardTest.setCoord(GameBoardTest.width, 0, "0") == true) {
        result += "<div class='alert alert-danger' role='alert'>Managed to set x coord larger than the valid width</div>";
        testFailed = true;
    }

    if (GameBoardTest.setCoord(0, -1, "0") == true) {
        result += "<div class='alert alert-danger' role='alert'>Managed to set negative y coord</div>";
        testFailed = true;
    }

    if (GameBoardTest.setCoord(0, GameBoardTest.height, "0") == true) {
        result += "<div class='alert alert-danger' role='alert'>Managed to set y coord larger than the valid height</div>";
        testFailed = true;
    }

    if (testFailed == false) {
        result += "<div class='alert alert-success' role='alert'>Game board setting has passed.</div>";
    }
    return result;
}

function TestGameBoardNoNeighbors() {
    var result = "";
    var testFailed = false;

    var GameBoardTest = new GameBoard(3, 3);


    // Test every possible square. The important ones are the different edges and corners.
    // All the center peices will behave the same due to how the getters and setters are made.
    // Rather than writting 9+ different test cases, its easier to iterate through the entire board.
    for (var row = 0; row < GameBoardTest.height; row++) {
        for (var col = 0; col < GameBoardTest.width; col++) {
            // Set up the gameboard for the next test.
            for (var y = 0; y < GameBoardTest.height; y++) {
                for (var x = 0; x < GameBoardTest.width; x++) {
                    if (row == y && col == x) {
                        GameBoardTest.setCoord(x, y, "1");
                    } else {
                        GameBoardTest.setCoord(x, y, " ");
                    }
                }
            }
            var neighbors = GameBoardTest.getNumberOfNeighbors(col, row);
            if (neighbors != 0) {
                result += "<div class='alert alert-danger' role='alert'>Lone tile failed at "
                    + row+", "+ col + ", " + neighbors + "</div>";

                testFailed = true;
            }
        }
    }

    if (testFailed == false) {
        result += "<div class='alert alert-success' role='alert'>Lone neighbor test has passed.</div>";
    }
    return result;
}

function TestGameBoardSingleNeighbor()
{
    var result = "";
    var testFailed = false;

    var GameBoardTest = new GameBoard(3, 3);

    // Test for a single neighbor.
    // Now that we are in the land of multiple live tiles, we can't test every test case as easy as lone tiles.
    // Not every board position will be tested.

    for (var row = 0; row < GameBoardTest.height; row++) {
        for (var col = 0; col < GameBoardTest.width; col++) {
            // Set up the gameboard for the next test.
            for (var y = 0; y < GameBoardTest.height; y++) {
                for (var x = 0; x < GameBoardTest.width; x++) {

                    // Create the tile we are testing
                    if (row == y && col == x) {
                        GameBoardTest.setCoord(x, y, "1");
                    } else {
                        GameBoardTest.setCoord(x, y, " ");
                    }
                }
            }
            // once the Game board is set up, it is safe to place the neighbor tiles
            // without fear of them being overwritten

            //test to see if the tile to the right exists.
            if (GameBoardTest.getCoord(row + 1, col) != "-1") {
                GameBoardTest.setCoord(row + 1, col, "1");

                // if the tile to the right does not exist, place it below the current tile
            } else if (GameBoardTest.getCoord(row, col + 1) != "-1") {
                GameBoardTest.setCoord(row, col + 1, "1");

                // if the tile to the below does not exist, place it above the current tile
                // Yes, we have technically tested that scenario before, but lets just try to make it pass for sane code.
            } else if (GameBoardTest.getCoord(row, col-1) != "-1") {
                GameBoardTest.setCoord(row, col-1, "1");
            }

            var neighbors = GameBoardTest.getNumberOfNeighbors(col, row);
            if (neighbors != 1) {
                result += "<div class='alert alert-danger' role='alert'>Single Neighbor test failed at "
                    + row+", "+col + "</div>";

                testFailed = true;
            }
        }
    }

    if (testFailed == false) {
        result += "<div class='alert alert-success' role='alert'>Game board single neighbor has passed.</div>";
    }
    return result;
}

function RunTests() {

    var testResult = document.getElementById("test-result");
    testResult.innerHTML = "";

    testResult.innerHTML += TestGameBoardGet();
    testResult.innerHTML += TestGameBoardSet();
    testResult.innerHTML += TestGameBoardNoNeighbors();
    testResult.innerHTML += TestGameBoardSingleNeighbor();
}

// This used to be powered by a button, but opening the webpage should be enough. Clicking the button is annoying.

