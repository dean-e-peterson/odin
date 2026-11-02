"use strict"; // Remove if this becomes/is loaded as a module.

function generate()
{
    const length = document.getElementById("length").value;
    //const sparseCombos = [[0, 1, 3], [0, 2, 3]];
    //const sparseBitCombos = [1 + 2 + 8, 1 + 4 + 8];
    //const sparseCombos = bitCombosToCombos(sparseBitCombos);

    const bitCombos = generateBitCombos(length, 3);
    const combos = bitCombosToCombos(bitCombos);
    const ulCombos = document.getElementById("combos");
    ulCombos.innerHTML = "";
    insertCombos(ulCombos, length, combos);
}

function insertCombos(ul, length, combos)
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
        li.innerHTML = comboToString(length, combo).replace(/ /, "&nbsp;");
        ul.append(li)
    }
}

// function comboToString(length, combo)
// {
//     let result = repeat(" ", length);
//     for (const value of combo)
//     {
//         result[value] = ".";
//     }
//     return result;
// }

// Assumes combo is in increasing order.
function comboToString(length, combo)
{
    let result = "";
    let value = 0;
    for (let i = 0; i < combo.length; i++)
    {
        value = combo[i];
        result += repeat(" ", value - result.length);
        result += ".";
    }
    result += repeat(" ", length - value);
    return result;
}

function bitCombosToCombos(bitCombos)
{
    let results = [];
    for (const bitCombo of bitCombos)
    {
        results.push(bitComboToCombo(bitCombo))
    }
    return results;
}

// Convert an integer bitwise combo with the one bits representing the values in the combo to an array.
function bitComboToCombo(bitCombo)
{
    let results = [];
    let value = 0
    while (bitCombo > 0)
    {
        if (bitCombo & 1 > 0)
        {
            results.push(value);
        }
        bitCombo = bitCombo >>> 1;
        value++;
    }
    return results;
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

function* generateBitCombos(length, onesCount)
{
    let bitCombo = (1 << onesCount) - 1;
    const overflow = 1 << length;
    while (bitCombo < overflow)
    {
        yield bitCombo;
        bitCombo = next(bitCombo);
    }
}

// Return next integer with same number of one bits using Gosper's hack
// https://iamkate.com/code/hakmem-item-175/
function next(n) {
    let lowestBit   = n & -n
    let leftBits    = n + lowestBit
    let changedBits = n ^ leftBits
    let rightBits   = (changedBits / lowestBit) >>> 2
    return (leftBits | rightBits)
}
