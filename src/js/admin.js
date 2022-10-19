import { getUserStorage } from "./storage.js";
import { getUser, logout, exportToExcel } from "./function.js";

if (localStorage.getItem("admin") === null) {
  document.location.href = "/src/views/signin.html";
}

let data, table, sortCol;
let sortAsc = false;
const pageSize = 4;
let curPage = 1;

let getLocalUser = getUserStorage();
let users = await getUser(getLocalUser.token);
data = users.user;

// render tableHtml
function renderTable(data, curPage, pageSize) {
  // create html

  let result = "";
  data
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((c) => {
      result += `<tr>
     <td>${c.name}</td>
     <td>${c.email}</td>
     <td>${c.training}</td>
     <td>${c.quote}</td>
     <td>${c.createdAt.slice(0, 10)}</td>
     </tr>`;
    });
  return result;
}

// sort
function sort(data) {
  let thisSort = e.target.dataset.sort;
  if (sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  data.sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
    return 0;
  });
  return renderTable(data, curPage, pageSize);
}

// previousPage
function previousPage(data) {
  if (curPage > 1) curPage--;
  console.log(curPage);
  return renderTable(data, curPage, pageSize);
}

// nextPage
function nextPage(data) {
  if (curPage * pageSize < data.length) curPage++;
  console.log(curPage);
  return renderTable(data, curPage, pageSize);
}

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

// logout the admin
logout();

document.querySelector(".userAvatar").innerHTML = getUserStorage().user.email;
