function Book(title,author,pages,readStatus=false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

const addBookToLibrary = (book)=>{
    bookId++;
    myLibrary[bookId] = book;

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

    const statusDiv = document.createElement("div");
    const statusLabel = document.createElement("label");
    statusLabel.setAttribute("for",`status-${bookId}`);
    statusLabel.textContent = "Read: "; 
    const status = document.createElement("input");
    status.type = "checkbox";
    status.id = `status-${bookId}`;
    status.addEventListener("change",changeReadStatus);
    if(book.readStatus){
        status.checked = true;
        bookContainer.style.backgroundColor = "#6ee7b7"
    }
    else{
        bookContainer.style.backgroundColor = "#fca5a5" ;
    }
    statusDiv.appendChild(statusLabel);
    statusDiv.appendChild(status);

    content.appendChild(bookAuthor);
    content.appendChild(numPages);
    content.appendChild(statusDiv);

    const utilityButtons = document.createElement("div");
    utilityButtons.classList.add("utility");
    const editButton = document.createElement("img");
    editButton.src = "/icons/edit.svg"
    editButton.addEventListener("click",editBook);
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
    delete myLibrary[deleteId.split("-")[1]];
    document.querySelector("#"+deleteId).remove();
}

const createBook = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let checkboxStatus;
    if(data.get("status") ==="finished"){
        checkboxStatus = true;
    }
    else{
        checkboxStatus = false;
    }
    const newBook = new Book(data.get("title"),data.get("author"),data.get("pages"),checkboxStatus);
    addBookToLibrary(newBook);
    addBookForm.reset();
    addOverlay.style.display = "none";
}

const editBook = (event) => {
    const selectedBook = event.target.parentElement.parentElement.id;
    const selectedId = selectedBook.split("-")[1];
    editOverlay.style.display="flex";
    editTitle.value = myLibrary[selectedId].title;
    editAuthor.value = myLibrary[selectedId].author;
    editPages.value = myLibrary[selectedId].pages;
    editStatus.checked = myLibrary[selectedId].readStatus;

    editId = selectedId;
}

const updateBook = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    myLibrary[editId].title = data.get("title");
    myLibrary[editId].author = data.get("author");
    myLibrary[editId].pages = data.get("pages");

    if(data.get("status")==="finished"){
        myLibrary[editId].readStatus = true;
    }
    else myLibrary[editId].readStatus = false;

    document.querySelector(`#card-${editId}>h3`).textContent = myLibrary[editId].title;
    document.querySelector(`#card-${editId} .content>p:first-child`).textContent = "Author: "+ myLibrary[editId].author;
    document.querySelector(`#card-${editId} .content>p:nth-child(2)`).textContent = "Pages: " + myLibrary[editId].pages;
    document.querySelector(`#card-${editId} .content>div>input`).checked = myLibrary[editId].readStatus;

    if(myLibrary[editId].readStatus){
        document.querySelector(`#card-${editId}`).style.backgroundColor = "#6ee7b7";
    }
    else{
        document.querySelector(`#card-${changeId}`).style.backgroundColor = "#fca5a5";
    }

    editId = -1;
    editBookForm.reset();
    editOverlay.style.display = "none";
}

const changeReadStatus = (event) => {
    console.log(event.target.id);
    const changeId = event.target.id.split("-")[1]
    myLibrary[changeId].readStatus = !myLibrary[changeId].readStatus;

    if(myLibrary[changeId].readStatus){
        document.querySelector(`#card-${changeId}`).style.backgroundColor = "#6ee7b7";
    }
    else{
        document.querySelector(`#card-${changeId}`).style.backgroundColor = "#fca5a5" ;
    }
}

let bookId = 0;
let editId = -1;
const myLibrary = {};

const addButton = document.querySelector(".add");
const bookGrid = document.querySelector(".container");
const addOverlay = document.querySelector("#overlay");
const editOverlay = document.querySelector("#edit-overlay");
const addBookForm = document.querySelector("#form");
const editBookForm = document.querySelector("#edit-form");
const addCloseButton = document.querySelector("#add-close");
const editCloseButton = document.querySelector("#edit-close");
const editTitle = document.querySelector("#edit-title");
const editAuthor = document.querySelector("#edit-author");
const editPages = document.querySelector("#edit-pages");
const editStatus = document.querySelector("#edit-status");

addButton.addEventListener("click", () => {
    addOverlay.style.display = "flex";
});
addCloseButton.addEventListener("click",  () => {
    addBookForm.reset();
    addOverlay.style.display = "none";
});
addBookForm.addEventListener("submit",createBook);
editCloseButton.addEventListener("click", () => {
    editBookForm.reset();
    editOverlay.style.display = "none";
    editId = -1;
})
editBookForm.addEventListener("submit",updateBook);

const book1 = new Book("The Lord of the Rings","J.R.R Tolkien","1000",true);
const book2 = new Book("A Song of Ice and Fire","George R.R Martin","800",true);
const book3 = new Book("The Alchemist","Paulo Coelho","600");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
