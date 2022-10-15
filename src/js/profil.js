import { getUserStorage, removeUser } from "./storage.js";
import { getUser, printHtml, checkForm, choiseWord } from "./function.js";
import { tableHtml, getRandomInt, colors } from "./html.js";

if (localStorage.getItem("user") === null) {
  document.location.href = "/src/views/signin.html";
} else {
  let localContent = getUserStorage();
  let localMail = "";
  if (localContent.email) {
    localMail = localContent.email;
  } else {
    localMail = localContent.user[0].email;
  }

  let getLocalUser = getUserStorage();
  let users = await getUser(getLocalUser.token);
  if (users.user && users.user !== null) {
    let found = [];
    for (let i = 0; i < users.user.length; i++) {
      const elt = users.user[i];
      found = users.user.filter((element) => element.quote !== elt.quote);
    }
    let contents = users.user.find((element) => element.email === localMail);
    found
      .map(function (user) {
        if (user) {
          let tbody = document.querySelector(".tbody");
          tbody.innerHTML += tableHtml(user.quote);
        }
      })
      .join("");
    if (contents.quote !== null && contents.quote !== "undefined") {
      document.querySelector(".table-word").style.display = "none";
    }
    let content = document.querySelectorAll(".content");
    let esss = await choiseWord(content);
  }
}

let logout = document.querySelector(".logout");
logout.addEventListener('click', (e)=>{
  e.preventDefault();
  localStorage.removeItem("user");
  if (localStorage.getItem("user") === null) {
  document.location.href = "/src/views/signin.html";
  }
})
 document.querySelector(".userAvatar").innerHTML = getUserStorage().user[0].email