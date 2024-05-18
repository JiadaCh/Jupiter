package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Comic;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.ComicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComicService {

    private final ComicRepository comicRepository;

    public ComicService(ComicRepository ComicRepository) {
        this.comicRepository = ComicRepository;
    }

    public List<Comic> all() {
        return this.comicRepository.findAll();
    }

    public Comic save(Comic Comic) {
        return this.comicRepository.save(Comic);
    }

    public Comic one(Long id) {
        return this.comicRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Comic()));
    }

    public Comic replace(Long id, Comic Comic) {

        return this.comicRepository.findById(id).map( p -> (id.equals(Comic.getId())  ?
                                                            this.comicRepository.save(Comic) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Comic()));

    }

    public void delete(Long id) {
        this.comicRepository.findById(id).map(p -> {this.comicRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new EntityNotFoundException(id, new Comic()));
    }

}
