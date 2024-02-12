const API_KEY = 'AIzaSyBNJuAKBcbbirzmQgzrJQntdSQKxTTM72M';

  async function searchBooks(query) {
    const url = `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}&q=${encodeURIComponent(query)}&maxResults=${maxResults}&printType=books`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
  }
  
  const maxResults = 39;
  const bookInput = document.getElementById('genre-input');
  const searchButton = document.getElementById('search-button');
  const resultsList = document.getElementById('results-list');
  
searchButton.addEventListener('click', async () => {
    const query = bookInput.value;
    const books = await searchBooks(query);
    displayResults(books);
  });
  
  
  function displayResults(books) {
    resultsList.innerHTML = '';
    for (const book of books) {
      const rating = book.volumeInfo.averageRating ?? 'N/A';
      const li = document.createElement('li');
      li.innerHTML = `
      <div class ="Row_Box">
        <img src="${book.volumeInfo.imageLinks?.thumbnail ?? 'https://via.placeholder.com/128x192.png?text=No+Image'}">
        <div class = "Book-Info">
          <h3>${book.volumeInfo.title}</h3>
          <p>By ${book.volumeInfo.authors?.join(', ')}</p>
          <p>Rating: ${rating}</p>
        </div>
      </div>
      ` ;
      resultsList.appendChild(li);
    }
  }
