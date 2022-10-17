import { postUser, checkForm } from "./function.js";
import { getUserStorage, saveUserStorage } from "./storage.js";

const formRegister = document.getElementById("formRegister");

let alert = document.querySelector(".alert");
if (document.querySelector(".alert")) {
  alert.style.display = "none";
}

// submit form register
if (formRegister) {
  // selection du godson
  formRegister.addEventListener("change", () => {
    checkForm();
  });

  // submit form register
  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    let lastName = document.getElementById("lastname");
    let firstName = document.getElementById("firstname");
    let email = document.getElementById("email");
    let training = document.getElementById("training");
    let password = document.getElementById("password");
    let quote = document.getElementById("quote");
    let name = firstName.value.concat(" ", lastName.value);

    let data = {
      name: name,
      email: email.value,
      training: training.value,
      password: password.value,
      quote: quote.value ?? "",
    };

    let content = await postUser(data);
    if (content.user && content.user !== null) {
      saveUserStorage(content);
      window.location.href = "/src/views/profil.html";
    } else {
      let message = content.err;

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
  });
}
