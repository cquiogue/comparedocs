function compareDocuments() {
  const doc1Items = parseItems(document.getElementById('doc1-items').value);
  const doc1Quantities = parseQuantities(
    document.getElementById('doc1-quantities').value
  );
  const doc1Prices = parsePrices(document.getElementById('doc1-prices').value);

  const doc2Items = parseItems(document.getElementById('doc2-items').value);
  const doc2Quantities = parseQuantities(
    document.getElementById('doc2-quantities').value
  );
  const doc2Prices = parsePrices(document.getElementById('doc2-prices').value);

  const doc1Data = combineData(doc1Items, doc1Quantities, doc1Prices);
  const doc2Data = combineData(doc2Items, doc2Quantities, doc2Prices);

  const sortedDoc1Data = sortData(doc1Data);
  const sortedDoc2Data = sortData(doc2Data);

  const comparisonTable = document.getElementById('comparison-table');
  const tbody = comparisonTable.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';

  let doc2Index = 0;

  for (let i = 0; i < sortedDoc1Data.length; i++) {
    const row = document.createElement('tr');
    const itemDoc1Cell = document.createElement('td');
    const qtyDoc1Cell = document.createElement('td');
    const priceDoc1Cell = document.createElement('td');
    const itemDoc2Cell = document.createElement('td');
    const qtyDoc2Cell = document.createElement('td');
    const priceDoc2Cell = document.createElement('td');

    const doc1Item = sortedDoc1Data[i];
    let matchingIndex = sortedDoc2Data.findIndex(
      item => item.item === doc1Item.item
    );

    if (matchingIndex !== -1) {
      const doc2Item = sortedDoc2Data[matchingIndex];

      itemDoc1Cell.textContent = doc1Item.item;
      qtyDoc1Cell.textContent = doc1Item.quantity;
      priceDoc1Cell.textContent = doc1Item.price;

      itemDoc2Cell.textContent = doc2Item.item;
      qtyDoc2Cell.textContent = doc2Item.quantity;
      priceDoc2Cell.textContent = doc2Item.price;

      if (
        doc1Item.quantity === doc2Item.quantity &&
        doc1Item.price === doc2Item.price
      ) {
        row.classList.add('match');
      } else if (
        doc1Item.item === doc2Item.item &&
        (doc1Item.quantity !== doc2Item.quantity ||
          doc1Item.price !== doc2Item.price)
      ) {
        row.classList.add('partial-match');
      } else {
        row.classList.add('mismatch');
      }

      sortedDoc2Data.splice(matchingIndex, 1);
    } else {
      itemDoc1Cell.textContent = doc1Item.item;
      qtyDoc1Cell.textContent = doc1Item.quantity;
      priceDoc1Cell.textContent = doc1Item.price;

      itemDoc2Cell.textContent = '';
      qtyDoc2Cell.textContent = '';
      priceDoc2Cell.textContent = '';

      row.classList.add('mismatch');
    }

    row.appendChild(itemDoc1Cell);
    row.appendChild(qtyDoc1Cell);
    row.appendChild(priceDoc1Cell);
    row.appendChild(itemDoc2Cell);
    row.appendChild(qtyDoc2Cell);
    row.appendChild(priceDoc2Cell);
    tbody.appendChild(row);
  }
  for (let i = 0; i < sortedDoc2Data.length; i++) {
    const row = document.createElement('tr');
    const itemDoc1Cell = document.createElement('td');
    const qtyDoc1Cell = document.createElement('td');
    const priceDoc1Cell = document.createElement('td');
    const itemDoc2Cell = document.createElement('td');
    const qtyDoc2Cell = document.createElement('td');
    const priceDoc2Cell = document.createElement('td');

    const doc2Item = sortedDoc2Data[i];

    itemDoc1Cell.textContent = '';
    qtyDoc1Cell.textContent = '';
    priceDoc1Cell.textContent = '';

    itemDoc2Cell.textContent = doc2Item.item;
    qtyDoc2Cell.textContent = doc2Item.quantity;
    priceDoc2Cell.textContent = doc2Item.price;

    row.appendChild(itemDoc1Cell);
    row.appendChild(qtyDoc1Cell);
    row.appendChild(priceDoc1Cell);
    row.appendChild(itemDoc2Cell);
    row.appendChild(qtyDoc2Cell);
    row.appendChild(priceDoc2Cell);
    tbody.appendChild(row);
  }

  // Scroll to the results section when Compare button is clicked
  setTimeout(() => {
    const tableHeaders = document.getElementsByTagName('thead')[0];
    tableHeaders.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function parseItems(text) {
  return text.trim().split('\n');
}

function parseQuantities(text) {
  return text.trim().split('\n');
}

function parsePrices(text) {
  return text
    .trim()
    .split('\n')
    .map(price => price.replace(/[$,]/g, ''));
}

function combineData(items, quantities, prices) {
  const combinedData = [];
  for (let i = 0; i < items.length; i++) {
    combinedData.push({
      item: items[i].trim(),
      quantity: quantities[i].trim(),
      price: prices[i].trim(),
    });
  }
  return combinedData;
}

// Get all textarea elements
const textareas = document.querySelectorAll('textarea');

// Function to resize textarea based on content
function resizeTextarea(event) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

// Attach the resizeTextarea function to the input event of each textarea
textareas.forEach(textarea => {
  textarea.addEventListener('input', resizeTextarea);
});
function sortData(data) {
  return [...data].sort((a, b) => a.item.localeCompare(b.item));
}

function clearFields() {
  document.getElementById('doc1-items').value = '';
  document.getElementById('doc1-quantities').value = '';
  document.getElementById('doc1-prices').value = '';
  document.getElementById('doc2-items').value = '';
  document.getElementById('doc2-quantities').value = '';
  document.getElementById('doc2-prices').value = '';
  document
    .getElementById('comparison-table')
    .getElementsByTagName('tbody')[0].innerHTML = '';
  // Reset the text box sizes
  const textareas = document.getElementsByTagName('textarea');
  for (let i = 0; i < textareas.length; i++) {
    textareas[i].style.height = '60px';
  }
  // Scroll back to the top when Clear button is clicked
  document.body.scrollIntoView({ behavior: 'smooth' });
}
