package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Comic;
import org.jiada.jupiter.entity.Libro;
import org.jiada.jupiter.entity.Resena;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.ComicRepository;
import org.jiada.jupiter.repository.LibroRepository;
import org.jiada.jupiter.repository.ResenaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResenaService {

    private final ResenaRepository resenaRepository;
    private final ComicRepository comicRepository;
    private final LibroRepository libroRepository;

    public ResenaService(ResenaRepository resenaRepository, ComicRepository comicRepository, LibroRepository libroRepository) {
        this.resenaRepository = resenaRepository;
        this.comicRepository = comicRepository;
        this.libroRepository = libroRepository;
    }

    public List<Resena> all() {
        return this.resenaRepository.findAll();
    }

    public List<Resena> findByComicId(Long comicId) {
        return this.resenaRepository.findALlByComicId(comicId);
    }

    public List<Resena> findByLibroId(Long libroId) {
        return this.resenaRepository.findALlByLibroId(libroId);
    }

    public Resena findByLibroIdAndUsuarioId(Long libroId,long usuarioId) {
        return this.resenaRepository.findByLibroIdAndUsuarioId(libroId,usuarioId);
    }

    public Resena findByComicIdAndUsuarioId(Long comicId,long usuarioId) {
        return this.resenaRepository.findByComicIdAndUsuarioId(comicId,usuarioId);
    }

    public Resena save(Resena resena, Long idComic, Long idLibro) {
        if (idComic != null && idComic != 0) {
            Comic comic = comicRepository.findById(idComic).orElse(null) ;
            resena.setComic(comic);
        }
        if (idLibro != null && idLibro != 0) {
            Libro libro = libroRepository.findById(idLibro).orElse(null);
            resena.setLibro(libro);
        }
        return this.resenaRepository.save(resena);
    }

    public Resena one(Long id) {
        return this.resenaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Resena()));
    }

    public Resena replace(Long id, Resena resena) {
        Resena r = this.resenaRepository.findById(id).orElse(null);
        assert r != null;
        resena.setLibro(r.getLibro());
        resena.setComic(r.getComic());
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
