/**
 * Handles the Add button for new bills.
 *
 * When the user clicks the Add button this module reads the values from
 * the inputs: Year, Month, Name and Price and logs them.
 */

/** in-memory array */
window.billsData = window.billsData || [];

/** Handles Add button click */
document.addEventListener('click', (event) => {
  const target = event.target;

  if (!target || !(target instanceof HTMLElement)) return;
  if (target.id !== 'new-bill-add') return;

  const yearEl = document.getElementById('new-bill-year');
  const monthEl = document.getElementById('new-bill-month');
  const nameEl = document.getElementById('new-bill-name');
  const priceEl = document.getElementById('new-bill-price');

  const year = String(yearEl?.value || new Date().getFullYear());
  const monthNum = Number(monthEl?.value || 1);
  const monthName = monthEl?.options?.[monthEl.selectedIndex]?.textContent || String(monthNum);
  const name = nameEl?.value?.trim() || '';
  const price = Number(priceEl?.value || 0);

  const newBillData = {
    year,
    month: monthName,
    name,
    price,
  };

  // prefer billsStore if available, otherwise fall back to window.billsData
  if (window.billsStore && typeof window.billsStore.add === 'function') {
    window.billsStore.add(newBillData);
    console.log('New bill (via billsStore):', newBillData);
    console.log('Current bills:', window.billsStore.getAll());
  } else {
    window.billsData.push(newBillData);
    console.log('New bill:', newBillData);
    console.log('Current bills:', window.billsData);
  }

  // clear inputs
  nameEl.value = '';
  priceEl.value = '';
});
