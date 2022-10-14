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
    // check if we got the token
    if (content.token && content.token !== null) {
      saveUserStorage(content);
      window.location.href = "/src/views/profil.html";
    } else {
      let message = content.message;
      printHtml(message, alert);
    }
  });
}
