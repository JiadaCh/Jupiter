package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Autor;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.AutorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutorService {

    private final AutorRepository autorRepository;

    public AutorService(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    public List<Autor> all() {
        return this.autorRepository.findAll();
    }

    public Autor save(Autor Autor) {
        return this.autorRepository.save(Autor);
    }

    public Autor one(Long id) {
        return this.autorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Autor()));
    }

    public Autor replace(Long id, Autor autor) {

        return this.autorRepository.findById(id).map(p -> (id.equals(autor.getId()) ?
                        this.autorRepository.save(autor) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Autor()));

    }

    public void delete(Long id) {
        this.autorRepository.findById(id).map(p -> {
                    this.autorRepository.delete(p);
                    return p;
                })
                .orElseThrow(() -> new EntityNotFoundException(id, new Autor()));
    }

}
