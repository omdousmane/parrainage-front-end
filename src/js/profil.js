import { getUserStorage, saveUserStorage } from "./storage.js";
import {
  getUser,
  postGodson,
  getGodson,
  getAllGodson,
  renderQuote,
  quoteModal,
  nextPage,
  previousPage,
  logout,
  sort,
  printAlert,
} from "./function.js";

import { closeBtn } from "./modal.js";

if (localStorage.getItem("user") === null) {
  document.location.href = "/src/views/signin.html";
} else {
  let getLocalUser = getUserStorage();
  let getGodsons = await getGodson(getLocalUser.token);

  let data, table, sortCol, selectQuotes, prompt, tablePrompt, dataGodson;
  let sortAsc = false;
  const pageSize = 4;
  let curPage = 1;
  let contentQuoteAndColorSelected = [];
  let parentId;

  window.addEventListener("DOMContentLoaded", checkQuoteChoise());

  // check quote choise
  function checkQuoteChoise() {
    let findUser = getGodsons.godson.find(
      (element) => element.godsonId === getLocalUser.user._id
    );
    if (findUser !== "undefined" && findUser) {
      document.querySelector(".table-quote").style.display = "none";
      let quoteSelected = document.querySelector(".quote-choise");
      let div = document.createElement("div");
      div.classList.add("slideshow-container");
      let html = `
        <h3>Phrase de parrain choisie</h3>
        <div class="mySlides">
          <q>${findUser.selectedQuote}</q>
          <div class="btnQuote" style="background-color: ${findUser.color};">${findUser.color}</div>
        </div>
      `;
      div.innerHTML = html;
      quoteSelected.appendChild(div);
    }
    return findUser;
  }

  // select quote
  function selectQuote() {
    selectQuotes = document.querySelectorAll("#selctQuote td");
    selectQuotes.forEach((selctQuote) => {
      selctQuote.addEventListener("click", (e) => {
        let coteAndColor = e.target.getAttribute("data-coteAndColor");
        parentId = e.target.getAttribute("data-id");
        console.log(coteAndColor);
        contentQuoteAndColorSelected = coteAndColor.split(":");

        tablePrompt = document.querySelector(".tablePrompt");
        tablePrompt.innerHTML = quoteModal();
        validChoise();
      });
    });
  }

  // validation choise
  function validChoise() {
    let confirm = document.querySelector("#confirmBtn");
    confirm.addEventListener("click", async (e) => {
      checkQuoteChoise();

      // create data object for godson
      dataGodson = {
        godsonId: getLocalUser.user._id,
        parentId: parentId,
        idFamily: 1,
        color: contentQuoteAndColorSelected[1],
        selectedQuote: contentQuoteAndColorSelected[0],
      };
      // postgodsn requete
      data = await postGodson(dataGodson, getLocalUser.token);
      if (data) {
        document.querySelector(".table-quote").style.display = "none";
        await choise(data);
      }
      let html = `
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>Success!</strong> ${data.message}.
       `;
      checkQuoteChoise();
      await printAlert(html);
      await closeBtn();
    });
  }

  async function choise(data) {
    console.log(data);
    let quoteSelected = document.querySelector(".quote-choise");
    let div = document.createElement("div");
    div.classList.add("slideshow-container");
    let html = `
        <h3>Phrase de parrain choisie</h3>
        <div class="mySlides">
          <q>${data.user.selectedQuote}</q>
          <div class="btnQuote" style="background-color: ${data.user.color};">${data.user.color}</div>
        </div>
      `;
    div.innerHTML = html;
    quoteSelected.appendChild(div);
  }
  // get data from database
  data = await getUser(getLocalUser.token);
  if (data.user && data.user !== null) {
    let users = data.user;
    const newDataUser = users.filter((user) => user.quote !== "");
    table = document.querySelector(".tbody");
    table.innerHTML = renderQuote(newDataUser, curPage, pageSize);
    selectQuote();

    // listen for sort clicks
    let ths = document.querySelectorAll("#catTable thead tr th");
    ths.forEach((t) => {
      t.addEventListener("click", () => {
        table.innerHTML = sort(newDataUser);
      });
    });

    //  nextPage
    document.querySelector("#nextButton").addEventListener("click", () => {
      table.innerHTML = nextPage(newDataUser);
      selectQuote();
    });

    //  previousPage
    document.querySelector("#prevButton").addEventListener("click", () => {
      table.innerHTML = previousPage(newDataUser);
      selectQuote();
    });
  }
}
logout();
document.querySelector(".userAvatar").innerHTML = getUserStorage().user.email;
