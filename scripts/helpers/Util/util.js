// mixins
var Util = {};

Util.IntegerToRomanNumeral = function(number) {

    if (number < 1 || number > 3999)  return "Invalid Roman Number Value";

    var numeral = "";

    while (number >= 1000) { numeral += "M"; number -= 1000; }
    while (number >= 900) { numeral += "CM";  number -= 900; }
    while (number >= 500) { numeral += "D";  number -= 500; }
    while (number >= 400) { numeral += "CD";  number -= 400; }
    while (number >= 100) { numeral += "C";  number -= 100; }
    while (number >= 90) { numeral += "XC";  number -= 90; }
    while (number >= 50) { numeral += "L";  number -= 50; }
    while (number >= 40) { numeral += "XL";  number -= 40; }
    while (number >= 10) { numeral += "X";  number -= 10; }
    while (number >= 9) { numeral += "IX";  number -= 9; }
    while (number >= 5) { numeral += "V";  number -= 5; }
    while (number >= 4) { numeral += "IV";  number -= 4; }
    while (number >= 1) { numeral += "I";  number -= 1; }

    return numeral;

};