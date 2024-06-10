package org.jiada.jupiter.repository;

import org.jiada.jupiter.entity.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Long> {

    List<Resena> findALlByComicId(Long comicId);

    List<Resena> findALlByLibroId(Long libroId);

    Resena findByComicIdAndUsuarioId(long comic_id, long usuario_id);

    Resena findByLibroIdAndUsuarioId(long libroId, long usuario_id);
}
