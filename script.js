const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.info = function () {
  const readStatus = this.hasRead ? 'Already Read' : 'Not Read Yet';
  return `${this.title}, ${this.author}, ${this.pages} pages, ${readStatus}`;
};

myLibrary.push(
    new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
    new Book('1984', 'George Orwell', 328, false),
    new Book('To Kill a Mockingbird', 'Harper Lee', 281, true)
  );

  function displayLibrary() {
    const container = document.getElementById('library-container');
    container.innerHTML = '';
  
    myLibrary.forEach(book => {
      const card = document.createElement('div');
      card.classList.add('book-card');
  
      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Status:</strong> ${book.hasRead ? 'Already Read' : 'Not Read Yet'}</p>
        <button class="toggle-read" data-id="${book.id}">Toggle Read Status</button>
        <button class="remove-button" data-id="${book.id}">Remove</button>
    `;
  
      container.appendChild(card);
    });
  
    document.querySelectorAll('.toggle-read').forEach(button => {
        button.addEventListener('click', (e) => {
          const idToToggle = e.target.getAttribute('data-id');
          const book = myLibrary.find(b => b.id === idToToggle);
          if (book) {
            book.toggleRead();
            displayLibrary(); 
          }
        });
    });

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (e) => {
          const idToRemove = e.target.getAttribute('data-id');
          removeBookFromLibrary(idToRemove);
        });
      });
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary();
}

const dialog = document.getElementById('book-dialog');
const form = document.getElementById('book-form');
const openBtn = document.getElementById('new-book-button');
const closeBtn = document.getElementById('close-dialog');

openBtn.addEventListener('click', () => dialog.showModal());

closeBtn.addEventListener('click', () => dialog.close());

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const newBook = new Book(
    formData.get('title'),
    formData.get('author'),
    parseInt(formData.get('pages')),
    formData.get('hasRead') === 'on'
  );

  addBookToLibrary(newBook);
  form.reset();
  dialog.close();
});

displayLibrary();

function removeBookFromLibrary(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayLibrary();
    }
  }

  Book.prototype.toggleRead = function () {
    this.hasRead = !this.hasRead;
  };