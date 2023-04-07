import bigInt from "big-integer";

export function blind(cipherText, number) {
  let ciphertextDecimalNull = createNumberFromText(cipherText);
  let multiplicationBigInt = bigInt(ciphertextDecimalNull).multiply(number);

  return multiplicationBigInt.toString();
}

export function blindReverse(cipherText, number, all = false) {
  let decrBigInt = bigInt(cipherText).divide(number).toString();

  if (all) {
    return decrBigInt;
  }

  //Обратное преобразование
  let counter = 0;
  let arrNum = [];
  let strNum = "";

  for (let i = 0; i < decrBigInt.length; i++) {
    strNum += decrBigInt[i];

    if (parseInt(decrBigInt[i]) !== 0 && counter >= 3) {
      arrNum.push(strNum.substring(0, strNum.length - 4));
      counter = 0;
      strNum = strNum.slice(-1);
    } else {
      counter++;
    }
  }
  arrNum.push(strNum.substring(0, strNum.length - 3));

  //в массив с двоичным
  let arrNumBinary = [];
  for (let i = 0; i < arrNum.length; i++) {
    arrNumBinary.push(convertToBinary1(parseInt(arrNum[i])));
  }

  //Из юникода обратно
  let strCypherText = "";
  for (let i = 0; i < arrNumBinary.length; i++) {
    strCypherText += String.fromCharCode(parseInt(arrNumBinary[i], 2));
  }

  return strCypherText;
}

export function createNumberFromText(str) {
  const cipherTextUnicode = [];
  for (let i = 0; i < str.length; i++) {
    cipherTextUnicode.push(str.charCodeAt(i).toString(2));
  }

  //В десятичный
  let ciphertextDecimal = [];
  for (let i = 0; i < cipherTextUnicode.length; i++) {
    ciphertextDecimal.push(parseInt(cipherTextUnicode[i], 2));
  }

  //С нулями
  let ciphertextDecimalNull = "";
  for (let i = 0; i < ciphertextDecimal.length; i++) {
    ciphertextDecimalNull += ciphertextDecimal[i] + "000";
  }

  return ciphertextDecimalNull;
}

function convertToBinary1(number) {
  let num = number;
  let binary = (num % 2).toString();
  for (; num > 1; ) {
    num = parseInt(num / 2);
    binary = (num % 2) + binary;
  }
  return binary;
}

// function isCoprime(a, b) {
//   02;
//   console.log(a + "," + b);
//   03;
//   var num;
//   04;
//   while (b) {
//     05;
//     num = a % b;
//     06;
//     console.log(num);
//     07;
//     a = b;
//     08;
//     b = num;
//     09;
//   }
//   10;
//   if (Math.abs(a) == 1) {
//     11;
//     console.log(true);
//     12;
//     return true;
//     13;
//   }
//   14;
//   console.log(false);
//   15;
//   return false;
//   16;
// }
// 17;
// isCoprime(1071, 462);
// 18;
// isCoprime(14, 25);
// 19;
// isCoprime(15, 25);
// 20;
// isCoprime(1, 1);
