package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Genero;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.GeneroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeneroService {

    private final GeneroRepository generoRepository;

    public GeneroService(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    public List<Genero> all() {
        return this.generoRepository.findAll();
    }

    public Genero save(Genero Genero) {
        return this.generoRepository.save(Genero);
    }

    public Genero one(Long id) {
        return this.generoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Genero()));
    }

    public Genero replace(Long id, Genero genero) {

        return this.generoRepository.findById(id).map( p -> (id.equals(genero.getId())  ?
                                                            this.generoRepository.save(genero) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Genero()));

    }

    public void delete(Long id) {
        this.generoRepository.findById(id).map(p -> {this.generoRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new EntityNotFoundException(id, new Genero()));
    }

}
