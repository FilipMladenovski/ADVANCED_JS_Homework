document.addEventListener('DOMContentLoaded', async function () {
  const beerList = document.querySelector('#beer-list');
  const pageSizeSelect = document.querySelector('#page-size');
  const abvFilterCheckbox = document.querySelector('#abv-filter');
  const otherFilterSelect = document.querySelector('#other-filter');
  const paginationDiv = document.querySelector('#pagination');
  const prevButton = document.createElement('button');
  const nextButton = document.createElement('button');

  prevButton.type = 'button';
  nextButton.type = 'button';

  let currentPage = 1;
  let pageSize = parseInt(pageSizeSelect.value);
  let previousPages = [];

  async function fetchBeers(page, perPage, abvFilter, otherFilter) {
    try {
      let url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;

      if (abvFilter) {
        url += '&abv_gt=6';
      }

      if (otherFilter) {
        url += `&${otherFilter}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching beers:', error);
      displayErrorMessage('Failed to fetch beers. Please try again later.');
      return [];
    }
  }

  async function renderBeers(page, perPage, abvFilter, otherFilter) {
    const beers = await fetchBeers(page, perPage, abvFilter, otherFilter);
    beerList.innerHTML = beers.map(beer => `
      <div>
        <h2>${beer.name}</h2>
        <img src="${beer.image_url}" alt="${beer.name}">
        <p><strong>ABV:</strong> ${beer.abv}%</p>
        <p><strong>IBU:</strong> ${beer.ibu}</p>
        <p><strong>Tagline:</strong> ${beer.tagline}</p>
        <p><strong>First Brewed:</strong> ${beer.first_brewed}</p>
        <p><strong>Description:</strong> ${beer.description}</p>
        <br/>
        <p><strong>Food Pairings:</strong></p>
        <ol>
          ${beer.food_pairing.map(pairing => `<li>${pairing}</li>`).join('')}
        </ol>
      </div>
    `).join('');

    renderPagination();
  }
  
  function renderPagination() {
    paginationDiv.innerHTML = '';
    prevButton.textContent = 'Previous';
    nextButton.textContent = 'Next';

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = beerList.children.length < pageSize;

    prevButton.addEventListener('click', () => {
      if (previousPages.length > 0) {
        currentPage = previousPages.pop();
        renderBeers(currentPage, pageSize, abvFilterCheckbox.checked, otherFilterSelect.value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    
    nextButton.addEventListener('click', () => {
      if (!nextButton.disabled) {
        previousPages.push(currentPage);
        currentPage++;
        renderBeers(currentPage, pageSize, abvFilterCheckbox.checked, otherFilterSelect.value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    

    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(nextButton);
  }

  function updatePageSize() {
    pageSize = parseInt(pageSizeSelect.value);
    renderBeers(currentPage, pageSize, abvFilterCheckbox.checked, otherFilterSelect.value);
  }

  function updateFilters() {
    renderBeers(currentPage, pageSize, abvFilterCheckbox.checked, otherFilterSelect.value);
  }

  function displayErrorMessage(message) {
    const errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('error-message');
    errorMessageElement.textContent = message;
    document.body.appendChild(errorMessageElement);
  }

  pageSizeSelect.addEventListener('change', updatePageSize);
  abvFilterCheckbox.addEventListener('change', updateFilters);
  otherFilterSelect.addEventListener('change', updateFilters);

  renderBeers(currentPage, pageSize, abvFilterCheckbox.checked, otherFilterSelect.value);
});