let myLibrary = [];

//Element variables 
const bookForm = document.querySelector("#book-form");
const bookList = document.querySelector("#book-list");

//Book object constructor
function Book (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

//Toggle read status
Book.prototype.addBookToLibrary = function () {
    myLibrary.push(this);
    this.index = myLibrary.indexOf(this);
}

//Add books to page
function addBookToPage(book) {
        //Create tr element
        const row = document.createElement("tr");
        //Associate book tr element with library object index
        row.id = book.index;
        //Insert columns
        row.innerHTML = `
        <td class="book-data">${book.title}</td>
        <td class="book-data">${book.author}</td>
        <td class="book-data">${book.pages}</td>
        <td class="book-data"><button class="mui-btn mui-btn--small mui-btn--primary read-button-${book.read}">${book.read}</button></td>
        <td><button class="mui-btn mui-btn--small mui-btn--fab mui-btn--danger delete-button">X</button></td>
        `;
        
        bookList.appendChild(row);
    }

//Event listener to add a book
bookForm.addEventListener('submit', function(event){
    //Prevent page refesh on submit
    event.preventDefault();

    //Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;
        
    const book = new Book(title, author, pages, read);
    
    //Check for duplicates
    if (myLibrary.some(book => book.title === title)) {
        alert("Book already in library!")
    } else {
        book.addBookToLibrary();
        addBookToPage(book);
    }

    //Clear form
    bookForm.reset();
});

//Event listener to change read status
bookList.onclick = function (event) {
    //Use event delegation to catch dynamically generated elements
    let target = event.target;
    if (target.classList.contains("read-button-Yes")){
        console.log ("yes");
    }
    if (target.classList.contains("read-button-No")) {
        console.log ("no");
    }
}


//Event listener to delete a book


//Starting Books 
const book1 = new Book("The Shining", "Steven King", 780, "Yes");
const book2 = new Book("Farenheit 451", "Ray Bradbury", 300, "No");
//Add starting books to local storage
book1.addBookToLibrary();
book2.addBookToLibrary();
//Display starting books to page
addBookToPage(book1);
addBookToPage(book2);

