package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Editorial;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.EditorialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EditorialService {

    private final EditorialRepository editorialRepository;

    public EditorialService(EditorialRepository editorialRepository) {
        this.editorialRepository = editorialRepository;
    }

    public List<Editorial> all() {
        return this.editorialRepository.findAll();
    }

    public Editorial save(Editorial Editorial) {
        return this.editorialRepository.save(Editorial);
    }

    public Editorial one(Long id) {
        return this.editorialRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Editorial()));
    }

    public Editorial replace(Long id, Editorial editorial) {

        return this.editorialRepository.findById(id).map(p -> (id.equals(editorial.getId()) ?
                        this.editorialRepository.save(editorial) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Editorial()));

    }

    public void delete(Long id) {
        this.editorialRepository.findById(id).map(p -> {
                    this.editorialRepository.delete(p);
                    return p;
                })
                .orElseThrow(() -> new EntityNotFoundException(id, new Editorial()));
    }

}
