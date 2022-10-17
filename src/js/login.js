import { loginUser, printAlert, confirmChoise } from "./function.js";
import { closeBtn } from "./modal.js";

import {
  saveUserStorage,
  saveAdminStorage,
  getAdminStorage,
} from "./storage.js";
const formLogin = document.getElementById("form");

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
    let message = content.message;

    // check if we have some error message
    if (message && message !== "") {
      let html = `
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <strong>Erreur!</strong> ${message}.
      `;
      let parent = document.querySelector(".notification");
      let alert = document.createElement("div");
      alert.classList.add("alert");
      alert.innerHTML = html;
      parent.append(alert);
    }
    if (content.token && content.token !== null) {
      if (content.user.admin === false) {
        saveUserStorage(content);
        window.location.href = "/src/views/profil.html";
      } else {
        confirmChoise(content);
      }
    }
  });
}
