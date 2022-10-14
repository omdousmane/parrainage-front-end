// import { onblur, onkeyup } from "./src/js/checkPassword.js";

// let input = document.getElementById("password");
// let letter = document.getElementById("letter");
// let capital = document.getElementById("capital");
// let number = document.getElementById("number");
// let length = document.getElementById("length");
// let message = document.getElementById("message");

// // When the user clicks on the password field, show the message box
// // function onfocus(message) {
// //   message.style.display = "block";
// //   console.log("ousmane");
// // }

// // When the user clicks outside of the password field, hide the message box
// function onblur(message) {
//   console.log("diallo");
//   message.style.display = "none";
// }

// // When the user starts to type something inside the password field
// function onkeyup(input, letter, capital, number, length) {
//   console.log(input.value);
//   // Validate lowercase letters
//   var lowerCaseLetters = /[a-z]/g;
//   if (input.value.match(lowerCaseLetters)) {
//     letter.classList.remove("invalid");
//     letter.classList.add("valid");
//   } else {
//     letter.classList.remove("valid");
//     letter.classList.add("invalid");
//   }

//   // Validate capital letters
//   var upperCaseLetters = /[A-Z]/g;
//   if (input.value.match(upperCaseLetters)) {
//     capital.classList.remove("invalid");
//     capital.classList.add("valid");
//   } else {
//     capital.classList.remove("valid");
//     capital.classList.add("invalid");
//   }

//   // Validate numbers
//   var numbers = /[0-9]/g;
//   if (input.value.match(numbers)) {
//     number.classList.remove("invalid");
//     number.classList.add("valid");
//   } else {
//     number.classList.remove("valid");
//     number.classList.add("invalid");
//   }

//   // Validate length
//   if (input.value.length >= 8) {
//     length.classList.remove("invalid");
//     length.classList.add("valid");
//   } else {
//     length.classList.remove("valid");
//     length.classList.add("invalid");
//   }
// }
// // export { onblur, onfocus, onkeyup };
