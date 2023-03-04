import bigInt from "big-integer";
import {
  hashAndBlindMessage,
  signBlindedMessageHash,
  unblindSignature,
  verifySignature,
} from "blind-signature";

// export function blind(cipherText, number) {
//   console.log(1);
//   let ciphertextDecimalNull = createNumberFromText(cipherText);
//   console.log(3);
//   let multiplicationBigInt = bigInt(ciphertextDecimalNull).multiply(number);

//   return multiplicationBigInt;
// }

// export function blindReverse(cipherText, number, all = false) {
//   let decrBigInt = bigInt(cipherText).divide(number).toString();

//   if (all) {
//     return decrBigInt;
//   }
//   console.log(decrBigInt);
//   //Обратное преобразование
//   let counter = 0;
//   let arrNum = [];
//   let strNum = "";

//   for (let i = 0; i < decrBigInt.length; i++) {
//     strNum += decrBigInt[i];

//     if (parseInt(decrBigInt[i]) !== 0 && counter >= 3) {
//       arrNum.push(strNum.substring(0, strNum.length - 4));
//       counter = 0;
//       strNum = strNum.slice(-1);
//     } else {
//       counter++;
//     }
//   }
//   arrNum.push(strNum.substring(0, strNum.length - 3));

//   //в массив с двоичным
//   let arrNumBinary = [];
//   for (let i = 0; i < arrNum.length; i++) {
//     arrNumBinary.push(convertToBinary1(parseInt(arrNum[i])));
//   }

//   //Из юникода обратно
//   let strCypherText = "";
//   for (let i = 0; i < arrNumBinary.length; i++) {
//     strCypherText += String.fromCharCode(parseInt(arrNumBinary[i], 2));
//   }

//   return strCypherText;
// }

// export function createNumberFromText(str) {
//   console.log(2);
//   const cipherTextUnicode = [];
//   for (let i = 0; i < str.length; i++) {
//     cipherTextUnicode.push(str.charCodeAt(i).toString(2));
//   }

//   //В десятичный
//   let ciphertextDecimal = [];
//   for (let i = 0; i < cipherTextUnicode.length; i++) {
//     ciphertextDecimal.push(parseInt(cipherTextUnicode[i], 2));
//   }

//   //С нулями
//   let ciphertextDecimalNull = "";
//   for (let i = 0; i < ciphertextDecimal.length; i++) {
//     ciphertextDecimalNull += ciphertextDecimal[i] + "000";
//   }

//   return ciphertextDecimalNull;
// }

// function convertToBinary1(number) {
//   let num = number;
//   let binary = (num % 2).toString();
//   for (; num > 1; ) {
//     num = parseInt(num / 2);
//     binary = (num % 2) + binary;
//   }
//   return binary;
// }

export function blind(cipherText, publicKey) {
  console.log(12);
  //   const Bob = {
  //     key: BlindSignature.keyGeneration({ b: 2048 }), // b: key-length
  //     blinded: null,
  //     unblinded: null,
  //     message: null,
  //   };

  //   const Alice = {
  //     message: "Hello Chaum!",
  //     N: null,
  //     E: null,
  //     r: null,
  //     signed: null,
  //     unblinded: null,
  //   };

  //   // Alice wants Bob to sign a message without revealing it's contents.
  //   // Bob can later verify he did sign the message

  //   console.log("Message:", Alice.message);

  //   // Alice gets N and E variables from Bob's key
  //   Alice.N = Bob.key.keyPair.n.toString();
  //   Alice.E = Bob.key.keyPair.e.toString();

  //   const { blinded, r } = BlindSignature.blind({
  //     message: Alice.message,
  //     N: Alice.N,
  //     E: Alice.E,
  //   }); // Alice blinds message
  //   Alice.r = r;

  //   // Alice sends blinded to Bob
  //   Bob.blinded = blinded;

  //   const signed = BlindSignature.sign({
  //     blinded: Bob.blinded,
  //     key: Bob.key,
  //   }); // Bob signs blinded message

  //   // Bob sends signed to Alice
  //   Alice.signed = signed;

  //   const unblinded = BlindSignature.unblind({
  //     signed: Alice.signed,
  //     N: Alice.N,
  //     r: Alice.r,
  //   }); // Alice unblinds
  //   Alice.unblinded = unblinded;

  //   // Alice verifies
  //   const result = BlindSignature.verify({
  //     unblinded: Alice.unblinded,
  //     N: Alice.N,
  //     E: Alice.E,
  //     message: Alice.message,
  //   });
  //   if (result) {
  //     console.log("Alice: Signatures verify!");
  //   } else {
  //     console.log("Alice: Invalid signature");
  //   }

  //   // Alice sends Bob unblinded signature and original message
  //   Bob.unblinded = Alice.unblinded;
  //   Bob.message = Alice.message;

  //   // Bob verifies
  //   const result2 = BlindSignature.verify2({
  //     unblinded: Bob.unblinded,
  //     key: Bob.key,
  //     message: Bob.message,
  //   });
  //   if (result2) {
  //     console.log("Bob: Signatures verify!");
  //   } else {
  //     console.log("Bob: Invalid signature");
  //   }
}
