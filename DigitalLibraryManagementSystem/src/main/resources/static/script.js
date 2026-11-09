
const apiUrl = "api/boo";

const bookTableBody = document.getElementById("bookTableBody");
const totalBooks = document.getElementById("totalBooks");

// Fetch all books
function getAllBooks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(books => {
            bookTableBody.innerHTML = "";

            totalBooks.textContent = books.length;

            // Calculate total quantity
            const quantity = books.reduce((total, book) => {
                return total + book.Quantity;
            }, 0);

            document.getElementById("totalQuantity").textContent = quantity;

// Calculate unique categories
            const categories = new Set(
                books.map(book => book.Category)
            );

            document.getElementById("totalCategories").textContent = categories.size;

            books.forEach(book => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${book.BookId}</td>
                    <td>${book.Title}</td>
                    <td>${book.Author}</td>
                    <td>${book.ISBN}</td>
                    <td>${book.Quantity}</td>
                    <td>${book.Category}</td>
                    <td>
                        <button onclick="editBook(${book.BookId})">Edit</button>
                        <button onclick="deleteBook(${book.BookId})">Delete</button>
                    </td>
                `;

                bookTableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error:", error));
}
const bookModal = document.getElementById("bookModal");
const addBookBtn = document.getElementById("addBookBtn");
const closeModal = document.getElementById("closeModal");

addBookBtn.addEventListener("click", () => {
    bookModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    bookModal.style.display = "none";
});

const bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const book = {
        Title: document.getElementById("title").value,
        Author: document.getElementById("author").value,
        ISBN: document.getElementById("isbn").value,
        Quantity: Number(document.getElementById("quantity").value),
        Category: document.getElementById("category").value
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to add book");
            }
            return response.json();
        })
        .then(data => {
            alert("Book added successfully!");
            bookForm.reset();
            bookModal.style.display = "none";
            getAllBooks();
        })
        .catch(error => {
            console.error(error);
            alert("Unable to add book!");
        });
});

function deleteBook(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Delete failed");
                }
                alert("Book deleted successfully!");
                getAllBooks();
            })
            .catch(error => {
                console.error(error);
                alert("Unable to delete book!");
            });
    }
}

const editModal = document.getElementById("editModal");
const editBookForm = document.getElementById("editBookForm");

// Open edit popup
function editBook(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(book => {
            document.getElementById("editId").value = book.BookId;
            document.getElementById("editTitle").value = book.Title;
            document.getElementById("editAuthor").value = book.Author;
            document.getElementById("editIsbn").value = book.ISBN;
            document.getElementById("editQuantity").value = book.Quantity;
            document.getElementById("editCategory").value = book.Category;

            editModal.style.display = "flex";
        });
}

// Close popup
document.getElementById("closeEditModal").addEventListener("click", () => {
    editModal.style.display = "none";
});

// Update book
editBookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("editId").value;

    const book = {
        Title: document.getElementById("editTitle").value,
        Author: document.getElementById("editAuthor").value,
        ISBN: document.getElementById("editIsbn").value,
        Quantity: Number(document.getElementById("editQuantity").value),
        Category: document.getElementById("editCategory").value
    };

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Update failed");
            }

            return response.json();
        })
        .then(() => {
            alert("Book updated successfully!");
            editModal.style.display = "none";
            getAllBooks();
        })
        .catch(error => {
            console.error(error);
            alert("Unable to update book!");
        });
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();

    const rows = bookTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        const title = row.cells[1].textContent.toLowerCase();
        const author = row.cells[2].textContent.toLowerCase();

        if (title.includes(searchValue) || author.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

// Load books when page opens
getAllBooks();
