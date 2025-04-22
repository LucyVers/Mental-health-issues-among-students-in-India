import $ from './shorthand-query-selector.js';

// Utility function to add HTML elements to the page
function addToPage(html) {
  const main = document.querySelector('main');
  if (main) {
    const div = document.createElement('div');
    div.innerHTML = html;
    main.appendChild(div);
  }
}

export default addToPage;