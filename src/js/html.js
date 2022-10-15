const colors = ["red", "green", "yellow", "blue", "purple", "orange", "pink"];
let data, table, sortCol;
let sortAsc = false;
const pageSize = 3;
let curPage = 1;

function getRandomInt(max) {
  return Math.floor(Math.random() * max - 1);
}

function tableHtml(quote) {
  let html = "";
  let color = colors[getRandomInt(colors.length)];
  html += `
      <tr class="content">
        <td data-cote="${quote}" data-color="${color}">${quote}</td>
         <td data-color="${color}" style="background-color: ${color};"><td>
      </tr>
    `;
  return html;
}

// function renderTable(content) {
//   let html = "";
//   html += `
//       <tr>
//         <th scope="row" data-cote="${content.name}" ">${content.name}</th>
//         <td data-title="Email" data-cote="${content.email}" ">${content.email}</td>
//         <td data-title="Formation" data-cote="${content.training}" ">${content.training}</td>
//         <td data-title="Quote" data-cote="${content.quote}" ">${content.quote}</td>
//         <td data-title="Registered at" data-cote="${content.createdAt}" ">${content.createdAt}</td>
//       </tr>
//     `;
//   return html;
// }

export { tableHtml, renderTable, getRandomInt, colors };
