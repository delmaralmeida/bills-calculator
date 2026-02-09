/**
 * Handles the rendering of form inputs for creating new bills:
 * Renders inputs for: Year, Month, Name, Price and Add button.
 */

/** Adds label to input */
function createLabeledField(inputEl, labelText) {
  const wrapper = document.createElement('div');
  const label = document.createElement('label');

  wrapper.style.display = 'inline-block';
  wrapper.style.marginRight = '0.75rem';
  label.htmlFor = inputEl.id;
  label.textContent = labelText;
  label.style.display = 'block';
  label.style.marginBottom = '0.25rem';
  label.style.fontSize = '0.9rem';

  wrapper.append(label, inputEl);

  return wrapper;
}

/** Populates the select with month options. */
function populateMonthSelect(selectEl, selectedIndex) {
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  for (let i = 0; i < 12; i++) {
    const opt = document.createElement('option');

    opt.value = String(i + 1);
    opt.textContent = monthNames[i];

    if (i === selectedIndex) opt.selected = true;
    selectEl.appendChild(opt);
  }

  return selectEl;
}

/** Renders forms */
function createAddBillForm() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const ui = document.createElement('div');
  const yearInput = document.createElement('input');
  const monthSelect = document.createElement('select');
  const nameInput = document.createElement('input');
  const priceInput = document.createElement('input');
  const addBtn = document.createElement('button');

  ui.id = 'add-bill-ui';
  ui.style.margin = '1rem 0';
  yearInput.id = 'new-bill-year';
  yearInput.type = 'number';
  yearInput.value = currentYear;
  monthSelect.id = 'new-bill-month';
  nameInput.id = 'new-bill-name';
  nameInput.type = 'text';
  priceInput.id = 'new-bill-price';
  priceInput.type = 'number';
  addBtn.id = 'new-bill-add';
  addBtn.type = 'button';
  addBtn.textContent = 'Add';

  populateMonthSelect(monthSelect, currentMonth);

  const yearField = createLabeledField(yearInput, 'Year');
  const monthField = createLabeledField(monthSelect, 'Month');
  const nameField = createLabeledField(nameInput, 'Name');
  const priceField = createLabeledField(priceInput, 'Price');

  ui.append(yearField, monthField, nameField, priceField, addBtn);

  document.body.appendChild(ui);
}

document.addEventListener('DOMContentLoaded', createAddBillForm);
