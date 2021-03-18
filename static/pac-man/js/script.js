const BTN_AI = document.querySelector(".btn-ai");
const BTN_HUMAN = document.querySelector(".btn-human");

const VIEW_TYPE = document.querySelector(".game-type");
const VIEW_MAIN = document.querySelector(".game-main");
const VIEW_END = document.querySelector(".game-end");
const COLUMN_LEFT = document.querySelector(".column-left");
const COLUMN_RIGHT = document.querySelector(".column-right");

const SVG_NS = 'http://www.w3.org/2000/svg';

var gameType = -1; // 0-human, 1-ai
var currentColor = -1; // 0-white, 1-black
var currentSign = [];
var lastSign = [];
var aiLevel = -1;

// To start
VIEW_TYPE.hidden = false;
VIEW_MAIN.hidden = true;
VIEW_END.hidden = true;
COLUMN_LEFT.hidden = true;

function drawMainPanel() {
    VIEW_TYPE.hidden = true;
    VIEW_MAIN.hidden = false;
    drawLeftColumn()
    COLUMN_LEFT.hidden = false;

    /* Draw the Playing Board */   
    var chessPanel = document.createElement("div");
    chessPanel.className = "chess-panel";

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            // draw the panel
            var curPanel = document.createElement("div");
            if ((i + j) % 2 == 1)
                curPanel.className = "chess-area color-light";
            else
                curPanel.className = "chess-area color-dark";
            curPanel.id = "panel" + (i * 8 + j);
            chessPanel.appendChild(curPanel);
            // draw the chess
            var curChessSVG = document.createElementNS(SVG_NS, "svg");
            curPanel.appendChild(curChessSVG);
            addCircle(curChessSVG, "30px", "30px", "30px", "svg-cir-non", "svg" + (i * 8 + j));

            var selectSVG = document.createElementNS(SVG_NS, "circle");
            addCircle(curChessSVG, "30px", "30px", "0px", "svg-cir-select", "svg-select" + (i * 8 + j));

            var changeSVG = document.createElementNS(SVG_NS, "circle");
            addCircle(curChessSVG, "30px", "30px", "0px", "svg-cir-change", "svg-change" + (i * 8 + j));
        }
        var curSpan = document.createElement("span");
        curSpan.className = "cur-span";
        chessPanel.appendChild(curSpan);
    }
    COLUMN_RIGHT.appendChild(chessPanel);

    //set the initial chess
    changeChess(27, false);
    changeChess(28, true);
    changeChess(35, true);
    changeChess(36, false);

    /* add change event */

    chessPanel.addEventListener("click", function (e) {
        if (gameType == 1 && currentColor == 0) {
            return;
        }
        var target = e.target;
        var targetId = null;
        if (target.firstChild != null) {
            // console.log(target.firstChild.id);
            targetId = target.firstChild.id;
        } else {
            // console.log(target.id);
            targetId = target.id;
        }

        var tmp = checkValid(targetId);
        if (tmp.valid) {
            drawChangeChess(tmp.array);
            modifySigns(tmp.array);
            currentColor ^= 1;
            changeChess("-player", currentColor);
            checkOver();
            if (gameType == 1 && currentColor == 0) {
                if (aiLevel == 1) {
                    elementaryAI();
                } else if (aiLevel == 2) {
                    intermediateAI();
                } else if (aiLevel == 3) {
                    advancedAI();
                }
            }
        }
    });
}

function drawLeftColumn() {

    var leftBlackCount = document.createElement("div");
    leftBlackCount.className = "counter";

    var leftBlackValue = document.createElement("p");
    leftBlackValue.innerHTML = "Current Black: 2";
    leftBlackValue.setAttribute("id", "counter-v-black");

    var leftWhiteCount = document.createElement("div");
    leftWhiteCount.className = "counter";

    var leftWhiteValue = document.createElement("p");
    leftWhiteValue.innerHTML = "Current White: 2";
    leftWhiteValue.setAttribute("id", "counter-v-white");

    leftWhiteCount.appendChild(leftWhiteValue);
    leftBlackCount.appendChild(leftBlackValue);
    COLUMN_LEFT.appendChild(leftWhiteCount);
    COLUMN_LEFT.appendChild(leftBlackCount);

    /* Draw the Current Player Panel */

    // add element: currentPlayer
    var curPlayer = document.createElement("div");
    curPlayer.className = "cur-player";

    // add element currentPlayer paragraph
    var curPlayerP = document.createElement("p");
    curPlayerP.innerHTML = "Current Player:";

    var curPlayerSVG = document.createElementNS(SVG_NS, "svg");
    curPlayerSVG.setAttributeNS(null, "class", "svg-player-holder");

    curPlayer.appendChild(curPlayerP);// append items
    curPlayer.appendChild(curPlayerSVG);
    addCircle(curPlayerSVG, "50px", "30px", "30px", "svg-cir-black", "svg-player");
    COLUMN_LEFT.appendChild(curPlayer);

    var revoke = document.createElement("button");
    COLUMN_LEFT.appendChild(revoke);
    revoke.className = "btn-revoke";
    revoke.innerHTML = "Revoke";
    if (gameType == 0) {
        revoke.addEventListener("click", revokeStep);
    } else if (gameType == 1) {
        revoke.addEventListener("click", aiRevoke);
    }
    revoke.disabled = true;
}

function revokeStep() {
    document.querySelector(".btn-revoke").disabled = true;
    for (var i = 0; i < currentSign.length - 1; i++) {
        document.querySelector("#svg-change" + currentSign[i].substring(3))
        .setAttributeNS(null, "r", "0px");;
        document.querySelector("#svg-select" + currentSign[i].substring(3))
        .setAttributeNS(null, "r", "0px");
        
        var curClass = document.querySelector("#svg" + currentSign[i].substring(3));
        if (curClass.className.baseVal == "svg-cir-black") {
            curClass.className.baseVal = "svg-cir-white";
        } else {
            curClass.className.baseVal = "svg-cir-black";
        }
    }

    document.querySelector("#svg-change" + currentSign[currentSign.length - 1].substring(3))
        .setAttributeNS(null, "r", "0px");;
    document.querySelector("#svg-select" + currentSign[currentSign.length - 1].substring(3))
        .setAttributeNS(null, "r", "0px");


    document.querySelector("#svg" + currentSign[currentSign.length - 1]
            .substring(3))
            .className
            .baseVal = "svg-cir-non";

    var whiteCount = 0;
    var blackCount = 0;
    for (var i = 0; i < 64; i++) {
        var curChess = document.querySelector("#svg" + i);
        if (curChess.className.baseVal == "svg-cir-white") {
            whiteCount++;
        } else if (curChess.className.baseVal == "svg-cir-black"){
            blackCount++;
        }    
    }
    document.querySelector("#counter-v-black").innerHTML = "Current Black: " + blackCount;
    document.querySelector("#counter-v-white").innerHTML = "Current White: " + whiteCount;
    
    currentColor ^= 1;
    var playerSign = document.querySelector("#svg-player");
    if (playerSign.className.baseVal == "svg-cir-black") {
        playerSign.className.baseVal = "svg-cir-white";
    } else {
        playerSign.className.baseVal = "svg-cir-black";
    }
}


/* Draw a chess */
function changeChess(id, color) {
    var curChess = document.querySelector("#svg" + id);
    if (color) {
        curChess.setAttributeNS(null, "class", "svg-cir-black");
    } else {
        curChess.setAttributeNS(null, "class", "svg-cir-white");
    }
}

function humanStart() {
    gameType = 0;
    currentColor = 1;
    drawMainPanel();
}

function aiStart() {
    // BTN_AI.disabled = true;
    // BTN_AI.innerHTML = "Not applicable";
    // return;
    gameType = 1;
    currentColor = 1;
    VIEW_TYPE.removeChild(BTN_AI);
    VIEW_TYPE.removeChild(BTN_HUMAN);

    var choiceE = document.createElement("button");
    choiceE.className = "btn-choice";
    choiceE.innerHTML = "Elementary AI"
    choiceE.id = "btn-choice-e"
    choiceE.addEventListener("click", function(){
        aiLevel = 1;
        drawMainPanel();
    });
    VIEW_TYPE.appendChild(choiceE);

    var choiceI = document.createElement("button");
    choiceI.className = "btn-choice";
    choiceI.innerHTML = "Intermediate AI"
    choiceI.addEventListener("click", function(){
        aiLevel = 2;
        drawMainPanel();
    });
    VIEW_TYPE.appendChild(choiceI);

    var choiceA = document.createElement("button");
    choiceA.className = "btn-choice";
    choiceA.innerHTML = "Advanced AI"
    choiceA.addEventListener("click", function(){
        aiLevel = 3;
        // drawMainPanel();
        choiceA.innerHTML = "Not Available";
    });
    VIEW_TYPE.appendChild(choiceA);
}

function checkValid(id) {
    var intId = parseInt(id.substring(3));
    var verId = intId % 8; // vertical id
    var horId = parseInt(intId / 8); // horizontal id
    var curChess = document.querySelector("#" + id);
    if (curChess.className.baseVal != "svg-cir-non") {
        return {
            valid: false,
            array: null
        };
    }

    var userClassName;
    var otherClassName;
    if (currentColor == 1) {
        userClassName = "svg-cir-black";
        otherClassName = "svg-cir-white";
    } else {
        userClassName = "svg-cir-white";
        otherClassName = "svg-cir-black";
    }

    //check if valid
    var validNum = 0; // all valid number
    var validItem = []; // all valid ids

    var curItem = []; // this turn valid ids
    var curNum = 0; // this turn valid id number
    var isMeetOther = false;
    
    //vertical down
    for (var i = 1; i < 8 && horId - i >= 0; i++) {
        var nowNum = intId - i * 8;
        var nowId = document.querySelector("#svg" + nowNum);
        if (nowId.className.baseVal == "svg-cir-non") {
            break;
        } else if (nowId.className.baseVal == userClassName) {
            if (isMeetOther) { // could copy & great
                for (var j = 0; j < curNum; j++) {
                    validItem[validNum++] = curItem[j];
                }
            }
            break;
        } else {
            isMeetOther = true;
            curItem[curNum++] = "svg" + nowNum;
        }
    }
    curNum = 0;
    isMeetOther = false;

    //vertical up
    for (var i = 1; horId + i < 8; i++) {
        var nowNum = intId + i * 8;
        var nowId = document.querySelector("#svg" + nowNum);
        if (nowId.className.baseVal == "svg-cir-non") {
            break;
        } else if (nowId.className.baseVal == userClassName) {
            if (isMeetOther) { // could copy & great
                for (var j = 0; j < curNum; j++) {
                    validItem[validNum++] = curItem[j];
                }
            }
            break;
        } else {
            isMeetOther = true;
            curItem[curNum++] = "svg" + nowNum;
        }
    }
    curNum = 0;
    isMeetOther = false;

    //horizontal left
    for (var i = 1; i < 8 && verId - i >= 0; i++) {
        var nowNum = intId - i;
        var nowId = document.querySelector("#svg" + nowNum);
        if (nowId.className.baseVal == "svg-cir-non") {
            break;
        } else if (nowId.className.baseVal == userClassName) {
            if (isMeetOther) { // could copy & great
                for (var j = 0; j < curNum; j++) {
                    validItem[validNum++] = curItem[j];
                }
            }
            break;
        } else {
            isMeetOther = true;
            curItem[curNum++] = "svg" + nowNum;
        }
    }
    curNum = 0;
    isMeetOther = false;

    //horizontal right
    for (var i = 1; verId + i < 8; i++) {
        var nowNum = intId + i;
        var nowId = document.querySelector("#svg" + nowNum);
        if (nowId.className.baseVal == "svg-cir-non") {
            break;
        } else if (nowId.className.baseVal == userClassName) {
            if (isMeetOther) { // could copy & great
                for (var j = 0; j < curNum; j++) {
                    validItem[validNum++] = curItem[j];
                }
            }
            break;
        } else {
            isMeetOther = true;
            curItem[curNum++] = "svg" + nowNum;
        }
    }
    curNum = 0;
    isMeetOther = false;

    // slope up left
    for (var i = 1; i < 8 && verId - i >= 0 && horId - i >= 0; i++) {
        var nowNum = intId - 9 * i;
        var nowId = document.querySelector("#svg" + nowNum);
        if (nowId.className.baseVal == "svg-cir-non") {
            break;
        } else if (nowId.className.baseVal == userClassName) {
            if (isMeetOther) { // could copy & great
                for (var j = 0; j < curNum; j++) {
                    validItem[validNum++] = curItem[j];
                }
            }
            break;
        } else {
            isMeetOther = true;
            curItem[curNum++] = "svg" + nowNum;
        }
    }
    curNum = 0;
    isMeetOther = false;

    // slope down right
    for (var i = 1; verId + i < 8 && horId + i < 8; i++) {
        var nowNum = intId + 9 * i;
        var nowId = document.querySelector("#svg" + nowNum);
        if (nowId.className.baseVal == "svg-cir-non") {
            break;
        } else if (nowId.className.baseVal == userClassName) {
            if (isMeetOther) { // could copy & great
                for (var j = 0; j < curNum; j++) {
                    validItem[validNum++] = curItem[j];
                }
            }
            break;
        } else {
            isMeetOther = true;
            curItem[curNum++] = "svg" + nowNum;
        }
    }
    curNum = 0;
    isMeetOther = false;

    // slope up right
    for (var i = 1; i < 8 && horId - i >= 0 && verId + i < 8; i++) {
        var nowNum = intId - 7 * i;
        var nowId = document.querySelector("#svg" + nowNum);
        if (nowId.className.baseVal == "svg-cir-non") {
            break;
        } else if (nowId.className.baseVal == userClassName) {
            if (isMeetOther) { // could copy & great
                for (var j = 0; j < curNum; j++) {
                    validItem[validNum++] = curItem[j];
                }
            }
            break;
        } else {
            isMeetOther = true;
            curItem[curNum++] = "svg" + nowNum;
        }
    }
    curNum = 0;
    isMeetOther = false;

    // slope down left
    for (var i = 1; horId + i < 8 && verId - i >= 0; i++) {
        var nowNum = intId + 7 * i;
        var nowId = document.querySelector("#svg" + nowNum);
        if (nowId.className.baseVal == "svg-cir-non") {
            break;
        } else if (nowId.className.baseVal == userClassName) {
            if (isMeetOther) { // could copy & great
                for (var j = 0; j < curNum; j++) {
                    validItem[validNum++] = curItem[j];
                }
            }
            break;
        } else {
            isMeetOther = true;
            curItem[curNum++] = "svg" + nowNum;
        }
    }
    curNum = 0;
    isMeetOther = false;
    validItem[validNum++] = id;

    // final change
    if (validNum == 1) {
        return {
            valid: false,
            array: null
        };
    } else {
        return {
            valid: true,
            array: validItem
        };
    }
}

/* This function change an array of chesses */
function drawChangeChess(change) {
    for (var i = 0; i < change.length; i++) {
        var curChess = document.querySelector("#" + change[i]);
        if (currentColor == 1) {
            curChess.setAttributeNS(null, "class", "svg-cir-black");
        } else {
            curChess.setAttributeNS(null, "class", "svg-cir-white");
        }
    }
}

function modifySigns(newArr) {
    lastSign.length = 0;
    for (var i = 0; i < currentSign.length; i++) {
        document.querySelector("#svg-change" + currentSign[i].substring(3))
        .setAttributeNS(null, "r", "0px");;
        document.querySelector("#svg-select" + currentSign[i].substring(3))
        .setAttributeNS(null, "r", "0px");
        lastSign[i] = currentSign[i];
    }

    currentSign.length = 0;

    for (var i = 0; i < newArr.length; i++) {
        currentSign[i] = newArr[i];
        if (i != newArr.length - 1) {
            document.querySelector("#svg-change" + currentSign[i].substring(3))
            .setAttributeNS(null, "r", "10px");
        } else {
            document.querySelector("#svg-select" + currentSign[i].substring(3))
            .setAttributeNS(null, "r", "10px");
        }
    }
}

function checkOver() {

    var isMoveable = false;
    var whiteCount = 0;
    var blackCount = 0;
    for (var i = 0; i < 64; i++) {
        var curChess = document.querySelector("#svg" + i);
        if (curChess.className.baseVal == "svg-cir-non" && !isMoveable) {
            if (checkValid("svg" + i).valid) {
                isMoveable = true;
            }
        } else if (curChess.className.baseVal == "svg-cir-white") {
            whiteCount++;
        } else if (curChess.className.baseVal == "svg-cir-black"){
            blackCount++;
        }    
    }
    if (!isMoveable) {
        currentColor ^= 1;
        var curPlayerI = document.querySelector("#svg-player");
        if (curPlayerI.className.baseVal == "svg-cir-black") {
            curPlayerI.className.baseVal = "svg-cir-white";
        } else if (curPlayerI.className.baseVal == "svg-cir-white") {
            curPlayerI.className.baseVal = "svg-cir-black";
        }
    }
    document.querySelector(".btn-revoke").disabled = false;
    
    document.querySelector("#counter-v-black").innerHTML = "Current Black: " + blackCount;
    document.querySelector("#counter-v-white").innerHTML = "Current White: " + whiteCount;

    if (blackCount + whiteCount == 64 || whiteCount == 0 || blackCount == 0) {
        VIEW_MAIN.hidden = true;
        document.querySelector(".background-cover")
            .removeChild(VIEW_MAIN);
        VIEW_END.hidden = false;

        var endDiv = document.createElement("div");
        endDiv.className = "div-end";
        var endP = document.createElement("p");
        endP.innerHTML = "White: " + whiteCount +  " Black: " + blackCount;
        var endP2 = document.createElement("p");
        if (gameType == 1) {
            endP2.innerHTML = (blackCount > whiteCount) ? "You Win!" : "You Lose!";
        } else {
            endP2.innerHTML = (blackCount > whiteCount) ? "Black Win!" : "White Win!";
        }
        endDiv.appendChild(endP);
        endDiv.appendChild(endP2);
        VIEW_END.appendChild(endDiv);

        var resetBtn = document.createElement("button");
        resetBtn.innerHTML = "Reset";
        resetBtn.className = "btn-reset";
        VIEW_END.appendChild(resetBtn);
        resetBtn.addEventListener("click", function() {window.location.reload();});
    }
}

BTN_HUMAN.addEventListener("click", humanStart, false);
BTN_AI.addEventListener("click", aiStart, false);