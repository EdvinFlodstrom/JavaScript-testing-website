window.onload = init; 


function init()
{
    console.log('Page has been loaded');    

    //---Calculator---

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