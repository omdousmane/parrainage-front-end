import { getUserStorage, saveUserStorage, removeUser } from "./storage.js";
import { getUser, printHtml, checkForm, choiseWord } from "./function.js";
import { tableHtml, getRandomInt, colors } from "./html.js";

import { alert } from "../../app.js";

if (localStorage.getItem("user") === null) {
  document.location.href = "/src/views/signin.html";
} else {
  let localContent = getUserStorage();

  // console.log(localContent.user[0].email);
  console.log(localContent);
  let localMail;
  if (localContent.user.email !== "undefined") {
    localMail = localContent.user[0].email;
  } else {
    localMail = localContent.user.email;
  }

  // let localMail = localContent.user[0].email;
  console.log(localMail);

  let getLocalUser = getUserStorage();
  let users = await getUser(getLocalUser.token);
  console.log(users);

  if (users.user && users.user !== null) {
    console.log(users.user);
    let found = [];
    for (let i = 0; i < users.user.length; i++) {
      const elt = users.user[i];
      found = users.user.filter((element) => element.quote !== elt.quote);
    }
    let content = found.find((element) => element.email === localMail);

    console.log(localMail);
    console.log(found);
    console.log(content);
    console.log(localMail);
    found.forEach((element) => {
      if (element.email === localMail) {
        if (element.quote !== null) {
          document.querySelector(".table-word").style.display = "none";
        }
      }
    });
    found
      .map(function (user) {
        if (user !== null) {
          let tbody = document.querySelector(".tbody");
          tbody.innerHTML += tableHtml(user.quote);
        }
      })
      .join("");
    content = document.querySelectorAll(".content");
    let esss = await choiseWord(content);
  }
}
