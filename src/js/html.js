const colors = ["red", "green", "yellow", "blue", "purple", "orange", "pink"];

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

export { tableHtml, getRandomInt, colors };
