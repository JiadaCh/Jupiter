package org.jiada.jupiter.repository;

import org.jiada.jupiter.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByUsuarioId(Long userId);

    List<Producto> findAllByComprado(boolean comprado);
}
