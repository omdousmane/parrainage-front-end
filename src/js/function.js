// getUser
import {  removeUser, getUserStorage} from "./storage.js";

async function getUser(token) {
  let contentReq = fetch(
    "https://hetic-godson.herokuapp.com/api/v1/readAllUsers",
    {
      headers: { Autorisation: `Beare ${token}` },
    }
  )
    .then((res) => res.json())
    .then((users) => users)
    .catch((err) => {
      console.log(err);
    });
  return contentReq;
}

// loginUser
async function loginUser(data) {
  let contentReq = fetch("https://hetic-godson.herokuapp.com/api/v1/login", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((token) => token)
    .catch((err) => {
      console.log(err);
    });
  return contentReq;
}

// postUser
async function postUser(data) {
  let contentReq = fetch(
    "https://hetic-godson.herokuapp.com/api/v1/createUser",
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((token) => token)
    .catch((err) => {
      console.log(err);
    });
  return contentReq;
}

// print Html
function printHtml(content, alert) {
  let html = `
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>Erreur!</strong> ${content}.
    `;
  alert.style.display = "block";
  alert.innerHTML = html;
}

function checkForm() {
  let godsonSelect = document.getElementsByName("godson");
  let word = document.querySelector(".word");
  for (let i = 0; i < godsonSelect.length; i++) {
    if (godsonSelect[i].checked) {
      if (godsonSelect[i].value === "parrain") {
        word.style.display = "block";
      } else {
        word.style.display = "none";
      }
    }
  }
}

// choise word
async function choiseWord(contents) {
  contents.forEach((content) => {
    content.addEventListener("click", (e) => {
      // e.stopPropagation();
      let dataQuote = e.target.getAttribute("data-cote");
      let dataColor = e.target.getAttribute("data-color");
      console.table(dataQuote, dataColor);
    });
  });
}
 function logout(id) {
  let user = getUserStorage();
  removeUser(user.id)
 }

// exports
export { postUser, loginUser, getUser, printHtml, checkForm, choiseWord , logout};
