let myLibrary = [];
let buttonEnabled = true;
let current_id = 0

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id

    current_id++;

    this.info = function() {
        return "Title: " + title + "\nAuthor: " + author + "\nPages: " + pages + "\nRead: " + read;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayNewBook();
}

function displayBooks() {
    const bookDisplay = document.getElementById("book-display");
    myLibrary.forEach(book => {
        createCard(i);
    });
}

function displayNewBook() {
    const i = myLibrary.length - 1;
    createCard(i);
}

function createCard(i) {
        const thisBook = myLibrary[i];

        // Create Card
        const bookDisplay = document.getElementById("book-display");
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        bookDisplay.appendChild(cardDiv);
    
        // Create Container
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        cardContainer.classList.add("card-label-flex");
        cardDiv.appendChild(cardContainer);
    
        // Title Label
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Title: " + thisBook.title;
        cardContainer.appendChild(nameLabel);
    
        // Author Label
        const authorLabel = document.createElement("label");
        authorLabel.textContent = "Author: " + thisBook.author;
        cardContainer.appendChild(authorLabel);
    
        // Pages Label
        const pagesLabel = document.createElement("label");
        pagesLabel.textContent = "Pages: " + thisBook.pages;
        cardContainer.appendChild(pagesLabel);
    
        // Book Read
        const readLabel = document.createElement("label");
        readLabel.textContent = "Status: " + thisBook.read;
        cardContainer.appendChild(readLabel);
    
        // Button Container
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("card-container");
        buttonContainer.classList.add("flex");
        cardContainer.appendChild(buttonContainer);
    
        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function() {
            cardDiv.remove();
            updateArray(thisBook);
        });
        buttonContainer.appendChild(deleteButton);
    
        // Read Button
        const readButton = document.createElement("button");
        readButton.textContent = "Read";
        readButton.addEventListener('click', function() {
            if (thisBook.read === "Read") {
                thisBook.read = "Unread";
            }
            else {
                thisBook.read = "Read";
            };
            readLabel.textContent = "Pages: " + thisBook.read;
        });
        buttonContainer.appendChild(readButton);
}

function updateArray(deletedBook) {
    let newLibrary = [];
    myLibrary.forEach(book => {
        if (deletedBook.id !== book.id) {
            newLibrary.push(book);
        }
    });
    myLibrary = newLibrary;
}

function showPopup() {
    const popup = document.getElementById("popup")
    popup.classList.remove("popup-remove");
    popup.classList.add("popup-show");
    buttonEnabled = false;
}

function removePopup() {
    popup.classList.remove("popup-show");
    popup.classList.add("popup-remove");
    buttonEnabled = true;
}

function initializeButton() {
    const form = document.getElementById("popup-form");
    const bookTitle = form.elements['book-title'];
    const authorName = form.elements['author-name'];
    const bookPages = form.elements['book-pages'];
    const bookRead = form.elements['book-read'];
    
    form.addEventListener('submit', function(event) {
        const book = new Book(bookTitle.value, authorName.value, bookPages.value, bookRead.value, current_id);
        addBookToLibrary(book);
        bookTitle.value = "";
        authorName.value = "";
        bookPages.value = "";
        event.preventDefault();
        removePopup();
    });

    document.getElementById("cancel-button").addEventListener("click", function() {
        bookTitle.value = "";
        authorName.value = "";
        bookPages.value = "";
        removePopup();
    });

    document.getElementById("add-book-button").addEventListener("click", function() {
        if (buttonEnabled === true) {
            showPopup();
        }
    });
}

initializeButton();
displayBooks();