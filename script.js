//Variables
var playerOne = true;
var playerTwo = false;
var player = '';
var nonPlayer = '';
var playerNum = 0;
var playerNumNone = 0;
var moves = 0;
var rolls = 0;
var infoMessage = '';
var infoGame = '';
var infoGameText = '';

//Function to get sum of all dices from one Number
function sumNum(arr, num) {
    arr = arr.map(Number).filter(el => {
        if (el == num) {
            return el;
        }
    });
    if (arr.length > 0) {
        return arr.reduce((a, b) => {
            return a + b;
        });
    } else {
        return 0;
    }
}

//Function to sum all Dices
function sumAll(arr) {
    return arr.reduce((a, b) => {
        return a + b;
    });
}

//Function 3 of Kind
function threeOfkind(arr) {
    if (arr[0] == arr[1] && arr[1] == arr[2] || arr[1] == arr[2] && arr[2] == arr[3] || arr[2] == arr[3] && arr[3] == arr[4]) {
        return sumAll(arr);
    } else {
        return 0;
    }
}

//Function 4 of Kind
function fourOfkind(arr) {
    if (arr[0] == arr[1] && arr[1] == arr[2] && arr[2] == arr[3] || arr[1] == arr[2] && arr[2] == arr[3] && arr[3] == arr[4]) {
        return sumAll(arr);
    } else {
        return 0;
    }
}

//Function FullHouse
function FullHouse(arr) {
    if (arr[0] == arr[1] && arr[1] == arr[2] && arr[2] != arr[3] && arr[3] == arr[4] || arr[0] == arr[1] && arr[2] == arr[3] && arr[3] == arr[4] && arr[1] != arr[2]) {
        return 25;
    } else {
        return 0;
    }
}

//Function Small Straight
function smallStr(arr) {
    let newArr = [];
    newArr[0] = arr[0];
    let index = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] != newArr[index]) {
            index++;
            newArr[index] = arr[i];
        }
    }
    let first = newArr.slice(0, 4).join('');
    let second = newArr.slice(1, 5).join('');
    if (first == '1234' || first == '2345' || first == '3456' || second == '1234' || second == '2345' || second == '3456') {
        return 30;
    } else {
        return 0;
    }
}

//Function LargeStraight
function largeStr(arr) {
    let str = arr.join('');
    if (str == '12345' || str == '23456') {
        return 40;
    } else {
        return 0;
    }
}

//Function Yatzee
function yatzee(arr) {
    let str = arr.join('');
    if (str == '11111' || str == '22222' || str == '33333' || str == '44444' || str == '55555' || str == '66666') {
        return 50;
    } else {
        return 0;
    }
}

//Function to change the dice color when it's being selected
function changeDice(dice) {
    let currentPath = document.getElementById(dice).src;
    if (!currentPath.includes('black')) {
        let newPath = currentPath.replace('dice', 'black-dice');
        document.getElementById(dice).src = newPath;
    } else {
        let newPath = currentPath.replace('black-dice', 'dice');
        document.getElementById(dice).src = newPath;
    }
}

//Function to make dices to be clickleble
function clicklableDices() {
    for (let i = 1; i <= 5; i++) {
        let id = 'dice' + i;
        document.getElementById(id).style.pointerEvents = "auto";
    }
}

//Function to make dices to be unclickleble
function unclicklableDices() {
    for (let i = 1; i <= 5; i++) {
        let id = 'dice' + i;
        document.getElementById(id).style.pointerEvents = "none";
    }
}

//Function for counting rolls
function clicked() {
    rolls++;
}

//Function to check is a there are dices selected to roll again
function isSelect() {
    let isBlack = false;
    for (let i = 1; i <= 5; i++) {
        let curDice = "dice" + i;
        let dicePath = document.getElementById(curDice).src;
        if (dicePath.includes('black')) {
            isBlack = true;
        }
    }
    return isBlack;
}

//Roll the dices which are selected
function roll() {
    if (isSelect()) {
        for (let i = 1; i <= 5; i++) {
            let curDice = "dice" + i;
            let randomDice = Math.floor(Math.random() * 6) + 1;
            let dicePath = document.getElementById(curDice).src;
            if (dicePath.includes('black')) {
                document.getElementById(curDice).src = "/images/dice-" + randomDice + '.png';
            }
        }
        document.getElementById("roll-button").addEventListener("click", clicked());
        infoGame = `Rolls ${rolls} from 3.`;
        document.getElementById("infoGame").value = infoGame;
        let tableIdPlayer = 'result-table-' + playerNum;
        let curArr = currentDiceArray().sort((a, b) => {
            return a - b;
        });
        if (rolls == 1 || rolls == 2) {
            document.getElementById(tableIdPlayer).style.pointerEvents = "auto";
            clicklableDices();
            infoGameText = 'Please select the dices you want to roll again OR hit your score on the table.'
        } else if (rolls == 3) {
            unclicklableDices();
            document.getElementById("roll-button").style.display = "none";
            infoGameText = 'Please choose field from score table to hit you result.'
        }
        potentialResult(curArr);
        document.getElementById("infoGameText").value = infoGameText;
    } else {
        alertMessage('Select dices to roll again OR hit your score!');
        unclicklableDices();
        let playIdTable = 'result-table-' + playerNum;
        document.getElementById(playIdTable).style.pointerEvents = "none";
        document.getElementById("roll-button").style.pointerEvents = "none";
    }
}

//Function to change the Player Turn and to Start the Game
function playerTurn() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("roll-button").style.display = "flex";
    document.getElementById("roll-button").style.pointerEvents= "auto";
    unclicklableDices();
    if (moves == 13 && playerOne == true) {
        result();
    } else {
        choosenDicesArr = [];
        //Make dices black
        for (let i = 1; i <= 5; i++) {
            let curDice = "dice" + i;
            let randomDice = Math.floor(Math.random() * 6) + 1;
            document.getElementById(curDice).src = "/images/black-dice-" + randomDice + '.png';
        }
        if (playerOne == true) {
            player = 'One';
            nonPlayer = 'Two';
            playerNum = 1;
            playerNumNone = 2;
            moves++;
        } else if (playerTwo == true) {
            player = 'Two';
            nonPlayer = 'One';
            playerNum = 2;
            playerNumNone = 1;
        }
        let tableIdNone = 'result-table-' + playerNumNone;
        let tableIdPlayer = 'result-table-' + playerNum;
        let labelPlayer = 'label' + player;
        let labelNonePlayer = 'label' + nonPlayer;
        document.getElementById(labelPlayer).style.animation = "blinker 1s linear infinite";
        document.getElementById(labelPlayer).style.color = "red";
        document.getElementById(labelNonePlayer).style.animation = "none";
        document.getElementById(labelNonePlayer).style.color = "black";
        document.getElementById(tableIdNone).style.pointerEvents = "none";
        document.getElementById(tableIdPlayer).style.pointerEvents = "none";
        infoGame = '';
        document.getElementById("infoGame").value = infoGame;
        infoGameText = `Player ${player} please roll the dices for the first time.`;
        document.getElementById("infoGameText").value = infoGameText;
        infoMessage = `Player ${player} move ${moves} from 13.`
        document.getElementById("info").value = infoMessage;
    }
}

//function to get current Dice Array
function currentDiceArray() {
    let choosenDicesArr = [];
    for (let i = 1; i <= 5; i++) {
        let curDice = "dice" + i;
        let diceValue = document.getElementById(curDice).src;
        diceValue = diceValue.slice(diceValue.length - 5, diceValue.length - 4);
        choosenDicesArr.push(Number(diceValue));
    }
    return choosenDicesArr;
}

//Function show the potential results
function potentialResult(array) {
    let tableId = 'result-table-' + playerNum;
    for (let rows = 1; rows <= 17; rows++) {
        if (rows >= 7 && rows <= 10) {
            continue;
        } else {
            let id = rows + '-pl' + playerNum + '-' + rows;
            let classValue = document.getElementById(tableId).rows[rows].cells.namedItem(id).classList;
            if (classValue[0] == 'lines-table-result' || classValue[0] == 'lines-table-blink') {
                document.getElementById(tableId).rows[rows].cells.namedItem(id).classList.add("lines-table-blink");
                document.getElementById(tableId).rows[rows].cells.namedItem(id).classList.remove("lines-table-result");
                if (rows >= 1 && rows <= 6) {
                    document.getElementById(tableId).rows[rows].cells.namedItem(id).innerHTML = sumNum(array, rows);
                } else if (rows == 11) {
                    document.getElementById(tableId).rows[rows].cells.namedItem(id).innerHTML = threeOfkind(array);
                } else if (rows == 12) {
                    document.getElementById(tableId).rows[rows].cells.namedItem(id).innerHTML = fourOfkind(array);
                } else if (rows == 13) {
                    document.getElementById(tableId).rows[rows].cells.namedItem(id).innerHTML = FullHouse(array);
                } else if (rows == 14) {
                    document.getElementById(tableId).rows[rows].cells.namedItem(id).innerHTML = smallStr(array);
                } else if (rows == 15) {
                    document.getElementById(tableId).rows[rows].cells.namedItem(id).innerHTML = largeStr(array);
                } else if (rows == 16) {
                    document.getElementById(tableId).rows[rows].cells.namedItem(id).innerHTML = sumAll(array);
                } else if (rows == 17) {
                    document.getElementById(tableId).rows[rows].cells.namedItem(id).innerHTML = yatzee(array);
                }
            }
        }
    }
}

//Function on Click to score the Result
function onClick(id) {
    let thisId = id.id;
    let curArr = currentDiceArray().sort((a, b) => {
        return a - b;
    });
    let num = thisId.split('')[thisId.length - 1];
    let row = thisId.slice(0, thisId.indexOf("-"));
    let plNum = thisId.slice(thisId.indexOf('l') + 1, thisId.indexOf('l') + 2);
    let thisTableId = 'result-table-' + plNum;
    let sumId = 7 + '-pl' + plNum + '-7';
    let bonusId = 8 + '-pl' + plNum + '-8';
    let totalUpperId = 9 + '-pl' + plNum + '-9';
    let totalLowerId = 18 + '-pl' + plNum + '-18';
    let totalId = 19 + '-pl' + plNum + '-19';
    if (row >= 1 && row <= 6) {
        document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).innerHTML = sumNum(curArr, num);
    } else if (row == 11) {
        document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).innerHTML = threeOfkind(curArr);
    } else if (row == 12) {
        document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).innerHTML = fourOfkind(curArr);
    } else if (row == 13) {
        document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).innerHTML = FullHouse(curArr);
    } else if (row == 14) {
        document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).innerHTML = smallStr(curArr);
        console.log(curArr.join(', '))
        console.log(smallStr(curArr));
    } else if (row == 15) {
        document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).innerHTML = largeStr(curArr);
    } else if (row == 16) {
        document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).innerHTML = sumAll(curArr);
    } else if (row == 17) {
        document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).innerHTML = yatzee(curArr);
    }
    let number = Number(document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).innerHTML);
    if (row >= 1 && row <= 6) {
        let curNum = Number(document.getElementById(thisTableId).rows[7].cells.namedItem(sumId).innerHTML);
        let newNum = curNum + number;
        let totalUpperNum = newNum;
        document.getElementById(thisTableId).rows[7].cells.namedItem(sumId).innerHTML = newNum;
        if (newNum >= 63) {
            totalUpperNum += 35;
            document.getElementById(thisTableId).rows[8].cells.namedItem(bonusId).innerHTML = 35;
        } else if (newNum < 63) {
            document.getElementById(thisTableId).rows[8].cells.namedItem(bonusId).innerHTML = 0;
        }
        document.getElementById(thisTableId).rows[9].cells.namedItem(totalUpperId).innerHTML = totalUpperNum;
    } else if (row >= 11 && row <= 17) {
        let curLowerNum = Number(document.getElementById(thisTableId).rows[18].cells.namedItem(totalLowerId).innerHTML);
        let newNum = curLowerNum + number;
        document.getElementById(thisTableId).rows[18].cells.namedItem(totalLowerId).innerHTML = newNum;
    }
    let curUpperTotal = Number(document.getElementById(thisTableId).rows[9].cells.namedItem(totalUpperId).innerHTML);
    let curLowerTotal = Number(document.getElementById(thisTableId).rows[18].cells.namedItem(totalLowerId).innerHTML);
    let total = curLowerTotal + curUpperTotal;
    document.getElementById(thisTableId).rows[19].cells.namedItem(totalId).innerHTML = total;
    document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).classList.add("lines-table-final");
    document.getElementById(thisTableId).rows[row].cells.namedItem(thisId).classList.remove("lines-table-blink")

    for (let rows = 1; rows <= 17; rows++) {
        if (rows >= 7 && rows <= 10) {
            continue;
        } else {
            let idNew = rows + '-pl' + plNum + '-' + rows;
            let valueClass = document.getElementById(thisTableId).rows[rows].cells.namedItem(idNew).classList;
            if (valueClass[0] == "lines-table-blink") {
                document.getElementById(thisTableId).rows[rows].cells.namedItem(idNew).classList.add("lines-table-result");
                document.getElementById(thisTableId).rows[rows].cells.namedItem(idNew).classList.remove("lines-table-blink");
                document.getElementById(thisTableId).rows[rows].cells.namedItem(idNew).innerHTML = '';
            }
        }
    }
    if (playerOne == true) {
        playerOne = false;
    } else if (playerOne == false) {
        playerOne = true;
    }
    if (playerTwo == true) {
        playerTwo = false;
    } else if (playerTwo == false) {
        playerTwo = true;
    }
    rolls = 0;
    playerTurn();
}

//Alert message function
function alertMessage(text) {
    document.getElementById("alert-text").value = text;
    document.getElementById("alert-message").style.display = "flex";
}

//Function for OK button to close Alert Message
function closeAlert() {
    clicklableDices();
    let playIdTable = 'result-table-' + playerNum;
    document.getElementById(playIdTable).style.pointerEvents = "auto";
    document.getElementById("roll-button").style.pointerEvents = "auto";
    document.getElementById("alert-message").style.display = "none";
}

//Alert message function END
function alertMessageEnd(text) {
    document.getElementById("alert-text-end").value = text;
    document.getElementById("alert-message-end").style.display = "flex";
}

//Function for NEW GAME button to close Alert Message and start a New Game
function closeAlertEnd() {
    moves = 0;
    rolls = 0;
    document.getElementById("result-table-1").style.pointerEvents = "auto";
    for (let rows = 1; rows <= 19; rows++) {
        let idPlOne = rows + '-pl1-' + rows;
        let idPlTwo = rows + '-pl2-' + rows;
        if (rows == 7 || rows == 9 || rows == 18 || rows == 19) {
            document.getElementById("result-table-1").rows[rows].cells.namedItem(idPlOne).innerHTML = "0";
            document.getElementById("result-table-2").rows[rows].cells.namedItem(idPlTwo).innerHTML = "0";
            document.getElementById("result-table-1").rows[rows].cells.namedItem(idPlOne).classList.add("lines-table-result");
            document.getElementById("result-table-1").rows[rows].cells.namedItem(idPlOne).classList.remove("lines-table-final");
            document.getElementById("result-table-2").rows[rows].cells.namedItem(idPlTwo).classList.add("lines-table-result");
            document.getElementById("result-table-2").rows[rows].cells.namedItem(idPlTwo).classList.remove("lines-table-final");

        } else if (rows == 8 || rows == 10) {
            continue;
        } else {
            document.getElementById("result-table-1").rows[rows].cells.namedItem(idPlOne).innerHTML = "";
            document.getElementById("result-table-2").rows[rows].cells.namedItem(idPlTwo).innerHTML = "";
            document.getElementById("result-table-1").rows[rows].cells.namedItem(idPlOne).classList.add("lines-table-result");
            document.getElementById("result-table-1").rows[rows].cells.namedItem(idPlOne).classList.remove("lines-table-final");
            document.getElementById("result-table-2").rows[rows].cells.namedItem(idPlTwo).classList.add("lines-table-result");
            document.getElementById("result-table-2").rows[rows].cells.namedItem(idPlTwo).classList.remove("lines-table-final");
        }
    }
    playerTurn();
    document.getElementById("alert-message-end").style.display = "none";
}

//Function to get the result and the Winner
function result() {
    let plOnePoints = Number(document.getElementById("result-table-1").rows[19].cells.namedItem("19-pl1-19").innerHTML);
    let plTwoPoints = Number(document.getElementById("result-table-2").rows[19].cells.namedItem("19-pl2-19").innerHTML);
    let winner = '';
    let winnerPoints = 0;
    let alertText = '';
    if (plOnePoints > plTwoPoints) {
        winner = 'One';
        winnerPoints = plOnePoints;
        alertText = (`Player ${winner} win the game with ${winnerPoints} points!!!`);
    } else if (plTwoPoints >plOnePoints){
        winner = 'Two';
        winnerPoints = plTwoPoints;
        alertText = (`Player ${winner} win the game with ${winnerPoints} points!!!`);
    } else if (plOnePoints==plTwoPoints) {
        alertText = `It's a draw!`
    }
    alertMessageEnd(alertText);
    document.getElementById("result-table-2").style.pointerEvents = "none";
    document.getElementById("labelTwo").style.animation = "none";
    document.getElementById("labelTwo").style.color = "black";
    document.getElementById("roll-button").style.pointerEvents = "none";
    document.getElementById("infoGame").value = '';
    document.getElementById("infoGameText").value = '';
    infoMessage = 'GAME OVER';
    document.getElementById("info").value = infoMessage; 
}