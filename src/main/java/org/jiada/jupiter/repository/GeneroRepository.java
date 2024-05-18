package org.jiada.jupiter.repository;

import org.jiada.jupiter.entity.Autor;
import org.jiada.jupiter.entity.Genero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneroRepository extends JpaRepository<Genero, Long> {

}
