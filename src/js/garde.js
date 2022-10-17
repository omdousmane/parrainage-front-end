import { getUserStorage, removeUser } from "./storage.js";
import {
  getUser,
  renderTable,
  renderQuote,
  nextPage,
  previousPage,
  sort,
} from "./function.js";

if (localStorage.getItem("user") === null) {
  document.location.href = "/src/views/signin.html";
} else {
  let getLocalUser = getUserStorage();
  const localMail = getLocalUser.email;

  let data, table, sortCol;
  let sortAsc = false;
  const pageSize = 4;
  let curPage = 1;

  data = await getUser(getLocalUser.token);
  if (data.user && data.user !== null) {
    let users = data.user;
    const newDataUser = users.filter((user) => user.quote !== "");
    console.log(newDataUser);

    table = document.querySelector(".tbody");
    table.innerHTML = renderQuote(newDataUser, curPage, pageSize);

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
    });

    //  previousPage
    document.querySelector("#prevButton").addEventListener("click", () => {
      table.innerHTML = previousPage(newDataUser);
    });
  }
}

// let tbody = document.querySelector(".tbody");
// tbody.innerHTML += tableHtml(user.quote);

let logout = document.querySelector(".logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("user");
  if (localStorage.getItem("user") === null) {
    document.location.href = "/src/views/signin.html";
  }
});
document.querySelector(".userAvatar").innerHTML = getUserStorage().user.email;
