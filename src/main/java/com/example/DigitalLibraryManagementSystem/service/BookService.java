package com.example.DigitalLibraryManagementSystem.service;

import com.example.DigitalLibraryManagementSystem.entity.Book;
import com.example.DigitalLibraryManagementSystem.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    public Book findById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }
    public List<Book> findAll() {
        return bookRepository.findAll();
    }
    public Book save(Book book) {
        return bookRepository.save(book);
    }
    public void deleteById(Long id) {
        bookRepository.deleteById(id);
    }
    public boolean existsBookByID(Long id) {
        return bookRepository.existsById(id);
    }
}
