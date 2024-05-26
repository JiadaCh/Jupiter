package org.jiada.jupiter.service;


import jakarta.transaction.Transactional;
import org.jiada.jupiter.entity.Comic;
import org.jiada.jupiter.entity.Editorial;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.ComicRepository;
import org.jiada.jupiter.repository.EditorialRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Transactional
public class ComicService {

    private final ComicRepository comicRepository;


    private final EditorialRepository editorialRepository;

    public ComicService(ComicRepository ComicRepository,  EditorialRepository editorialRepository) {
        this.comicRepository = ComicRepository;
        this.editorialRepository = editorialRepository;
    }

    public List<Comic> all() {
        return this.comicRepository.findAll();
    }

    public Comic save(Comic comic) {

        return this.comicRepository.save(comic);
    }

    public Comic one(Long id) {
        return this.comicRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Comic()));
    }

    public Comic replace(Long id, Comic comic) {
        Editorial editorial = comic.getEditorial();
        if (editorial.getId() == 0 && !editorial.getNombre().isBlank()) {
            editorial = editorialRepository.save(editorial);
            comic.setEditorial(editorial);
        }
        return this.comicRepository.findById(id).map( p -> (id.equals(comic.getId())  ?
                                                            this.comicRepository.save(comic) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Comic()));

    }

    public void delete(Long id) {
        this.comicRepository.findById(id).map(p -> {this.comicRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new EntityNotFoundException(id, new Comic()));
    }

}
