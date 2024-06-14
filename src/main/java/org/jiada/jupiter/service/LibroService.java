package org.jiada.jupiter.service;


import jakarta.transaction.Transactional;
import org.jiada.jupiter.entity.Editorial;
import org.jiada.jupiter.entity.Libro;
import org.jiada.jupiter.exception.ConstraintViolationException;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.EditorialRepository;
import org.jiada.jupiter.repository.LibroRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class LibroService {

    private final LibroRepository libroRepository;

    private final EditorialRepository editorialRepository;

    public LibroService(LibroRepository libroRepository, EditorialRepository editorialRepository) {
        this.libroRepository = libroRepository;
        this.editorialRepository = editorialRepository;
    }

    public List<Libro> all() {
        return this.libroRepository.findAll();
    }

    public Map<String, Object> all(int pag, int top) {
        Pageable pageable = PageRequest.of(pag, top, Sort.by("id").ascending());
        Page<Libro> pageAll = this.libroRepository.findAll(pageable);
        Map<String, Object> response = new HashMap<>();

        response.put("libros", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("total", pageAll.getTotalElements());
        response.put("pages", pageAll.getTotalPages());

        return response;
    }

    public Libro save(Libro Libro) {
        try {
            return this.libroRepository.save(Libro);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                throw new ConstraintViolationException(((org.hibernate.exception.ConstraintViolationException) e.getCause()).getConstraintName());
            }
            throw e;
        }
    }

    public Libro one(Long id) {
        return this.libroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Libro()));
    }

    public Libro replace(Long id, Libro libro) {

        try {
            Editorial editorial = libro.getEditorial();
            if (editorial.getId() == 0 && !editorial.getNombre().isBlank()) {
                editorial = editorialRepository.save(editorial);
                libro.setEditorial(editorial);
            }
            return this.libroRepository.findById(id).map(p -> (id.equals(libro.getId()) ?
                            this.libroRepository.save(libro) : null))
                    .orElseThrow(() -> new EntityNotFoundException(id, new Libro()));
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                throw new ConstraintViolationException(((org.hibernate.exception.ConstraintViolationException) e.getCause()).getConstraintName());
            }

            throw e;
        }
    }

    public void delete(Long id) {
        this.libroRepository.findById(id).map(p -> {
                    this.libroRepository.delete(p);
                    return p;
                })
                .orElseThrow(() -> new EntityNotFoundException(id, new Libro()));
    }

    public boolean existsByIsbn(String isbn) {
        return libroRepository.existsByISBN(isbn);
    }
}
