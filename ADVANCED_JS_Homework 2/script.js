document.addEventListener('DOMContentLoaded', async function() {
  const beerInfo = document.querySelector('#beer-info');

  async function randomBeer() {
    try {
        const response = await fetch('https://api.punkapi.com/v2/beers/random');
        const data = await response.json();
        console.log(data);
        const beer = data[0];
        const imageUrl = beer.image_url ? beer.image_url : 'images/images.jpg';
        const beerHTML = `
            <h2>${beer.name}</h2>
            <img src="${imageUrl}" alt="${beer.name}">
            <p><strong>ABV:</strong> ${beer.abv}%</p>
            <p><strong>IBU:</strong> ${beer.ibu}</p>
            <p><strong>Tagline:</strong> ${beer.tagline}</p>
            <p><strong>First Brewed:</strong> ${beer.first_brewed}</p>
            <p><strong>Description:</strong> ${beer.description}</p>
        `;
        beerInfo.innerHTML = beerHTML;
    } catch (error) {
        console.error('Error fetching random beer:', error);
        beerInfo.innerHTML = '<p>Failed to fetch beer. Please try again later.</p>';
    }
}
  randomBeer();

  const generateBeerBtn = document.querySelector('#generate-beer-btn');
  generateBeerBtn.addEventListener('click', randomBeer);
});
