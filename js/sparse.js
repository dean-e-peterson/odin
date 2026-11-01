"use strict"; // Remove if this becomes/is loaded as a module.

function generate()
{
    const sparseCombos = [[0, 1, 3], [0, 2, 3]];
    const ulCombos = document.getElementById("combos");
    ulCombos.innerHTML = "";
    insertCombos(ulCombos, sparseCombos);
}

function insertCombos(ul, combos)
{
    const liNumber = document.createElement("li");
    const liRulers = document.createElement("li");
    liNumber.innerHTML = "0&nbsp;&nbsp;&nbsp;&nbsp;5";
    liRulers.innerHTML = "|&nbsp;&nbsp;&nbsp;&nbsp;|";
    ul.append(liNumber);
    ul.append(liRulers);
    for (const combo of combos)
    {
        const li = document.createElement("li");
        li.innerHTML = comboToString(combo);
        ul.append(li)
    }
}

// Assumes combo is in increasing order.
function comboToString(combo)
{
    let result = "";
    for (const value of combo)
    {
        if (value > result.length)
            result += repeat(" ", value - result.length);
        result += ".";
    }
    return result;
}

// https://stackoverflow.com/a/5450113/8491301
function repeat(pattern, count) {
    if (count < 1) return '';
    var result = '';
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
}
