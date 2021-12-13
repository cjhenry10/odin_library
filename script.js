let myLibrary = [];
const library = document.getElementById("library");

function Book(title, pages, author) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.toggleRead = function() {
        if (this.read == false) this.read = true;
        else this.read = false;
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    // create book html element and paragraphs to hold details
    let newBookElement = document.createElement("div");
    let titlePar = document.createElement("p");
    titlePar.textContent = `Title: ${newBook.title}`
    newBookElement.appendChild(titlePar);
    let authorPar = document.createElement("p");
    authorPar.textContent = `Author: ${newBook.author}`
    newBookElement.appendChild(authorPar);
    let pagesPar = document.createElement("p");
    pagesPar.textContent = `Pages: ${newBook.pages}`
    newBookElement.appendChild(pagesPar);
    let readPar = document.createElement("p");
    readPar.textContent = `Read: ${newBook.read}`
    newBookElement.appendChild(readPar);
    // buttons to toggle the read attribute and delete
    let readBtn = document.createElement("button");
    readBtn.textContent = `Read`;
    readBtn.onclick = () => {
        newBook.toggleRead();
        readPar.textContent = `Read: ${newBook.read}`
    }
    newBookElement.appendChild(readBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        let newLibrary = myLibrary.filter((books) => books.title != newBook.title);
        myLibrary = newLibrary;
        library.removeChild(newBookElement);
    }
    newBookElement.appendChild(deleteBtn);


    // add classes to apply styles
    newBookElement.classList.add("col-lg-4");
    newBookElement.classList.add("col-md-6");
    newBookElement.classList.add("col-12");

    // add to library on page
    library.appendChild(newBookElement);
}

// filler books
const testbook1 = new Book("testbook1 really long and obnoxious title that never seems to end", 101);
const testbook2 = new Book("testbook2", 102, "Connor");
const testbook3 = new Book("testbook3", 103);
const testbook4 = new Book("testbook4", 104, "Morgan");

addBookToLibrary(testbook1);
addBookToLibrary(testbook2);
addBookToLibrary(testbook3);
addBookToLibrary(testbook4);

// modal
let modal = document.getElementById("book-form");
let modalBtn = document.getElementById("new-book");
let modalClose = document.getElementsByClassName("close")[0];
modalBtn.onclick = () => {
    modal.style.display = "block";
}
modalClose.onclick = () => {
    modal.style.display = "none";

}
window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
}

// form elements
const newBookForm = document.getElementById("new-book-form");
const inputs = newBookForm.elements;
const newTitle = inputs["title"];
const newAuthor = inputs["author"];
const newPages = inputs["pages"];
const addBook = inputs["add"];
const clearForm = inputs["clear"];

clearForm.onclick = () => {
    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = "";
}

addBook.onclick = () => {
    let newBookToAdd = new Book(newTitle.value, newPages.value, newAuthor.value);
    addBookToLibrary(newBookToAdd);
    modal.style.display = "none";
    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = "";
}
