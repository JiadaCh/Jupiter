package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Resena;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.ResenaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResenaService {

    private final ResenaRepository resenaRepository;

    public ResenaService(ResenaRepository resenaRepository) {
        this.resenaRepository = resenaRepository;
    }

    public List<Resena> all() {
        return this.resenaRepository.findAll();
    }

    public Resena save(Resena Resena) {
        return this.resenaRepository.save(Resena);
    }

    public Resena one(Long id) {
        return this.resenaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Resena()));
    }

    public Resena replace(Long id, Resena resena) {

        return this.resenaRepository.findById(id).map( p -> (id.equals(resena.getId())  ?
                                                            this.resenaRepository.save(resena) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Resena()));

    }

    public void delete(Long id) {
        this.resenaRepository.findById(id).map(p -> {this.resenaRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new EntityNotFoundException(id, new Resena()));
    }

}
