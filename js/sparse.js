"use strict"; // Remove if this becomes an ES6 module.

function generate()
{
    const length = parseInt(document.getElementById("length").value);
    const ones = parseInt(document.getElementById("ones").value);

    const rulerJsInt = new RulerJsBigInt(length, ones);
    const combos = rulerJsInt.generateCompleteCombos();
    const ulCombos = document.getElementById("combos");
    ulCombos.innerHTML = "";
    insertCombos(ulCombos, length, combos);
}

function insertCombos(ul, length, combos)
{
    const liNumber = document.createElement("li");
    const liRulers = document.createElement("li");
    liNumber.innerHTML = "0    5   10   15   20   25   30   35   40".replaceAll(" ", "&nbsp;");
    liRulers.innerHTML = "|    |    |    |    |    |    |    |    |".replaceAll(" ", "'");
    ul.append(liNumber);
    ul.append(liRulers);
    for (const combo of combos)
    {
        const li = document.createElement("li");
        li.innerHTML = combo.toString(length).replaceAll(" ", "&nbsp;");
        ul.append(li)
    }
}
