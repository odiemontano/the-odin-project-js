class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Date.now() + Math.random(); // Using Date.now() to minimize ID collision
  }

  info() {
    return { title: this.title, author: this.author, pages: this.pages, read: this.read };
  }

  toggleRead() {
    this.read = this.read === 'yes' ? 'no' : 'yes';
  }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
  const table = document.querySelector('table');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  myLibrary.forEach((book) => {
    const row = table.insertRow();
    row.dataset.id = book.id;

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
      <td>
        <button class="remove-btn">Remove</button>
        <button class="read-btn">Read</button>
      </td>
    `;

    row.querySelector('.remove-btn').addEventListener('click', () => removeBook(book.id));
    row.querySelector('.read-btn').addEventListener('click', () => readBook(book));
  });
}

function readBook(book) {
  book.toggleRead();
  displayBooks();
}

function removeBook(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);
  if (index > -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

document.getElementById('display-form').addEventListener('click', () => {
  document.querySelector('.form-container').classList.toggle('hidden');
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { title, author, pages, read } = Object.fromEntries(formData.entries());

  addBookToLibrary(title, author, pages, read);
  displayBooks();
});

displayBooks();
