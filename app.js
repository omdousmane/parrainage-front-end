import { getUserStorage, saveUserStorage } from "./src/js/storage.js";
import { getUser, postGodson, getGodson } from "./src/js/function.js";
let getLocalUser = getUserStorage();
let getGodsons = await getGodson(getLocalUser.token);
let contentUsers = await getUser(getLocalUser.token);
let data = contentUsers.user;

console.log(getGodsons.godson.length);
let colors = [];
console.log(getLocalUser);

let red, green, blue, yellow, purple;

const dataColors = ["red", "green", "yellow", "blue", "purple"];

Array.prototype.countCertainElements = function (value) {
  return this.filter((arrayElement) => arrayElement == value).length;
};

getGodsons.godson.forEach((els) => {
  colors.push(els.color.trim());
  purple = colors.countCertainElements("purple");
  green = colors.countCertainElements("green");
  blue = colors.countCertainElements("blue");
  yellow = colors.countCertainElements("yellow");
  red = colors.countCertainElements("red");
});

let tableColors = document.querySelector(".colorTable");
let number = document.querySelector("#number");

number.innerHTML = `
                  <h3>Nombre de rélation parrain filleul effectuée</h3>
                 <span> ${getGodsons.godson.length}</span>
                `;

let html = "";
html += `
       <tr>
          <td>Purple</td>
          <td>
            <p style="background-color: ${dataColors[4]}; border-radius: 5px;">Purple</p>
          </td>
          <td>${purple}</td>
        </tr>
         <tr>
          <td>Red</td>
          <td>
            <p style="background-color: ${dataColors[0]}; border-radius: 5px;">Red</p>
          </td>
          <td>${red}</td>
        </tr>
         <tr>
          <td>Green</td>
          <td>
            <p style="background-color: ${dataColors[1]}; border-radius: 5px;">Green</p>
          </td>
          <td>${green}</td>
        </tr>
         <tr>
          <td>Yellow</td>
          <td>
            <p style="background-color: ${dataColors[2]}; border-radius: 5px;">Green</p>
          </td>
          <td>${yellow}</td>
        </tr>
         <tr>
          <td>Blue</td>
          <td>
            <p style="background-color: ${dataColors[3]}; border-radius: 5px;">Green</p>
          </td>
          <td>${blue}</td>
        </tr>
      `;
tableColors.innerHTML = html;

let users = await getUser(getLocalUser.token);
let newUsers = users.user.filter((user) => user.quote !== "");

let parrain = document.querySelector("#godson");
parrain.innerHTML = `
    <h3>Nombre de parrain</h3>
    <span> ${newUsers.length}</span>
    `;

// delete some in dataset
data.forEach((element) => {
  delete element._id;
  delete element.admin;
  delete element.active;
  delete element.familyLevel;
  delete element.idDiscord;
  delete element.idFamily;
  delete element.img;
  delete element.password;
  delete element.studyLevel;
  delete element.updateAt;
  delete element.validationKeys;
});

// create element a for the download
function downloads(text, download) {
  //creating an invisible element
  var element = document.createElement("a");

  (element.href = "data:text/csv;charset=utf-8, " + encodeURI(text)),
    (element.target = "_blank"),
    (element.download = "dataset.csv");
  element.click();
  download.appendChild(element);
}

// download
let download = document.querySelector("#download");
download.addEventListener("click", (e) => {
  e.preventDefault();
  const JSONToCSV = (objArray, keys) =>
    [
      keys.join(","),
      ...objArray.map((row) => keys.map((k) => row[k] || "").join(",")),
    ].join("\n");
  let text = JSONToCSV(data, [
    "name",
    "email",
    "quote",
    "training",
    "validatedAt",
  ]);

  downloads(text, download);
});
