import { getUserStorage } from "./storage.js";
import {
  getUser,
  renderTable,
  nextPage,
  previousPage,
  sort,
  logout,
} from "./function.js";

if (localStorage.getItem("user") === null) {
  document.location.href = "/src/views/signin.html";
} else {
  let data, table, sortCol;
  let sortAsc = false;
  const pageSize = 4;
  let curPage = 1;

  let getLocalUser = getUserStorage();
  let users = await getUser(getLocalUser.token);
  data = users.user;

  table = document.querySelector(".tableBody");
  table.innerHTML = renderTable(data, curPage, pageSize);

  // listen for sort clicks
  let ths = document.querySelectorAll("#catTable thead tr th");
  ths.forEach((t) => {
    t.addEventListener("click", () => {
      table.innerHTML = sort(data);
    });
  });

  //  nextPage
  document.querySelector("#nextButton").addEventListener("click", () => {
    table.innerHTML = nextPage(data);
  });

  //  previousPage
  document.querySelector("#prevButton").addEventListener("click", () => {
    table.innerHTML = previousPage(data);
  });
}

// logout the admin
logout();

document.querySelector(".userAvatar").innerHTML = getUserStorage().user.email;
