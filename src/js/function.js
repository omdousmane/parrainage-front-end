let data, table, sortCol;
let sortAsc = false;
let curPage = 1;
let pageSize = 4;

// getUser
async function getUser(token) {
  let contentReq = await fetch(
    "https://hetic-godson.herokuapp.com/api/v1/readAllUsers",
    {
      headers: { Autorisation: `Beare ${token}` },
    }
  )
    .then((res) => res.json())
    .then((users) => users)
    .catch((err) => {
      console.log(err);
    });
  return contentReq;
}

// loginUser
async function loginUser(data) {
  let contentReq = fetch("https://hetic-godson.herokuapp.com/api/v1/login", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((token) => token)
    .catch((err) => {
      console.log(err);
    });
  return contentReq;
}

// postUser
async function postUser(data) {
  let contentReq = fetch(
    "https://hetic-godson.herokuapp.com/api/v1/createUser",
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((token) => token)
    .catch((err) => {
      console.log(err);
    });
  return contentReq;
}

// print Html
function printHtml(content, alert) {
  let html = `
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>Erreur!</strong> ${content}.
    `;
  alert.style.display = "block";
  alert.innerHTML = html;
}

function checkForm() {
  let godsonSelect = document.getElementsByName("godson");
  let word = document.querySelector(".word");
  for (let i = 0; i < godsonSelect.length; i++) {
    if (godsonSelect[i].checked) {
      if (godsonSelect[i].value === "parrain") {
        word.style.display = "block";
      } else {
        word.style.display = "none";
      }
    }
  }
}

// choise word
async function choiseWord(contents) {
  contents.forEach((content) => {
    content.addEventListener("click", (e) => {
      // e.stopPropagation();
      let dataQuote = e.target.getAttribute("data-cote");
      let dataColor = e.target.getAttribute("data-color");
      console.table(dataQuote, dataColor);
    });
  });
}

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
     <td>${c.createdAt}</td>
     </tr>`;
    });
  return result;
}

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

function previousPage(data) {
  console.log("diallo");
  if (curPage > 1) curPage--;
  console.log(data);
  return renderTable(data, curPage, pageSize);
}

function nextPage(data) {
  if (curPage * pageSize < data.length) curPage++;
  console.log(curPage);
  return renderTable(data, curPage, pageSize);
}

// exports
export {
  postUser,
  loginUser,
  getUser,
  printHtml,
  checkForm,
  renderTable,
  previousPage,
  nextPage,
  sort,
  choiseWord,
};
