/**
 * Show the given list of ATMs in the table.
 *
 * @param atms
 * @param {HTMLTableElement} table
 */
export default function showATMs(atms, table) {
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
