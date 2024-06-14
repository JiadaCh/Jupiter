package org.jiada.jupiter.repository;

import org.jiada.jupiter.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsUsuarioByNombreAndCorreo(String nombre, String correo);

    boolean existsUsuarioByNombre(String nombre);

    boolean existsUsuarioByCorreo(String correo);

    Usuario findByNombreOrCorreo(String nombre, String correo);

    Usuario findByProductosId(Long idProducto);
}
