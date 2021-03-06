// Storage Array
let myLibrary = [];

// Element variables 
const bookForm = document.querySelector("#book-form");
const bookList = document.querySelector("#book-list");

// Book object constructor
function Book (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

Book.prototype.toggleRead = function (){
    if (this.read === "Yes") {
        this.read = "No";
    } else if (this.read === "No"){
        this.read = "Yes";
    }
}

Book.prototype.styleReadButton = function(){
    if(this.read === "Yes"){
        return `<button class="mui-btn mui-btn--small mui-btn--primary read-button-Yes">Yes</button>`;
    } 
    if(this.read === "No"){
        return `<button class="mui-btn mui-btn--small mui-btn--primary read-button-No">No</button>`;
    }
}

function addBookToPage(book) {
        const row = document.createElement("tr");
        // Insert columns
        row.innerHTML = `
        <td class="book-data title">${book.title}</td>
        <td class="book-data author">${book.author}</td>
        <td class="book-data pages">${book.pages}</td>
        <td class="book-data read">${book.styleReadButton()}</td>
        <td><button class="mui-btn mui-btn--small mui-btn--fab mui-btn--danger delete-button">X</button></td>
        `;  
       
        bookList.appendChild(row);
    }

// Event listener to add a book
bookForm.addEventListener('submit', function(event){
    // Prevent page refesh on submit
    event.preventDefault();
   
    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;
        
    const book = new Book(title, author, pages, read);
    
    // Check for duplicates
    if (myLibrary.some(book => book.title === title)) {
        alert("Book already in library!")
    } else {
        addBookToPage(book);
        myLibrary.push(book);
    }

    // Clear form
    bookForm.reset();
});

// Use event delegation to catch dynamically generated elements
bookList.onclick = function (event) {  
    let target = event.target;
    const targetBookTitle = target.parentNode.parentNode.firstElementChild.innerHTML;
    const libraryEntry = myLibrary.find(book => book.title === targetBookTitle);
    
    // Event: toggle read status to "Yes"
    if (target.classList.contains("read-button-Yes")){        
        libraryEntry.toggleRead();
        target.parentNode.innerHTML = `${libraryEntry.styleReadButton()}`;
    }
    // Event: toggle read status to "No"
    if (target.classList.contains("read-button-No")) {
        libraryEntry.toggleRead();
        target.parentNode.innerHTML = `${libraryEntry.styleReadButton()}`;
    }
    
    // Event: delete book
    if (target.classList.contains("delete-button")) {
        const rowToRemove = target.parentNode.parentNode;
        const libraryEntryIndex = myLibrary.findIndex(book => book.title === targetBookTitle);        
        myLibrary.splice(libraryEntryIndex, 1); 
        rowToRemove.remove();
    }
}

// Starting Books 
const book1 = new Book("The Shining", "Steven King", 780, "Yes");
const book2 = new Book("Farenheit 451", "Ray Bradbury", 300, "No");
// Add and push Starting Books
addBookToPage(book1);
myLibrary.push(book1);
addBookToPage(book2);
myLibrary.push(book2);