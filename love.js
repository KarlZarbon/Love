/*
    Author: Karl Zarbon (Feb 2022)

    Repeat the input message while encoding Robert Indiana's 'LOVE' artwork in the result string

    The code is an adaptation of David Ahl original BASIC code 'Love' printed in his book "BASIC Computer Games".
 
*/




// 'LOVE' spacing information
let data = [60,1,12,26,9,12,3,8,24,17,8,4,6,23,21,6,4,6,22,12,5,6,5,
4,6,21,11,8,6,4,4,6,21,10,10,5,4,4,6,21,9,11,5,4,
4,6,21,8,11,6,4,4,6,21,7,11,7,4,4,6,21,6,11,8,4,
4,6,19,1,1,5,11,9,4,4,6,19,1,1,5,10,10,4,4,6,18,2,1,6,8,11,4,
4,6,17,3,1,7,5,13,4,4,6,15,5,2,23,5,1,29,5,17,8,
1,29,9,9,12,1,13,5,40,1,1,13,5,40,1,4,6,13,3,10,6,12,5,1,
5,6,11,3,11,6,14,3,1,5,6,11,3,11,6,15,2,1,
6,6,9,3,12,6,16,1,1,6,6,9,3,12,6,7,1,10,
7,6,7,3,13,6,6,2,10,7,6,7,3,13,14,10,8,6,5,3,14,6,6,2,10,
8,6,5,3,14,6,7,1,10,9,6,3,3,15,6,16,1,1,
9,6,3,3,15,6,15,2,1,10,6,1,3,16,6,14,3,1,10,10,16,6,12,5,1,
11,8,13,27,1,11,8,13,27,1,60]


const MAXLENGTH = 60
const MAXHEIGHT = 37

// Construct a string by repeating the input message and encoding the 'LOVE' artwork
class LoveGenerator {

    constructor(msg) {
        this.initMsg(msg)
        // wrap the input text or always start from the beginning
        this.wrap = false
    }

    init() {

        this.charNumber;  // current position in a line
        this.printMessage = true; // print text or space
        this.lineNumber = 0;
        this.dataIdx = 0;
        this.msgIndex = 0;

        this.result = ""
        this.newline = true; // used to initialize variable for a new line
    }

    initMsg(msg) {
        this.init()

        this.msg = msg;
        this.msgLength = msg.length;

        // repeat and store input message
        if (this.msgLength > 0) {
            this.textArray = []
            let floorL = Math.floor(MAXLENGTH / this.msgLength)

            for (let j = 0; j <= floorL; j++) {
                for (let i = 1; i <= this.msgLength; i++) {
                    this.textArray[j * this.msgLength + i - 1] = this.msg[i - 1]
                }
            }
        }
    }

    setWrap(value) {
        this.wrap = value
    }

    generate() {
        while (this.lineNumber < MAXHEIGHT) {
            if (this.newline) {
                this.initNewline();
            }
            else {
                this.generateLine();
            }
        }
    }

    getMessage() {
        return this.result
    }


    initNewline() {

        this.charNumber = 1;
        this.printMessage = true;
        this.lineNumber++;
        this.newline = false
    }

    generateLine() {

        let a;
        a = data[this.dataIdx++];
        this.charNumber += a;
        if (this.printMessage == true) {
            this.addMsgText(a);
        }
        else {
            this.addSpace(a);
        }
        if (this.charNumber > MAXLENGTH) {
            this.newline = true
        }
    }


    addMsgText(a) {
        for (let i = this.charNumber - a; i <= this.charNumber - 1; i++) {
            if (!this.wrap) {
                this.result += this.textArray[i - 1];

            }
            else {
                this.result += this.msg[(this.msgIndex++) % this.msgLength];
            }
        }
        this.printMessage = false
    }


    addSpace(a) {

        for (let i = 0; i < a; i++) {
            this.result += ' ';
        }
        this.printMessage = true;

    }
}


// Original BASIC code from the book "BASIC Computer Games" 
// by David H. Ahl.


// 2 PRINT TAB(33);"LOVE"
// 4 PRINT TAB(15);"CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
// 6 PRINT: PRINT: PRINT
// 20 PRINT "A TRIBUTE TO THE GREAT AMERICAN ARTIST, ROBERT INDIANA."
// 30 PRINT "HIS GREATEST WORK WILL BE REPRODUCED WITH A MESSAGE OF"
// 40 PRINT "YOUR CHOICE UP TO 60 CHARACTERS.  IF YOU CAN'T THINK OF"
// 50 PRINT "A MESSAGE, SIMPLE TYPE THE WORD 'LOVE'": PRINT
// 60 INPUT "YOUR MESSAGE, PLEASE";A$: L=LEN(A$)
// 70 DIM T$(120): FOR I=1 TO 10: PRINT: NEXT I
// 100 FOR J=0 TO INT(60/L)
// 110 FOR I=1 TO L
// 120 T$(J*L+I)=MID$(A$,I,1)
// 130 NEXT I: NEXT J
// 140 C=0
// 200 charNumber=1: P=1: C=C+1: IF C=37 THEN 999
// 205 PRINT
// 210 READ A: charNumber=charNumber+A: IF P=1 THEN 300
// 240 FOR I=1 TO A: PRINT " ";: NEXT I: P=1: GOTO 400
// 300 FOR I=charNumber-A TO charNumber-1: PRINT T$(I);: NEXT I: P=0
// 400 IF charNumber>60 THEN 200
// 410 GOTO 210
// 600 DATA 60,1,12,26,9,12,3,8,24,17,8,4,6,23,21,6,4,6,22,12,5,6,5
// 610 DATA 4,6,21,11,8,6,4,4,6,21,10,10,5,4,4,6,21,9,11,5,4
// 620 DATA 4,6,21,8,11,6,4,4,6,21,7,11,7,4,4,6,21,6,11,8,4
// 630 DATA 4,6,19,1,1,5,11,9,4,4,6,19,1,1,5,10,10,4,4,6,18,2,1,6,8,11,4
// 640 DATA 4,6,17,3,1,7,5,13,4,4,6,15,5,2,23,5,1,29,5,17,8
// 650 DATA 1,29,9,9,12,1,13,5,40,1,1,13,5,40,1,4,6,13,3,10,6,12,5,1
// 660 DATA 5,6,11,3,11,6,14,3,1,5,6,11,3,11,6,15,2,1
// 670 DATA 6,6,9,3,12,6,16,1,1,6,6,9,3,12,6,7,1,10
// 680 DATA 7,6,7,3,13,6,6,2,10,7,6,7,3,13,14,10,8,6,5,3,14,6,6,2,10
// 690 DATA 8,6,5,3,14,6,7,1,10,9,6,3,3,15,6,16,1,1
// 700 DATA 9,6,3,3,15,6,15,2,1,10,6,1,3,16,6,14,3,1,10,10,16,6,12,5,1
// 710 DATA 11,8,13,27,1,11,8,13,27,1,60
// 999 FOR I=1 TO 10: PRINT: NEXT I: END