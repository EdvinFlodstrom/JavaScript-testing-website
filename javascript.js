window.onload = init; 


function init()
{
    console.log('Page has been loaded');


    //BlackJack
    
    let startingCapital = 200;
    let totalChips = startingCapital;
    let totalBet = 0;
    let secondHandTotalBet = 0;
    let canBet = true;
    let deck = [];
    let secondHandDeck = [];
    let dealerDeck = [];
    let points = 0;
    let secondHandPoints = 0;
    let dealerPoints = 0;
    let secondHandTurn = false;
    let secondHandFirstTurn = true;
    let blackjack = false;
    let dealerBlackjack = false;
    let timeToReset = false;

    let spades = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    let clubs = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    let diamonds = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    let hearts = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];

    let pBegin = document.querySelector('#pBegin');
    let pCards = document.querySelector('#pCards');
    let pPoints = document.querySelector('#pPoints');
    let pSecondHandCards = document.querySelector('#pSecondHandCards');
    let pSecondHandPoints = document.querySelector('#pSecondHandPoints');
    let pChips = document.querySelector('#pChips');
    let pBet = document.querySelector('#bet');
    let pSecondHandBet = document.querySelector('#secondHandBet');
    pChips.innerHTML += `\$${totalChips}`;
    let pDealerCards = document.querySelector('#pDealerCards');
    let pDealerPoints = document.querySelector('#pDealerPoints');

    let begin = document.querySelector('#begin');
    let canBegin = false;
    let stand = document.querySelector('#stand');
    let canStand = false;
    let hit = document.querySelector('#hit');
    let canHit = false;
    let doubleUp = document.querySelector('#doubleUp');
    let canDoubleUp = false;
    let split = document.querySelector('#split');
    let canSplit = false;
    let hasSplit = false;

    let allOptionsArray = [stand, hit, doubleUp, split];

    let plus10 = document.querySelector('#plus10');
    let plus100 = document.querySelector('#plus100');
    let minus10 = document.querySelector('#minus10');
    let minus100 = document.querySelector('#minus100');    

    begin.addEventListener('click', function() {
        reset();        
    })

    stand.addEventListener('click', function() {
        fStand();
    })

    hit.addEventListener('click', function() {
        if (!secondHandTurn) {
            fHit(deck);
        }
        else {
            fHit(secondHandDeck);
        }
    })

    doubleUp.addEventListener('click', function() {
        if (!secondHandTurn) {
            fDoubleUp(deck);
        }
        else {
            fDoubleUp(secondHandDeck);
        }
    })

    split.addEventListener('click', function() {
        if (!secondHandTurn) {
            fSplit(deck);
        }
        else {
            fSplit(secondHandDeck);
        }
    })

    plus10.addEventListener('click', function() {
        bet(10);
    })
    
    plus100.addEventListener('click', function() {
        bet(100);
    })

    minus10.addEventListener('click', function() {
        bet(-10);
    })

    minus100.addEventListener('click', function() {
        bet(-100);
    })

    let betArray = [plus10, plus100, minus10, minus100];

    function resetBet() {
        canBet = true;        
        for (let index = 0; index < betArray.length; index++) {
            const element = betArray[index];
            element.style.backgroundColor = 'yellow';
        }
        totalBet = 0;
        secondHandTotalBet = 0;
        pBet.innerHTML = `Bet: $0`
        pSecondHandBet.innerHTML = ``
        pChips.innerHTML = `Chips: \$${totalChips}`;
        setTimeout(function() {
            if (totalChips < 20) {
                pBegin.innerHTML = `Looks like you're out of chips. Better luck next time!`;
            } 
        }, 2500);
    }

    function fSplit(deck) {
        if (!canSplit) {
            return;
        }
        hasSplit = true;
        canSplit = false;
        secondHandTotalBet = totalBet;
        secondHandDeck = [deck[1]];
        deck.pop(deck[1]);        
        points = sumPoints(deck);
        secondHandPoints = sumPoints(secondHandDeck);
        pCards.innerHTML = `Cards: ${(deck[deck.length - 1])[1]}${((deck[deck.length - 1])[0])[0]}`;
        pSecondHandCards.innerHTML = `Hand 2 cards: ${(secondHandDeck[secondHandDeck.length - 1])[1]}${((secondHandDeck[secondHandDeck.length - 1])[0])[0]}`;
        pPoints.innerHTML = `Points: ${points}`;
        pSecondHandPoints.innerHTML = `Hand 2 points: ${secondHandPoints}`;
        pBet.innerHTML = `Bet: \$${totalBet}`;
        pSecondHandBet.innerHTML = `Second hand bet: \$${secondHandTotalBet}`;

        pBegin.innerHTML = `Choose your option for hand 1.`;
        determineOptions(deck);
    }

    function fDoubleUp(deck) {
        if (!canDoubleUp) {
            return;
        }
        canStand = false;
        canHit = false;
        canDoubleUp = false;
        canSplit = false;
        for (let index = 0; index < allOptionsArray.length; index++) {
            const element = allOptionsArray[index];
            element.style.backgroundColor = 'red';
        }

        if (!secondHandTurn) {
            deck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
            points = sumPoints(deck);
            pCards.innerHTML += `; ${(deck[deck.length - 1])[1]}${((deck[deck.length - 1])[0])[0]}`;
            pPoints.innerHTML = `Points: ${points}`;
            totalBet += totalBet;
            pBet.innerHTML = `Bet: \$${totalBet}`;
        }
        else {
            secondHandDeck.push(addCardToDeck(secondHandDeck, dealerDeck, spades, clubs, diamonds, hearts));
            secondHandPoints = sumPoints(secondHandDeck);
            pSecondHandCards.innerHTML += `; ${(secondHandDeck[secondHandDeck.length - 1])[1]}${((secondHandDeck[secondHandDeck.length - 1])[0])[0]}`;
            pSecondHandPoints.innerHTML = `Second hand points: ${secondHandPoints}`;
            secondHandTotalBet += secondHandTotalBet;
            pSecondHandBet.innerHTML = `Second hand bet: \$${secondHandTotalBet}`;
        }

        if (!hasSplit) {
            prepareToDeal();
        }
        else {
            if (secondHandTurn) {
                prepareToDeal();
            }
            else {
                pBegin.innerHTML = `Choose your option for hand 2`;
                secondHandTurn = true;
                determineAction(secondHandPoints);
            }
        }                
    }

    function fHit(deck) {
        if (!canHit) {
            return;
        }
        canDoubleUp = false;
        doubleUp.style.backgroundColor = 'red';
        canSplit = false;
        split.style.backgroundColor = 'red';

        if (!secondHandTurn) {
            deck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
            points = sumPoints(deck);
            pCards.innerHTML += `; ${(deck[deck.length - 1])[1]}${((deck[deck.length - 1])[0])[0]}`;
            pPoints.innerHTML = `Points: ${points}`;
            determineAction(points);
        }
        else {
            secondHandDeck.push(addCardToDeck(secondHandDeck, dealerDeck, spades, clubs, diamonds, hearts));
            secondHandPoints = sumPoints(secondHandDeck);
            pSecondHandCards.innerHTML += `; ${(secondHandDeck[secondHandDeck.length - 1])[1]}${((secondHandDeck[secondHandDeck.length - 1])[0])[0]}`;
            pSecondHandPoints.innerHTML = `Second hand points: ${secondHandPoints}`;        
            determineAction(secondHandPoints);
        }
    }

    function fStand() {
        if (!canStand) {
            return;
        }
        canStand = false;
        canHit = false;
        canDoubleUp = false;
        canSplit = false;        
        for (let index = 0; index < allOptionsArray.length; index++) {
            const element = allOptionsArray[index];
            element.style.backgroundColor = 'red';
        }        
        if (!secondHandTurn && hasSplit) {
            pBegin.innerHTML = `Choose your option for hand 2.`;
            secondHandTurn = true;
            determineAction(points);
        }
        else {
            prepareToDeal();
        }
    }

    function determineAction(points) {
        if (!hasSplit && points > 21) { 
            disableAllArrayOptions();
            determineWinner(points, false, totalBet);            
            return;
        }
        if (!hasSplit && points === 21) {
            pBegin.innerHTML = `You got 21.`;
            prepareToDeal();
            return;
        }
        if (!hasSplit && points < 21) {
            determineOptions(deck);
            return;
        }
        if (!secondHandTurn) {
            if (points === 21 || points > 21) {
                if (points > 21) {
                    pBegin.innerHTML = `Hand 1 went bust.`;                
                }
                else if (points === 21) {
                    pBegin.innerHTML = `Hand 1 got 21.`;
                }
                secondHandTurn = true;                
                setTimeout(function() {
                    pBegin.innerHTML =`Choose your option for hand 2.`;
                }, 2000);
                return;
            }
            else {
                determineOptions(deck);
            }
        }
        else {
            if (secondHandPoints === 21 || secondHandPoints > 21) {
                if (secondHandPoints > 21) {
                    pBegin.innerHTML = `Hand 2 went bust.`;                
                }
                else if (secondHandPoints === 21) {
                    pBegin.innerHTML = `Hand 2 got 21.`;
                }
                prepareToDeal();
            }
            else {
                determineOptions(secondHandDeck);
                secondHandFirstTurn = false;
            }
        }    
    }

    function disableAllArrayOptions() {
        for (let index = 0; index < allOptionsArray.length; index++) {
            const element = allOptionsArray[index];
            element.style.backgroundColor = 'red';
        }
        canStand = false;
        canHit = false;
        canSplit = false;
    }

    function bet(betAmount) {
        if ((totalBet + betAmount) < 0 || (totalBet + betAmount > totalChips) || !canBet) {
            return;
        }
        if (totalBet === 0) {
            pBegin.innerHTML = `Click "Begin" to play. Min bet: \$20`;
        }
        totalBet += betAmount;
        pBet.innerHTML = `Bet: \$${totalBet}`;

        if (totalBet >= 20) {
            begin.style.backgroundColor = 'yellow';
            canBegin = true;
        }
        else {
            begin.style.backgroundColor = 'red';
            canBegin = false;
        }
    }

    function reset() {
        if (!canBegin) {
            return;
        }
        timeToReset = false;
        blackjack = false;
        dealerBlackjack = false;
        secondHandFirstTurn = true
        secondHandTurn = false;
        hasSplit = false;
        canBet = false;
        pDealerCards.innerHTML = ``;
        pDealerPoints.innerHTML = ``;
        pSecondHandCards.innerHTML = ``;
        pSecondHandPoints.innerHTML = ``;
        pSecondHandBet.innerHTML = ``;
        for (let index = 0; index < betArray.length; index++) {
            const element = betArray[index];
            element.style.backgroundColor = 'red';
        }
        canBegin = false;
        begin.style.backgroundColor = 'red';

        deck = [randomCard(spades, clubs, diamonds, hearts)];
        deck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
        pCards.innerHTML = `Cards: ${(deck[0])[1]}${((deck[0])[0][0])}; ${(deck[1])[1]}${((deck[1])[0])[0]}`;
        points = sumPoints(deck);
        pPoints.innerHTML = `Points: ${points}`;

        if (points === 21) {
            pBegin.innerHTML = `Blackjack!`;
            blackjack = true;
            prepareToDeal();
        }
        else {
            pBegin.innerHTML = `Choose your option.`
            canDoubleUp = true;
            doubleUp.style.backgroundColor = 'yellow';            
        }
        determineOptions(deck);
    }

    function determineOptions(deck) {
        let optionsArray = [stand, hit, split];
        for (let index = 0; index < optionsArray.length; index++) {
            const element = optionsArray[index];
            element.style.backgroundColor = 'red';
        }        
        canStand = false;
        canHit = false;
        canSplit = false;
        
        if (!hasSplit && totalBet + totalBet <= totalChips && deck.length < 3) {            
            canDoubleUp = true;
            doubleUp.style.backgroundColor = 'yellow';            
        }
        else if (!secondHandTurn && hasSplit) {
            if ((totalBet + totalBet + secondHandTotalBet) <= totalChips && deck.length < 2) {
                canDoubleUp = true;
                doubleUp.style.backgroundColor = 'yellow';
            }
            else {
                canDoubleUp = false;
                doubleUp.style.backgroundColor = 'red';
            }
        }
        else if (secondHandTurn) {            
            if ((secondHandTotalBet + secondHandTotalBet + totalBet) <= totalChips && secondHandDeck.length < 2) {
                canDoubleUp = true;
                doubleUp.style.backgroundColor = 'yellow';
            }
            else {
                canDoubleUp = false;
                doubleUp.style.backgroundColor = 'red';
            }
        }
        else {
            canDoubleUp = false;
            doubleUp.style.backgroundColor = 'red';
        }

        if (!hasSplit) {
            if ((deck[0])[1] === (deck[1])[1]) {
                if ((totalBet + totalBet) <= totalChips) {
                    canSplit = true;
                    split.style.backgroundColor = 'yellow';
                }
            }
        }        
        canHit = true;
        hit.style.backgroundColor = 'yellow';
        canStand = true;
        stand.style.backgroundColor = 'yellow';
    }

    function sumPoints (deck) {
        let aces = 0;
        let sum = 0;
        for (let index = 0; index < deck.length; index++) {
            const card = (deck[index]);
            if (card[1] === 'J') {
                sum += 10;
            }
            else if (card[1] === 'Q') {
                sum += 10;
            }
            else if (card[1] === 'K') {
                sum += 10;
            }
            else if (card[1] === 'A') {
                aces++;
                sum += 11;
            }
            else {
                sum += card[1];
            }

            if (sum > 21 && aces >= 1) {
                aces--;
                sum -= 10;
            }
        }
        return sum;
    }

    function addCardToDeck(deck, dealerDeck, set1, set2, set3, set4) {
        let newCard = randomCard(set1, set2, set3, set4); 

        for (let index = 0; index < deck.length; index++) {
            const element = deck[index];

            if (newCard === element) {
                newCard = randomCard(set1, set2, set3, set4);
                index = 0;
            }
        }

        for (let index = 0; index < dealerDeck.length; index++) {
            const element = dealerDeck[index];

            if (newCard === element) {
                newCard = randomCard(set1, set2, set3, set4);
                index = 0;
            }
        }

        return newCard;
    }

    function randomCard(set1, set2, set3, set4) {
        let randomNumber = Math.floor(((Math.random()) * 4) + 1)

        if (randomNumber === 1) {
            return ['spades', set1[Math.floor(((Math.random()) * set1.length))]];
        }
        else if (randomNumber === 2) {
            return ['clubs', set2[Math.floor(((Math.random()) * set2.length))]];
        }
        else if (randomNumber === 3) {
            return ['diamonds', set3[Math.floor(((Math.random()) * set3.length))]];
        }
        else if (randomNumber === 4) {
            return ['hearts', set4[Math.floor(((Math.random()) * set4.length))]];
        }
        else {
            return NaN;
        }
    }

    function dealer() {  
        dealerDeck = [];
        dealerDeck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
        dealerDeck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
        dealerPoints = sumPoints(dealerDeck);

        pDealerCards.innerHTML = `Dealer's cards: ${((dealerDeck[0])[1])}${((dealerDeck[0])[0])[0]}; ${((dealerDeck[1])[1])}${((dealerDeck[1])[0])[0]}`;
        pDealerPoints.innerHTML = `Dealer's points: ${dealerPoints}`;

        if (dealerPoints === 21) {
            dealerBlackjack = true;
        }
        else {
            while (dealerPoints < 17) {
                dealerDeck.push(addCardToDeck(deck, dealerDeck, spades, clubs, diamonds, hearts));
                dealerPoints = sumPoints(dealerDeck);
                pDealerCards.innerHTML += `; ${((dealerDeck[dealerDeck.length - 1])[1])}${((dealerDeck[dealerDeck.length - 1])[0])[0]}`;
                pDealerPoints.innerHTML = `Dealer's points: ${dealerPoints}`;
            }
        }
        setTimeout(function() {
            if (!hasSplit) {
                determineWinner(points, blackjack, totalBet);
            }
            else {
                pBegin.innerHTML = `Results for hand 1 are as follow:`;
                determineWinner(points, blackjack, totalBet);
                setTimeout(function() {
                    pBegin.innerHTML = `Results for hand 2 are as follow:`;
                    if (secondHandDeck.length === 2 && secondHandPoints === 21) {
                        determineWinner(secondHandPoints, true, secondHandTotalBet);
                    }
                    else {
                        determineWinner(secondHandPoints, false, secondHandTotalBet);
                    }
                }, 2000);
            }
        }, 2000);
    }

    function determineWinner(points, blackjack, totalBet) {        
        if (points > 21) {
            giveOrTake(false, false, true, false, totalBet, false);
        }
        else if (blackjack && !dealerBlackjack) {
            giveOrTake(true, true, false, false, totalBet, false);
        }
        else if (!blackjack && dealerBlackjack) {
            giveOrTake(false, false, false, false, totalBet, true);
        }
        else if (blackjack && dealerBlackjack) {
            giveOrTake(false, false, false, true, totalBet, true);
        }        
        else if (points === dealerPoints) {
            giveOrTake(false, false, false, true, totalBet, false);
        }
        else if (points <= 21 && dealerPoints > 21) {
            giveOrTake(true, false, false, false, totalBet, false);
        }
        else if (points > dealerPoints) { //Code does not reach if player has gone bust.
            giveOrTake(true, false, false, false, totalBet, false);
        }
        else {
            giveOrTake(false, false, false, false, totalBet, false);
        }
    }

    function giveOrTake(playerWon, wonWithBlackjack, bust, push, totalBet, dealerHasBlackjack) {        
        if (playerWon && wonWithBlackjack) {
            pBegin.innerHTML = `You bet \$${totalBet} and win with Blackjack, so you win \$${totalBet * 2.5}!`;
            totalChips += totalBet * 2.5;
        }
        else if (dealerHasBlackjack) {
            pBegin.innerHTML = `You bet \$${totalBet} but the dealer got Blackjack, so you lose \$${totalBet}.`;
            totalChips -= totalBet;
        }        
        else if (playerWon) {
            pBegin.innerHTML = `You bet \$${totalBet} and win without Blackjack, so you win \$${totalBet * 2}.`;
            totalChips += totalBet;
        }
        else if (bust) {
            pBegin.innerHTML = `You bet \$${totalBet} and went bust, so you lose \$${totalBet}.`;
            totalChips -= totalBet;
        }
        else if (push) {
            pBegin.innerHTML = `You bet \$${totalBet} and the dealer got the same score, so you win back \$${totalBet}.`
        }
        else {
            pBegin.innerHTML = `You bet \$${totalBet} but the dealer wins, so you lose \$${totalBet}.`;
            totalChips -= totalBet;
        }
        if (hasSplit) {
            if (timeToReset) {
                resetBet();
            }
            else {
                timeToReset = true;
            }
        }
        else {
            resetBet();
        }
    }
    
    function prepareToDeal() {
        disableAllArrayOptions();
        pBegin.innerHTML = `Now, it's the dealer's turn.`;
        setTimeout(function() {
            dealer();
        }, 2000);
    }
    









    








    //---Calculator---
    /*

    let num1 = document.querySelector('#num1');
    let operator = document.querySelector('#operator');
    let num2 = document.querySelector('#num2');

    let zero = document.querySelector('#zero');
    let one = document.querySelector('#one');
    let two = document.querySelector('#two');
    let three = document.querySelector('#three');
    let four = document.querySelector('#four');
    let five = document.querySelector('#five');
    let six = document.querySelector('#six');
    let seven = document.querySelector('#seven');
    let eight = document.querySelector('#eight');
    let nine = document.querySelector('#nine');

    let equals = document.querySelector('#equals');
    let division = document.querySelector('#division');
    let multiply = document.querySelector('#multiply');
    let addition = document.querySelector('#addition');
    let subtraction = document.querySelector('#subtraction');
    let dot = document.querySelector('#dot');
    let raiseBy = document.querySelector('#raiseBy');
    
    let summarize = document.querySelector('#summarize');

    let targetHTML = num1;
    let next = false;
    let oper = false;
    let first = true;

    zero.addEventListener('click', function() {
        calcClick(0);
    });

    one.addEventListener('click', function() {
        calcClick(1);
    });

    two.addEventListener('click', function() {
        calcClick(2);
    });

    three.addEventListener('click', function() {
        calcClick(3);
    });

    four.addEventListener('click', function() {
        calcClick(4);
    });

    five.addEventListener('click', function() {
        calcClick(5);
    });

    six.addEventListener('click', function() {
        calcClick(6);
    });

    seven.addEventListener('click', function() {
        calcClick(7);
    });

    eight.addEventListener('click', function() {
        calcClick(8);
    });

    nine.addEventListener('click', function() {
        calcClick(9);
    });

    equals.addEventListener('click', function() {
        summarization(num1.innerHTML, operator.innerHTML, num2.innerHTML);
    });

    dot.addEventListener('click', function() {
        calcClick('.');
    });

    division.addEventListener('click', function() {
        oper = true;
        calcClick('/');
    });

    multiply.addEventListener('click', function() {
        oper = true;
        calcClick('*');
    });

    addition.addEventListener('click', function() {
        oper = true;
        calcClick('+');
    });

    subtraction.addEventListener('click', function() {
        oper = true;
        calcClick('-');
    });

    raiseBy.addEventListener('click', function() {
        oper = true;
        calcClick('^');
    });


    function calcClick(button) {
        if (!first && oper) {
            if (num1.innerHTML === 'x') {
                targetHTML = num1;
                targetHTML.innerHTML='';
                next = false;
                oper = false;
            }
            else if (operator.innerHTML === 'X') {
                targetHTML = operator;
                next = true;
                targetHTML.innerHTML='';
            }
            else if (num2.innerHTML === 'x') {
                targetHTML = num2;
                targetHTML.innerHTML='';
                next = false;
                oper = false;
            }
        }
        else if (oper) {
            oper = false;
            return;
        }
        else if (first) {
            num1.innerHTML='';
        }        

        if (!oper && targetHTML != operator) {
            if (button === 0) {            
                targetHTML.innerHTML+=0;
            }
            else if (button === 1) {
                targetHTML.innerHTML+=1;
            }
            else if (button === 2) {
                targetHTML.innerHTML+=2;
            }
            else if (button === 3) {
                targetHTML.innerHTML+=3;
            }
            else if (button === 4) {
                targetHTML.innerHTML+=4;
            }
            else if (button === 5) {
                targetHTML.innerHTML+=5;
            }
            else if (button === 6) {
                targetHTML.innerHTML+=6;
            }
            else if (button === 7) {
                targetHTML.innerHTML+=7;
            }
            else if (button === 8) {
                targetHTML.innerHTML+=8;
            }
            else if (button === 9) {
                targetHTML.innerHTML+=9;
            }
            else if (button === '.') {
                targetHTML.innerHTML+='.';
            }
        }
        
        else if (oper && targetHTML === operator){
            if (button === '+') {
                targetHTML.innerHTML='+';
            }
            else if (button === '-') {
                targetHTML.innerHTML='-';
            }
            else if (button === '*') {
                targetHTML.innerHTML='*';
            }
            else if (button === '/') {
                targetHTML.innerHTML='/';
            }
            else if (button === '^') {
                targetHTML.innerHTML='^';
            }
            targetHTML = num2;
            targetHTML.innerHTML='';
        }
        oper = false;
        first = false;
    }


    function summarization(num1, operator, num2) {
        if (operator === '+') {
            summarize.innerHTML=(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
        }
        else if (operator === '-') {
            summarize.innerHTML=(`${num1} - ${num2} = ${Number(num1) - Number(num2)}`);
        }
        else if (operator === '*') {
            summarize.innerHTML=(`${num1} * ${num2} = ${Number(num1) * Number(num2)}`);
        }
        else if (operator === '/') {
            summarize.innerHTML=(`${num1} / ${num2} = ${Number(num1) / Number(num2)}`);
        }
        else if (operator === '^') {
            summarize.innerHTML=(`${num1} ^ ${num2} = ${Number(num1) ** Number(num2)}`);
        }
    }
    //Calculator end
    */



























    /*
    let btn = document.querySelector('#coolButton');
    btn.addEventListener('click', onClick);
    let buttonCLicks = 0;

    function onClick()  {
        buttonCLicks++;
        btn.innerHTML=`<p>Button to be clicked<br>Button has been clicked ${buttonCLicks} times.</p>`;
    }
    */
    /*
    let name = '4185';
    let greeting = 'Hi, my name is ';

    let myGreeting = greeting + name + '.';

    console.log(myGreeting);
    */
    /*
    let myGreeting = document.querySelector('#welcomeGreeting');
    let myName = document.querySelector('#welcomeName');

    let newName = '4185';
    let newGreeting = 'Welcome back';

    myGreeting.innerHTML=newGreeting;
    myName.innerHTML=', ' + newName + '.';
    */





















    /*
    let btn = document.querySelector('#coolButton');
    btn.addEventListener('click', buttonClick);

    let btnNum = document.querySelector('#clickCounter');

    let clickCount = 0;
    let previousEntries = document.querySelector('#previousEntries');
    let firstSave = true;
    function buttonClick() {
        clickCount++;
        btnNum.innerHTML=clickCount;
    }

    let saveButton = document.querySelector('#saveButton');
    saveButton.addEventListener('click', save);

    function save(){
        if (clickCount < 1) {
            console.log('Click the button...');
        }
        else if (clickCount === 1){
            console.log('The button has been clicked once.');
        }
        else {
            console.log(`The button has been clicked a grand total of ${clickCount} times!`);
        }
        if (firstSave) {
            firstSave = false;
            previousEntries.textContent=': ';
        }
        else {
            previousEntries.innerHTML+=', ';
        }
        previousEntries.innerHTML+=clickCount;
        btnNum.innerHTML=0;
        clickCount = 0;
    }
    */
    













    
    /*
    //Single element selector
    document.getElementById('anId'); //Only occasionally use.
    document.querySelector('anId'); //Better, but it is SINGLE. 'h1' selects ONLY THE FIRST h1.


    //Multiple element selector
    document.querySelectorAll(h1); //Selects all h1.

    const items = document.querySelectorAll();

    items.forEach((item) => console.log(item));

    const ul = document.querySelectorAll();
    //ul.remove();
    //ul.lastElementChild.remove();
    ul.LastElementChild.innerHTML = '<h1>Hello</h1>';
    */





    /*
    const btn = document.querySelector('#coolButton');
    
    const buton = document.querySelector('.newButton');
    
    //btn.style.background = 'blue';

    btn.addEventListener('click', (e) >=  {
        e.preventDefault();
        console.log('click');
    });
    */
    



    /*
    //Constructor function
    function Person(firstName, lastName, dob) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = new Date(dob);
        this.getBirthYear = function() {
            return this.dob.getFullYear();
            
        }        
    }

    //Sorterar lite bättre...
    Person.prototype.getBirthYear = function() {
        return this.dob.getFullYear();
    }

    Person.prototype.getFullName = function() {
        return `${this.firstName} ${this.lastName}`;
    }

    //Instantiate object
    const person1 = new Person('John', 'Doe', '4-3-1980');
    const person2 = new Person('Mary', 'Smith', '10-6-1990');

    console.log(person1.lastName);
    console.log(person1.dob.getFullYear());
    
    console.log(person1.getBirthYear());
    console.log(person1.getFullName());
    */





    /* Alternativt sätt att göra en simpel funktion
    //const addNums = num1 => num1 + 5;
    //console.log(addNums(7));
    //Skriver ut 12 (5+7).

    //Eller: const addNums = (num1 = 1, num2 = 1) => num1 + num2;

    const addNums = (num1 = 1, num2 = 1) => {
        console.log(num1+num2);
    }

    addNums(5,7);
    */





    /*
    color = 'blue';

    switch(color){
        case 'red':
            console.log('');
            break;
        case 'blue':
            console.log('');
        default:
            console.log('');
    }
    */





    /*
    const x = 15;
    const color = x > 10 ? 'red' : 'blue';
                condition true    false
    If x > 10, color red. !x > 10, color blue
    color = 'red'  
    console.log(color);
    */

    



    /*
    let x = 0;

    let button = document.querySelector("#button");
    //button.style.background = 'red';

    button.addEventListener('click', onClick());

    function onClick()
    {
        console.log("Value of x: " + x);
        x++;
    }
    */
}