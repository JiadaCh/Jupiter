package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Libro;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.LibroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibroService {

    private final LibroRepository libroRepository;

    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
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
