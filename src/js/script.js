// recuperation du formulaire avec formaData
var form = document.querySelector("form");
// console.log(form);
// const data = {};

// Requêter tout les utilisateurs.
const getUser = fetch("https://hetic-godson.herokuapp.com/api/v1/readAllUsers")
  .then((res) => res.json())
  .then((data) => console.log(data));

getUser;

function postUsers(data) {
  fetch("https://hetic-godson.herokuapp.com/api/v1/login", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}
