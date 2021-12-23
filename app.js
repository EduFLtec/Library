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

function addBookToPage(book) {
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

//Use event delegation to catch dynamically generated elements
bookList.onclick = function (event) {  
    let target = event.target;
    //Event to change read status
    if (target.classList.contains("read-button-Yes")){
        console.log ("yes");
    }
    if (target.classList.contains("read-button-No")) {
        console.log ("no");
    }
    //Event to delete book
    if (target.classList.contains("delete-button")) {
        let libraryIndex = target.parentNode.parentNode.id;
        myLibrary.splice(libraryIndex, 1);
        document.getElementById(libraryIndex).remove();
    }
}

//Starting Books 
const book1 = new Book("The Shining", "Steven King", 780, "Yes");
const book2 = new Book("Farenheit 451", "Ray Bradbury", 300, "No");
book1.addBookToLibrary();
book2.addBookToLibrary();
addBookToPage(book1);
addBookToPage(book2);

