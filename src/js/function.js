let data, table, sortCol;
let sortAsc = false;
let curPage = 1;
let pageSize = 4;

// getUser
import {
  getUserStorage,
  getAdminStorage,
  saveAdminStorage,
  saveUserStorage,
} from "./storage.js";

async function getUser(token) {
  let contentReq = await fetch(
    "https://hetic-godson.herokuapp.com/api/v1/readAllUsers",
    {
      headers: { Authorization: `Beare ${token}` },
    }
  )
    .then((res) => res.json())
    .then((users) => users)
    .catch((err) => {
      console.log(err);
    });
  return contentReq;
}

async function getGodson(token) {
  let contentReq = await fetch(
    "https://hetic-godson.herokuapp.com/api/v1/readGodson",
    {
      headers: { Authorization: `Beare ${token}` },
    }
  )
    .then((res) => res.json())
    .then((users) => users)
    .catch((err) => {
      console.log(err);
    });
  return contentReq;
}

// getAllGodson
async function getAllGodson(token) {
  let contentReq = await fetch(
    "https://hetic-godson.herokuapp.com/api/v1/readAllGodson",
    {
      headers: { Authorization: `Beare ${token}` },
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
  let contentReq = await fetch(
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

// postGodson
async function postGodson(data, token) {
  let contentReq = await fetch(
    "https://hetic-godson.herokuapp.com/api/v1/createGodson",
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
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

// print Alert
async function printAlert(html) {
  let main = document.querySelector(".prompt");
  let alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("success");
  alert.innerHTML = html;
  main.appendChild(alert);
}

// confirm Choise
async function confirmChoise(data) {
  let tablePrompt = document.querySelector(".tablePrompt");
  tablePrompt.innerHTML = await confirmModal();
  let cancelbtn = document.querySelector(".cancelbtn");
  let confirm = document.querySelector(".confirmBtn");
  confirm.addEventListener("click", () => {
    // check if the user is admin
    saveUserStorage(data);
    saveAdminStorage({ sessionId: data.user._id });
    window.location.href = "/src/views/admin.html";
  });
  cancelbtn.addEventListener("click", () => {
    console.log(cancelbtn.value);
    // check if the user is admin
    saveUserStorage(data);
    window.location.href = "/src/views/profil.html";
  });
}

// check Form
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

// logout
function logout() {
  let logout = document.querySelector(".logout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    let admin = getAdminStorage();
    if (admin.sessionId && admin.sessionId !== "null") {
      localStorage.removeItem("admin");
      document.location.href = "/src/views/signin.html";
    } else {
      localStorage.removeItem("user");
      document.location.href = "/src/views/signin.html";
    }
  });
}

// random color
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function renderQuote(data, curPage) {
  let result = "";
  const colors = ["red", "green", "yellow", "blue", "purple", "orange", "pink"];
  data
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((c) => {
      let color = parseInt(getRandomArbitrary(0, colors.length - 1));
      result += `
        <tr id="selctQuote">
          <td data-coteAndColor="${c.quote} : ${colors[color]}" data-id="${c._id}">${c.quote}</td>
          <td style="background-color:${colors[color]} ;"></td>
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
  return renderQuote(data, curPage);
}

// select quote
function quoteModal() {
  let html = "";
  html += `
      <div id="id01" class="modal">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
        <div class="modal-content">
          <div class="modal-container">
          <h1>Confirmation de Selection</h1>
            <p>Est-tu sure de vouloir selectionné cette phrase?</p>

            <div class="clearfix">
              <button type="button" onclick="document.getElementById('id01').style.display='none'"
                class="cancelbtn">Cancel</button>
              <button type="button" onclick="document.getElementById('id01').style.display='none'"
                class="confirmBtn" id="confirmBtn" value="confirm">Confirmé</button>
            </div>
          </div>
        </div>
      </div>
    `;
  return html;
}

// select quote
async function confirmModal() {
  let html = "";
  html += `
      <div id="id01" class="modal">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
        <div class="modal-content">
          <div class="modal-container">
          <h1>Choix de connection</h1>
            <p>Voulez-vous vous connecté comme admin??</p>

            <div class="clearfix">
              <button type="button" onclick="document.getElementById('id01').style.display='none'"
                class="cancelbtn" value="cancelbtn">Non</button>
              <button type="button" onclick="document.getElementById('id01').style.display='none'"
                class="confirmBtn" id="confirmBtn" value="confirm">Oui</button>
            </div>
          </div>
        </div>
      </div>
    `;
  return html;
}

// previousPage
function previousPage(data) {
  if (curPage > 1) curPage--;
  console.log(curPage);
  return renderQuote(data, curPage);
}

// nextPage
function nextPage(data) {
  if (curPage * pageSize < data.length) curPage++;
  console.log(curPage);
  return renderQuote(data, curPage);
}

function exportToExcel(type, fn, dl) {}

// exports
export {
  postUser,
  loginUser,
  getUser,
  postGodson,
  printAlert,
  checkForm,
  exportToExcel,
  quoteModal,
  renderQuote,
  previousPage,
  nextPage,
  sort,
  logout,
  confirmModal,
  confirmChoise,
  choiseWord,
  getGodson,
  getAllGodson,
};
