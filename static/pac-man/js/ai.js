function findBest() {
    var bestArray = [];
    for (var i = 0; i < 64; i++) {
        var curChess = document.querySelector("#svg" + i);
        if (curChess.className.baseVal == "svg-cir-non") {
            validVal = checkValid("svg" + i);
            if (validVal.valid && validVal.array.length > bestArray) {
                bestArray.length = 0;
                for (var j = 0; j < validVal.array.length; j++) {
                    bestArray[j] = validVal.array[j];
                }
            }
        }
    }
    return bestArray;
}

async function elementaryAI() {
    await sleep(2000);
    var bestArray = findBest(); 
    drawChangeChess(bestArray);
    modifySigns(bestArray);
    currentColor ^= 1;
    changeChess("-player", currentColor);
    checkOver();            
}

// ----------------------------------------------------------------------------
function findBest2() {
    var bestArray = [];
    for (var i = 0; i < 64; i++) {
        var curChess = document.querySelector("#svg" + i);
        if (curChess.className.baseVal == "svg-cir-non") {
            validVal = checkValid("svg" + i);
            if (validVal.valid && validVal.array.length > bestArray.length) {
                bestArray.length = 0;
                for (var j = 0; j < validVal.array.length; j++) {
                    bestArray[j] = validVal.array[j];
                }
            }
        }
    }
    return bestArray;
}

async function intermediateAI() {
    await sleep(2000);
    var bestArray = findBest(); 
    drawChangeChess(bestArray);
    modifySigns(bestArray);
    currentColor ^= 1;
    changeChess("-player", currentColor);
    checkOver();            
}

// ----------------------------------------------------------------------------
function advancedAI() {
    
}

// ----------------------------------------------------------------------------
function aiRevoke() {
    revokeStep();
    currentSign.length = 0;
    for (var i = 0; i < lastSign.length; i++) {
        currentSign[i] = lastSign[i];
    }
    revokeStep();
}