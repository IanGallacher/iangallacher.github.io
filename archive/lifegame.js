/**
 * Created by DrShenanigan on 10/1/2015.
 */


// Requires lifeframework.js

// The framework is just data structures. Anything UI specific goes here.
// That way we can still include the framework into other projects without breaking anything else.


var area = document.querySelector('#game-board');
if (area.addEventListener) {
    area.addEventListener('input', function() {
        GameBoardObj.ParseText(area.value);
    }, false);
}

DrawGameBoard();