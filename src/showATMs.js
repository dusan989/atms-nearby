/**
 * Create and populate table body.
 *
 * @param atms
 * @param {HTMLTableElement} table
 */
function createTable(atms, table) {
  table.classList.remove('hide');

  const tBody = table.getElementsByTagName('tbody')[0];
  tBody.innerHTML = '';

  atms.forEach((atm) => {
    const tr = document.createElement('tr');

    const name = document.createElement('td');
    name.innerText = atm.name;

    const distance = document.createElement('td');
    distance.innerText = Math.round(atm.distance);

    const imageSrc = document.createElement('img');
    imageSrc.src = atm.miniMap;
    const image = document.createElement('td');
    image.appendChild(imageSrc);

    tr.appendChild(name);
    tr.appendChild(distance);
    tr.appendChild(image);
    tBody.appendChild(tr);
  });
}

/**
 * Show the given list of ATMs in the table.
 *
 * @param results
 * @param {HTMLTableElement} table
 */
export default function showATMs(results, table) {
  // NOTE ATMs are sorting by distnce in asscending order from the start.
  const atms = results.slice(0, 10);

  createTable(atms, table);

  document.getElementById('atms-table-distance').addEventListener('click', (event) => {
    event.preventDefault();

    createTable(atms.reverse(), table);

    return false;
  });
}
