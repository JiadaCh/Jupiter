package org.jiada.jupiter.service;


import jakarta.transaction.Transactional;
import org.jiada.jupiter.entity.Editorial;
import org.jiada.jupiter.entity.Libro;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.EditorialRepository;
import org.jiada.jupiter.repository.LibroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Libro save(Libro Libro) {
        return this.libroRepository.save(Libro);
    }

    public Libro one(Long id) {
        return this.libroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Libro()));
    }

    public Libro replace(Long id, Libro libro) {
        Editorial editorial = libro.getEditorial();
        if (editorial.getId() == 0 && !editorial.getNombre().isBlank()) {
            editorial = editorialRepository.save(editorial);
            libro.setEditorial(editorial);
        }
        return this.libroRepository.findById(id).map( p -> (id.equals(libro.getId())  ?
                                                            this.libroRepository.save(libro) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Libro()));
    }

    public void delete(Long id) {
        this.libroRepository.findById(id).map(p -> {this.libroRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new EntityNotFoundException(id, new Libro()));
    }

}
