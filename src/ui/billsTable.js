/**
 * Handles the rendering of a billsTable
 *
 * Renders and manages a table to display all bills.
 * Updates whenever bills are added or modified through billsStore.
 */

/** Create the table structure */
function createBillsTable() {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const headerRow = document.createElement('tr');

  // Headers
  const headers = ['Year', 'Month', 'Name', 'Price'];
  headers.forEach(headerText => {
    const th = document.createElement('th');

    th.textContent = headerText;
    th.style.textAlign = 'left';
    th.style.padding = '0.5rem';
    th.style.borderBottom = '2px solid #ccc';

    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);
  table.appendChild(tbody);

  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.marginTop = '2rem';

  return table;
}

/** Populate table with bill data */
function populateTable(table) {
  const tbody = table.querySelector('tbody');
  const bills = window.billsStore ? window.billsStore.getAll() : (window.billsData || []);

  // Clear existing rows (populateTable runs every 500ms)
  tbody.innerHTML = '';

  bills.forEach(bill => {
    const row = document.createElement('tr');
    const yearCell = document.createElement('td');
    const monthCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const priceCell = document.createElement('td');

    row.style.borderBottom = '1px solid #eee';

    yearCell.textContent = bill.year;
    yearCell.style.padding = '0.5rem';

    monthCell.textContent = bill.month;
    monthCell.style.padding = '0.5rem';

    nameCell.textContent = bill.name;
    nameCell.style.padding = '0.5rem';

    priceCell.textContent = `$${bill.price.toFixed(2)}`;
    priceCell.style.padding = '0.5rem';
    priceCell.style.textAlign = 'right';

    row.append(yearCell, monthCell, nameCell, priceCell);
    tbody.appendChild(row);
  });
}

/** Render bills table */
function renderBillsTable() {
  const ui = document.createElement('div');
  const table = createBillsTable();

  ui.id = 'bills-table-ui';
  ui.appendChild(table);

  populateTable(table);

  // Every 500ms, repopulates the table.
  setInterval(() => {
    // TODO: this approach is not the most effective
    // The bill should be added or removed when the button is clicked
    populateTable(table);
  }, 500);

  document.body.appendChild(ui);
}

document.addEventListener('DOMContentLoaded', renderBillsTable);
