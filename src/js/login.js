import { loginUser, printHtml } from "./function.js";
// import { alert } from "../../app.js";
import { getUserStorage, saveUserStorage, removeUser } from "./storage.js";
const formLogin = document.getElementById("form");

let alert = document.querySelector(".alert");
if (document.querySelector(".alert")) {
  alert.style.display = "none";
}

// submit form login
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    let content = await loginUser(data);
    console.log(content);
    // check if we got the token
    if (content.token && content.token !== null) {
      // check if the user is admin
      if (content.user[0].admin === true) {
        let choise = ["Oui", "Non"];
        let res = prompt(
          `Voulez-vous vous connecté comme admin? ${choise[0]} ou ${choise[1]}`
        );
        saveUserStorage(content);
        if (res.toLocaleLowerCase() === "oui") {
          window.location.href = "/src/views/admin.html";
        } else {
          window.location.href = "/src/views/profil.html";
          // console.log(res);
        }
      } else {
        saveUserStorage(content);
        window.location.href = "/src/views/profil.html";
      }
    } else {
      let message = content.message;
      printHtml(message, alert);
    }
  });
}
