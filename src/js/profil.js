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

  let localMail = "";
  if (localContent.email) {
    localMail = localContent.email;
  } else {
    localMail = localContent.user[0].email;
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
    console.log(found);
    let contents = users.user.find((element) => element.email === localMail);
    console.log(contents.quote);
    console.log(contents);

    console.log(localMail);
    console.log(found);
    console.log(localMail);
    found
      .map(function (user) {
        if (user) {
          let tbody = document.querySelector(".tbody");
          tbody.innerHTML += tableHtml(user.quote);
        }
      })
      .join("");
    if (
      contents.quote !== null &&
      contents.quote !== "undefined" &&
      contents.quote !== ""
    ) {
      document.querySelector(".table-word").style.display = "none";
    }
    let content = document.querySelectorAll(".content");
    let esss = await choiseWord(content);
  }
}
