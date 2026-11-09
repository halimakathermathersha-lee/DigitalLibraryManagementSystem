package com.example.DigitalLibraryManagementSystem.controller;

import com.example.DigitalLibraryManagementSystem.entity.Book;
import com.example.DigitalLibraryManagementSystem.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:63342")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.findAll();
    }
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.findById(id);
    }
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.save(book);
    }
    @PutMapping("/{id}")
    public Book updateBook(@RequestBody Book book, @PathVariable Long id) {

        Book existingBook = bookService.findById(id);

        if (existingBook == null) {
            return null;
        }

        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setISBN(book.getISBN());
        existingBook.setQuantity(book.getQuantity());
        existingBook.setCategory(book.getCategory());

        return bookService.save(existingBook);
    }
    @DeleteMapping("/{id}")
    public String deleteBookById(@PathVariable Long id) {
        bookService.deleteById(id);
        return "Book has been deleted";
    }
}
