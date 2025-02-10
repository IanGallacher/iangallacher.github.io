var ta = document.getElementById('life'), infinite = document.getElementById('infinite'), timeout = null;
function getWidth(input) {
    return input.split('\n').reduce(function (prev, cur) { return Math.max(prev, cur.length); }, 0);
}
function isColEmpty(input, x) {
    var lines = input.split('\n');
    for (var y = 0; y < lines.length; y++) {
        if (['', ' '].indexOf(lines[y].charAt(x)) === -1) return false;
    }
    return true;
}
function isRowEmpty(input, y) {
    return input.split('\n')[y].trim() === '';
}
function iterate() {
    if (infinite.checked) {
        ta.value = trim(life(pad(ta.value)));
        resize();
    } else {
        ta.value = life(ta.value);
    }
}
function removeCol(input, col) {
    var lines = input.split('\n');
    for (var y = 0; y < lines.length; y++) {
        lines[y] = lines[y].slice(0, col) + lines[y].slice(col + 1);
    }
    return lines.join('\n');
}
function resize() {
    ta.rows = (ta.value.match(/\n/g) || []).length + 1;
}
function pad(input) {
    if (!isRowEmpty(input, 0)) input = '\n' + input;  // top
    if (!isRowEmpty(input, input.split('\n').length - 1)) input += '\n';  // bottom

    if (!isColEmpty(input, 0)) {  // left
        for (var lines = input.split('\n'), row = 0; row < lines.length; row++) lines[row] = ' ' + lines[row];
        input = lines.join('\n');
    }

    if (!isColEmpty(input, getWidth(input) - 1)) {  // right
        for (var lines = input.split('\n'), row = 0; row < lines.length; row++) lines[row] += ' ';
        input = lines.join('\n');
    }
    return input;
}
function trim(input) {  // trim border by 1 unit if at least 2 units wide/high, prevents oscillating edges
    if (isRowEmpty(input, 0) && isRowEmpty(input, 1))  // top
        input = input.split('\n').slice(1).join('\n');

    var height = input.split('\n').length;
    if (isRowEmpty(input, height - 1) && isRowEmpty(input, height - 1))  // bottom
        input = input.split('\n').slice(0, height - 1).join('\n');

    if (isColEmpty(input, 0) && isColEmpty(input, 1))  // left
        input = removeCol(input, 0);

    var width = getWidth(input);
    if (isColEmpty(input, width - 1) && isColEmpty(input, width - 2))  // right
        input = removeCol(input, width - 1);

    return input;
}

// buttons
function addPadding() {
    ta.value = '\n ' + ta.value.replace(/\n/g, ' \n ') + ' \n';
    resize();
}
function load(sel) {
    function random (width, height, p) {
        for (var ret = '', y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                ret += Math.random() < p ? ' ' :
                    String.fromCharCode(Math.random() * 26 + (Math.random() < .5 ? 65 : 97) | 0);
            }
            if (y < height - 1) ret += '\n';
        }
        return ret;
    }
    stop();
    ta.value =
        sel === 'ex1' ? ' **\n**\n *' :
            sel === 'ex2' ? ' He\nll\n o' :
                sel === 'ex3' ? 'What?\nThis is exceedingly silly.\nReally, we would like some ACTUAL programming challenges around here.' :
                    sel === 'src' ? life.toString().replace(/\t/g, '    ') :
                        sel === 'rnd' ? random(prompt('Width', 100)|0, prompt('Height', 30)|0, (prompt('Empty percentage', 75)|0) / 100) : ''
    resize();
}
function run() {
    if (timeout) return;
    (function auto() {
        iterate();
        timeout = setTimeout(auto, document.getElementById('interval').value);
    })();
}
function step() {
    stop();
    iterate();
}
function stop() {
    timeout = clearTimeout(timeout);
}

load('src');
onload = ta.oninput = resize;/**
 * Created by DrShenanigan on 10/2/2015.
 */
