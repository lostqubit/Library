function Book(title,author,pages,readStatus=false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

const addBookToLibrary = (book)=>{
    myLibrary.push(book);
    bookId++;

    const bookContainer = document.createElement("div");
    bookContainer.id = `card-${bookId}`;
    bookContainer.classList.add("card");

    const heading = document.createElement("h3");
    heading.textContent = book.title;

    const content = document.createElement("div");
    content.classList.add("content");
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = "Author: " + book.author;
    const numPages = document.createElement("p");
    numPages.textContent = "Pages: " + book.pages;
    content.appendChild(bookAuthor);
    content.appendChild(numPages);

    const utilityButtons = document.createElement("div");
    utilityButtons.classList.add("utility");
    const editButton = document.createElement("img");
    editButton.src = "/icons/edit.svg"
    const deleteButton = document.createElement("img");
    deleteButton.src = "/icons/delete.svg"
    deleteButton.addEventListener("click",deleteBook);
    utilityButtons.appendChild(editButton);
    utilityButtons.appendChild(deleteButton);

    bookContainer.appendChild(heading);
    bookContainer.appendChild(content);
    bookContainer.appendChild(utilityButtons);
    bookGrid.appendChild(bookContainer); 
}

const deleteBook = (event) =>{
    const deleteId = event.target.parentElement.parentElement.id;
    document.querySelector("#"+deleteId).remove();
}

const enableOverlay = () =>{
    overlay.style.display = "flex";
}

const closeOverlay = () => {
    addBookForm.reset();
    overlay.style.display = "none";
}

const createBook = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const newBook = new Book(data.get("title"),data.get("author"),data.get("pages"));
    console.log(newBook);
    addBookToLibrary(newBook);
    addBookForm.reset();
    overlay.style.display = "none";
}

let bookId = 0;
const myLibrary = [];

const addButton = document.querySelector(".add");
const bookGrid = document.querySelector(".container");
const overlay = document.querySelector("#overlay");
const addBookForm = document.querySelector("#form");
const closeButton = document.querySelector("#close");

addButton.addEventListener("click", enableOverlay);
closeButton.addEventListener("click", closeOverlay)
addBookForm.addEventListener("submit",createBook)

const book1 = new Book("The Lord of the Rings","J.R.R Tolkien","1000");
const book2 = new Book("A Song of Ice and Fire","George R.R Martin","800");
const book3 = new Book("The Alchemist","Paulo Coelhoo","600");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
