// Example of dynamic table using jQuery
(function main() {
  // Add listeners to the pagination elements
  attachListeners();

  // Load initial data and render the results
  fetchAndRender();

  // Start with page 1
  setActivePage(1);
})(); // IIFE

function fetchAndRender(page = 1) {
  return fetchData(page).then((data) => {
    renderRows(data);
  });
}

function fetchData(page = 1, size = 5) {
  const url = `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${size}`;
  return jQuery.ajax(url);
}

function renderRows(data = []) {
  // Build the rows as string
  const rows = [];
  for (const item of data) {
    const row = `
         <tr>
            <th scope="row">${item.id}</th>
            <td data-title="Title">${item.title}</td>
            <td data-title="User Id">${item.userId}</td>
            <td data-title="Completed">${item.completed ? "Yes" : "No"}</td>
         </tr>
      `.trim();
    rows.push(row);
  }

  // Find the target element (tbody) and inject the rows
  $("#dynamic-table tbody").html(rows.join(""));
}

function attachListeners() {
  // These limits (MIN_PAGE and MAX_PAGE) are just examples.
  // On real cases it will be requested from the server.
  const MIN_PAGE = 1;
  const MAX_PAGE = 4;

  // Keep the track of current page on the pagination
  let currentPage = 1;

  $("#dynamic-table .pagination .page-link").click(function (event) {
    event.preventDefault();

    const $el = $(this);
    const content = $el.text();

    if (content === "Prev") {
      if (currentPage > MIN_PAGE) {
        currentPage = currentPage - 1;
        fetchAndRender(currentPage - 1);
      } else {
        // Ignore because is out of the boundary
      }
    }

    if (content === "Next") {
      if (currentPage < MAX_PAGE) {
        currentPage = currentPage + 1;
        fetchAndRender(currentPage + 1);
      } else {
        // Ignore because is out of the boundary
      }
    }

    if ($.isNumeric(content)) {
      const pageNumber = parseInt(content);
      currentPage = pageNumber;
      fetchAndRender(pageNumber);
    }

    setActivePage(currentPage);
  });
}

function setActivePage(page) {
  // Remove any "active" class from .page-item elements
  $("#dynamic-table .pagination .active").removeClass("active");

  $(`#dynamic-table .pagination .page-item:nth-child(${page + 1})`).addClass(
    "active"
  );
}
