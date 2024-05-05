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

let bookId = 0;
const myLibrary = [];
const bookGrid = document.querySelector(".container");

const book1 = new Book("The Lord of the Rings","J.R.R Tolkien","1000");
const book2 = new Book("A Song of Ice and Fire","George R.R Martin","800");
const book3 = new Book("The Alchemist","Paulo Coelhoo","600");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

console.log(myLibrary);