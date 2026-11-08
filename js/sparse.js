"use strict"; // Remove if this becomes an ES6 module.

function generate()
{
    const length = parseInt(document.getElementById("length").value);
    const ones = parseInt(document.getElementById("ones").value);

    const bitCombos = generateCompleteBitCombos(length, ones);
    //const combos = bitCombos.map((b) => { new Combo(b) });
    const combos = bitCombos;
    const ulCombos = document.getElementById("combos");
    ulCombos.innerHTML = "";
    insertCombos(ulCombos, length, combos);
}

function insertCombos(ul, length, combos)
{
    const liNumber = document.createElement("li");
    const liRulers = document.createElement("li");
    liNumber.innerHTML = "0    5   10   15   20   25   30".replaceAll(" ", "&nbsp;");
    liRulers.innerHTML = "|    |    |    |    |    |    |".replaceAll(" ", "'");
    ul.append(liNumber);
    ul.append(liRulers);
    for (const combo of combos)
    {
        const li = document.createElement("li");
        //li.innerHTML = comboToString(length, combo).replaceAll(" ", "&nbsp;");
        const comboObj = new Combo(combo);
        li.innerHTML = comboObj.toString(length).replaceAll(" ", "&nbsp;");
        ul.append(li)
    }
}

function* generateCompleteBitCombos(length, onesCount)
{
    const gen = generateBitCombos(length, onesCount);
    let genNext = gen.next();
    while (!genNext.done)
    {
        if (isCompleteBitCombo(length, genNext.value))
        {
            yield genNext.value
        }
        genNext = gen.next();
    }
}

function isCompleteBitCombo(length, bitCombo)
{
    let result = true
    for (let i = 1; i <= length; i++)
    {
        result = result && ((bitCombo & (bitCombo << i)) > 0);
        // console.log(`result: ${result}, bitCombo: ${bitCombo}, bitCombo << ${i}: ${bitCombo << i}`);
    }
    return result;
}

function* generateBitCombos(length, onesCount)
{
    let bitCombo = (1 << onesCount) - 1;
    const overflow = 1 << (length + 1);
    //console.log(`overflow: ${overflow}`);
    while (bitCombo < overflow)
    {
        yield bitCombo;
        //console.log(`bitCombo: ${bitCombo}`);
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
