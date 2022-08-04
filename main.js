
const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

function findBook(bookId) {
    for (bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}


// fungsi membuat buku baru
function makeBook(bookObject) {
    const { id, title, author, year, isCompleted } = bookObject;

    const textTitle = document.createElement('h2');
    textTitle.classList.add('judulBuku');
    textTitle.innerText = title;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = "Penulis : " + author;

    const textYear = document.createElement('p');
    textYear.innerText = "Tahun : " + year;

    const textContainer = document.createElement('article');
    textContainer.classList.add('listOfBooks');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('book_item')
    container.append(textContainer);
    container.setAttribute('id', `book-${id}`);

    if (isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('green');
        undoButton.innerHTML = 'Belum selesai dibaca';
        undoButton.addEventListener('click', function () {
            undoBookFromCompleted(id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerHTML = 'Hapus Buku';
        trashButton.addEventListener('click', function () {
            let konfirmasi = confirm("Apakah anda yakin ingin menghapus buku ini?");
            if (konfirmasi == true) {
                removeBookFromCompleted(id);
            } else {
                return;
            }
        });

        container.append(undoButton, trashButton);

    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('green')
        checkButton.innerHTML = 'Selesai dibaca'
        checkButton.addEventListener('click', function () {
            addBookToCompleted(id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerHTML = 'Hapus Buku';
        trashButton.addEventListener('click', function () {
            let konfirmasi = confirm("Apakah anda yakin ingin menghapus buku ini?");
            if (konfirmasi == true) {
                removeBookFromCompleted(id);
            } else {
                return;
            }
        });

        container.append(checkButton, trashButton);
    }

    return container;
}


// fungsi memasukkan buku baru ke dalam list buku yang belum selesai dibaca
function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


// fungsi memasukkan buku baru ke dalam list buku yang selesai dibaca
function finishedBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, true);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function atomicHabits() {
    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, "Atomic Habits", "James Clear", "2018", false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function pulangPergi() {
    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, "Pulang Pergi", "Tere Liye", "2021", false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function psychologyOfMoney() {
    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, "Psychology of Money", "Morgan Housel", "2020", false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


// fungsi untuk buku yang selesai dibaca
function addBookToCompleted(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


// fungsi untuk hapus buku
function removeBookFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);
    if (bookTarget === -1) return;
    books.splice(bookTarget, 1);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


// fungsi untuk buku yang belum selesai dibaca
function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


// Buku baru masuk ke list selesai atau belum selesai dibaca
document.addEventListener('DOMContentLoaded', function () {
    const submitUncompleted = document.getElementById('bookSubmitUncompleted');
    const submitCompleted = document.getElementById('bookSubmitCompleted');

    const bukuAtomicHabits = document.getElementById('atomicHabits');
    const bukuPulangPergi = document.getElementById('pulangPergi');
    const bukuPsychologyOfMoney = document.getElementById('psychologyOfMoney');

    const inputBookTitle = document.getElementById('inputBookTitle');
    const inputBookAuthor = document.getElementById('inputBookAuthor');
    const inputBookYear = document.getElementById('inputBookYear');

    submitUncompleted.addEventListener('click', function (event) {
        if (inputBookTitle.value === '' || inputBookAuthor.value === '' || inputBookYear.value === '') {
            alert("Mohon isi semua field");
            return;
        } else {
            event.preventDefault();
            addBook();
        }
    });

    submitCompleted.addEventListener('click', function (event) {
        if (inputBookTitle.value === '' || inputBookAuthor.value === '' || inputBookYear.value === '') {
            alert("Mohon isi semua field");
            return;
        } else {
            event.preventDefault();
            finishedBook();
        }
    });

    bukuAtomicHabits.addEventListener('click', function (event) {
        event.preventDefault();
        atomicHabits();
    });

    bukuPulangPergi.addEventListener('click', function (event) {
        event.preventDefault();
        pulangPergi();
    });

    bukuPsychologyOfMoney.addEventListener('click', function (event) {
        event.preventDefault();
        psychologyOfMoney();
    });


    if (isStorageExist()) {
        loadDataFromStorage();
    }
});


// Re-render the list of books
document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookList = document.getElementById('incompleteBookshelfList');
    const completedBookList = document.getElementById('completeBookshelfList');;

    //clearing list item
    uncompletedBookList.innerHTML = '';
    completedBookList.innerHTML = '';

    for (bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (bookItem.isCompleted) {
            completedBookList.append(bookElement);
        } else {
            uncompletedBookList.append(bookElement);
        }
    }
});


// Cari buku 
const searchButton = document.getElementById('searchSubmit');
searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    const listOfBooks = document.querySelectorAll('.book_item');
    var inputSearch = document.getElementById('searchBookTitle').value;

    for (item of listOfBooks) {
        if (item.children[0].innerText.toLowerCase().includes(inputSearch.toLowerCase())) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
});

// Button show all books
const showAllBooks = document.getElementById('showAllBooks');
showAllBooks.addEventListener('click', function (e) {
    e.preventDefault();
    const listOfBooks = document.querySelectorAll('.book_item');
    for (item of listOfBooks) {
        item.style.display = 'block';
    }
});


// Implementasi web storage
document.addEventListener(SAVED_EVENT, function () {
    // console.log(localStorage.getItem(STORAGE_KEY));
});

function isStorageExist() {
    if (typeof (Storage) == undefined) {
        alert("Browser tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}