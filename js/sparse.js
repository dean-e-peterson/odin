"use strict"; // Remove if this becomes an ES6 module.

function generate()
{
    const rulerImplementation = getImplementation();
    const combos = rulerImplementation.generateCompleteCombos();
    const ulCombos = document.getElementById("combos");
    ulCombos.innerHTML = "";

    const startTimeMs = Date.now();
    const comboCount = insertCombos(ulCombos, length, combos);
    const elapsedTimeMs = Date.now() - startTimeMs;

    const divStatus1 = document.getElementById("status1");
    divStatus1.innerText = `Returned ${comboCount} rulers in ${elapsedTimeMs / 1000} seconds.`;
}

function getImplementation()
{
    const length = parseInt(document.getElementById("length").value);
    const tickCount = parseInt(document.getElementById("tickCount").value);
    const selectedImplementation = document.getElementById("implementation").value;
    switch (selectedImplementation)
    {
        case "RulerJsInt":
            return new RulerJsInt(length, tickCount);
        case "RulerJsBigInt":
            return new RulerJsBigInt(length, tickCount);
    }
}

function insertCombos(ul, length, combos)
{
    const liNumber = document.createElement("li");
    const liRulers = document.createElement("li");
    liNumber.innerHTML = "0    5   10   15   20   25   30   35   40   45   50".replaceAll(" ", "&nbsp;");
    liRulers.innerHTML = "|    |    |    |    |    |    |    |    |    |    |".replaceAll(" ", "'");
    ul.append(liNumber);
    ul.append(liRulers);
    let count = 0;
    for (const combo of combos)
    {
        count++;
        const li = document.createElement("li");
        li.innerHTML = combo.toString(length).replaceAll(" ", "&nbsp;");
        ul.append(li)
    }
    return count;
}
