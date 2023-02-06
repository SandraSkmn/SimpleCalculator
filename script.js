//All code assumes inputted parameter will be a string//

//Not all possible simple arithmetic is accounted for - code will not except 10/-5 for example, as handling of negative numbers hasn't been coded in - instead will throw out error//
//However will account for '--' i.e. 10--3 = 13//

//Function for doing simple maths//
function doMaths(string_equation) {


    //First check to see if input is an equation or single number - if single number, just return than number, no need to do any calculations//
    if (isNaN(string_equation) == false) {
        return parseFloat(string_equation)
    } else {
        //pass//
    }

    //check function to handle negative numbers at start of equation (otherwise code doesn't work)//
    //By adding a zero, result should stay the same but programme can now read it//

    function handleNegative(input) {
        if (input.at(0) == '-') {
            return '0' + `${input}`
        } else {
            return input
        }
    }

    safe_equation = handleNegative(string_equation)

    //Looks through inputted string and creates a list of the indices of any operations called oplist//

    let oplist = []

    let n = -1 //start at minus one so index of first loop is zero

    for (char of safe_equation) {
        n += 1
        if (['/', '+', '-', '*'].includes(char)) {
            oplist.push(n)
        } else {

        }
    }


    //For each value at the operator index, this function splits the initial equation string into separate number strings stored in a list called numbers//

    let numbers = []
    let i = -1

    for (num of oplist) {
        i += 1
        if (i == 0) {
            numbers.push(safe_equation.slice(0, num));
            numbers.push(safe_equation.slice(oplist[i] + 1, oplist[i + 1]))
        } else if (i == oplist.length - 1) {
            numbers.push(safe_equation.slice(num + 1));
        } else {
            numbers.push(safe_equation.slice(oplist[i] + 1, oplist[i + 1]));
        }
    }


    //Turns result of above into list of floats rather than strings//

    let numberints = [] //Should be names numberfloats really but I changed this at the end

    for (num of numbers) {
        numberints.push(parseFloat(num))
    }


    //Simple math functions//

    function divide(num1, num2) {
        return num1 / num2
    }

    function times(num1, num2) {
        return num1 * num2
    }

    function add(num1, num2) {
        return num1 + num2
    }

    function minus(num1, num2) {
        return num1 - num2
    }


    //Function to get list of operators rather than their indices (so far only have list of indices of operators in oplist)//

    let opliststring = []

    for (index of oplist) {
        opliststring.push(safe_equation[index])
    }


    //Now to do maths - BODMAS!//

    //a sets index position and inlist is a boolean to check whether the operator in question is in the list of operators (i.e. we only need to divide if divide was in the initial equation)//

    a = -1
    let inlist = opliststring.includes('/')


    //Divide first - loop will keep running while divide sign is in list, until no more left//

    //Code explanation line by line:
    //1: inlist variable checks to see if the desired operation (in this case divide) was in the list of operations derived from the inputted string. While yes (true) then run code.
    //2: a is the variable that keeps track of which index we're on. At the start of each while loop, set this to default (-1).
    //3: Need to iterate through list of operations in the list made from the original string
    //4: For each operator in the operations list, increase the index counter by one
    //5: If the operation in the list is divide, do the following code
    //6: New local variable called newvalue holds the result of the divide function. The two numbers to divide are num1, the number at the same index in the numbers list as the index of the operator in the operator list, and num2, the subsequent number (i.e. index or a + 1)
    //7: The two numbers that have now been divided by the divide function need to be replaced by newvalue (i.e. result of division) - done with splice function. 
    //8: The division operation, having been done, also needs to be removed from the operations list otherwise will be stuck in an endless loop
    //9: Check again to see if there is still more division to be done by checking if there are anymore divide signs in list - if yes, loop will re-run. Once no more, loop breaks, meaning all division operations have been done.
    //10: For operations that aren't divide, pass over without doing anything

    while (inlist) { //1
        a = -1 //2
        for (op of opliststring) { //3
            a += 1 //4
            if (op == '/') { //5
                let newvalue = divide(numberints[a], numberints[a + 1]) //6
                numberints.splice(a, 2, newvalue) //7
                opliststring.splice(a, 1) //8
                inlist = opliststring.includes('/') //9
            } else { //10
                //pass//
            }
        }
    }



    //Then multiply - identical to above but for multiplication rather than division//

    inlist = opliststring.includes('*')

    while (inlist) {
        a = -1
        for (op of opliststring) {
            a += 1
            if (op == '*') {
                let newvalue = times(numberints[a], numberints[a + 1])
                numberints.splice(a, 2, newvalue)
                opliststring.splice(a, 1)
                inlist = opliststring.includes('*')
            } else {
                //pass//
            }
        }
    }

    //Then add and subtract - need to together as they are of equal importance in BODMAS//
    //i.e. adding first for 8 + 3 - 2 + 4 gives you 11 - 6 which is 5. this is the wrong answer //

    //While loop to keep running code until there is a single final answer//

    while (numberints.length > 1) {
        if (opliststring[0] == '+') {
            let newtotal = add(numberints[0], numberints[1])
            numberints.splice(0, 2, newtotal)
            opliststring.splice(0, 1)
        } else if (opliststring[0] == '-') {
            let newtotal = minus(numberints[0], numberints[1])
            numberints.splice(0, 2, newtotal)
            opliststring.splice(0, 1)
        } else {
            break
        }
    }
    return numberints[0].toString()
}








//function for trigonometry//

function doTrig(trigequation) {

    //Goes backwards through inputted string until finds a trig function//
    //If found, will add index of trig function in string into triglist array, with indices in descending order//

    let triglist = []

    for (var i = trigequation.length - 1; i >= 0; i--) {
        if (['s', 'c', 't'].includes(trigequation[i])) {
            triglist.push(i)
        } else {
            //pass//
        }
    }

    //Equations for trig functions//
    //Kept getting wrong answers - found out JS expects inputs to be in radians for trig functions//
    //So extra line to convert degrees to radians//

    function sine(num1) {
        radian = num1 * Math.PI / 180
        return Math.sin(radian);
    }

    function cosine(num1) {
        radian = num1 * Math.PI / 180
        return Math.cos(radian);
    }

    function tangent(num1) {
        radian = num1 * Math.PI / 180
        return Math.tan(radian);
    }

    //Working from end of equation backwards, firstly solving any simple equations within the scope of the trig function, then doing trig function themselves//
    //Work backwards as this calculator won't have brackets. Anything typed after trig functions will be considered to be inside the function. Multiple trig functions will therefore be nested, so will need to get the outcome of the last one first, and so on.

    //Case switching - different trig functions depending on which trig symbol is at the defined index//
    for (indexvalue of triglist) {
        let innersum = doMaths(trigequation.slice(indexvalue + 1))
        let innertotal
        switch (trigequation[indexvalue]) {
            case 's':
                innertotal = sine(innersum)
                trigequation = trigequation.slice(0, indexvalue)
                trigequation += innertotal.toString()
                break
            case 'c':
                innertotal = cosine(innersum)
                trigequation = trigequation.slice(0, indexvalue)
                trigequation += innertotal.toString()
                break
            case 't':
                innertotal = tangent(innersum)
                trigequation = trigequation.slice(0, indexvalue)
                trigequation += innertotal.toString()
                break
            default:
                console.log('Error somewhere')
                break
        }

    }

    return trigequation.toString()
}


//Function putting everything together to manage all equations//

function AllTheMaths(string) {
    //First check if any trigonometry in the equation - if yes, solve them first//
    //Seen later, but trig functions will be identified by a single letter in the equation//
    if (string.includes('s')||string.includes('c')||string.includes('t')) {
        return doMaths(doTrig(string))
    } else { //Otherwise only need doMaths function//
        return doMaths(string)
    }
}

//---------------------------------Coding for maths finished, coding for button functionality below-------------------------------------//


//Functionality for calculator buttons//

//First default display and equation are blank when page initially loaded//

let inputEquation = ""
let inputDisplay = ""

//Numbers - when clicked, changes output on calculator and changes string equation//


function numZero() {
    inputEquation = inputEquation.concat('0')
    inputDisplay = inputDisplay.concat('0')
}

function numOne() {
    inputEquation = inputEquation.concat('1')
    inputDisplay = inputDisplay.concat('1')
}

function numTwo() {
    inputEquation = inputEquation.concat('2')
    inputDisplay = inputDisplay.concat('2')
}

function numThree() {
    inputEquation = inputEquation.concat('3')
    inputDisplay = inputDisplay.concat('3')
}

function numFour() {
    inputEquation = inputEquation.concat('4')
    inputDisplay = inputDisplay.concat('4')
}

function numFive() {
    inputEquation = inputEquation.concat('5')
    inputDisplay = inputDisplay.concat('5')
}

function numSix() {
    inputEquation = inputEquation.concat('6')
    inputDisplay = inputDisplay.concat('6')
}

function numSeven() {
    inputEquation = inputEquation.concat('7')
    inputDisplay = inputDisplay.concat('7')
}

function numEight() {
    inputEquation = inputEquation.concat('8')
    inputDisplay = inputDisplay.concat('8')
}

function numNine() {
    inputEquation = inputEquation.concat('9')
    inputDisplay = inputDisplay.concat('9')
}

function numDot() {
    inputEquation = inputEquation.concat('.')
    inputDisplay = inputDisplay.concat('.')
}

//Operations//

function opSin() {
    inputEquation = inputEquation.concat('s')
    inputDisplay = inputDisplay.concat('sin(')
}

function opCos() {
    inputEquation = inputEquation.concat('c')
    inputDisplay = inputDisplay.concat('cos(')
}

function opTan() {
    inputEquation = inputEquation.concat('t')
    inputDisplay = inputDisplay.concat('tan(')
}

function opDiv() {
    inputEquation = inputEquation.concat('/')
    inputDisplay = inputDisplay.concat(' ÷ ')
}

function opTim() {
    inputEquation = inputEquation.concat('*')
    inputDisplay = inputDisplay.concat(' × ')
}

function opAdd() {
    inputEquation = inputEquation.concat('+')
    inputDisplay = inputDisplay.concat(' + ')
}

function opMin() {
    inputEquation = inputEquation.concat('-')
    inputDisplay = inputDisplay.concat(' - ')
}

//Clear button//
function clearAll() {
    inputEquation = ""
    inputDisplay = ""
}

//Equals button//
function Equals() {
    if (checkValid(inputEquation)) {
        let inputEquationb = doubleNegCheck(inputEquation)
        let answer = AllTheMaths(inputEquationb)
        inputDisplay = answer
        console.log(answer)
    } else {
        alert('Invalid input, please try again')
        clearAll()
    }
    appendOutput()
    clearAll()
}
   


//Change calculator output function//

function appendOutput() {
    document.getElementById('calculator_output').innerHTML = `<p>${inputDisplay}</p>`
}



//Check valid input for equals button - checks condition for which inputted string is not valid//
//Nested functions inside for each fail condition//

function checkValid(inputEquation) {
    //Checks to see that final input is a number a not an operation (include trig)//
    function lastDigit(inputEquation) {
        if (isNaN(inputEquation.at(-1))) {
            return false
        } else {
            return true
        }
    }

    //Checks to see the first input is a number and not an operation (exclude trig and minus)//

    function firstDigit(inputEquation) {
        if (['+', '/', '*'].includes((inputEquation[0]))) {
            return false
        } else {
            return true
        }
    }

    //Checks to see that there aren't two operations adjacent to each other (excludes minus minus)//
    function twoOps(inputEquation) {
        let defaultBool = true
        for (var x = 0; x < inputEquation.length; x++) {
            if (['+', '-', '/', '*'].includes(inputEquation[x]) && (['+', '-', '/', '*'].includes(inputEquation[x+1])) && (!inputEquation[x] == inputEquation[x+1] == '-')) {
                defaultBool = false;
            } else {
                //pass//
            }
        }

        return defaultBool
    }

    //Checks to see that if there is a trig function, the next value is a number (exception for minus)//

    function trigOp(inputEquation) {
        let defaultBool = true
        for (var x = 0; x < inputEquation.length; x++) {
            if (['s', 'c', 't'].includes(inputEquation[x]) && (['+', '/', '*'].includes(inputEquation[x+1]))) {
                defaultBool = false;
            } else {
                //pass//
            }
        }

        return defaultBool
    }

    //Overall code//

    let overallBool = true

    if (!lastDigit(inputEquation)||!firstDigit(inputEquation)||!twoOps(inputEquation)||!trigOp(inputEquation)) {
        overallBool = false
    }

    return overallBool
}

//Check to see if any double negatives in equation - should change to plus//

function doubleNegCheck(inputstring) {
    
    if (inputstring.includes('--')) {
        let inputHolder = inputstring.replace('--', '+')
        return inputHolder
    } else {
        return inputstring
    }
}




