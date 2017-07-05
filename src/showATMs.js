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
 * Sort ATMs by distance in giben order.
 * @param atms
 * @param boolean isAsc
 * @return array
 */
function sortATMs(atms, isAsc = true) {
  return atms.sort((a, b) => {
    if (a.distance === b.distance) {
      return 0;
    }

    if (a.distance > b.distance) {
      return isAsc ? 1 : -1;
    }

    return isAsc ? -1 : 1;
  });
}

/**
 * Show the given list of ATMs in the table.
 *
 * @param results
 * @param {HTMLTableElement} table
 */
export default function showATMs(results, table) {
  // Get first 10 from the fetched list of ATMs
  const atms = results.filter((result, index) => index < 10);

  const sortAsc = {
    distance: true
  };

  createTable(atms, table);

  document.getElementById('atms-table-distance').addEventListener('click', (event) => {
    event.preventDefault();

    sortAsc.distance = !sortAsc.distance;

    sortATMs(atms, sortAsc.distance);
    createTable(atms, table);

    return false;
  });
}
