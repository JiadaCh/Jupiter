package org.jiada.jupiter.repository;

import org.jiada.jupiter.entity.Pedido;
import org.jiada.jupiter.entity.Producto;
import org.jiada.jupiter.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findDistinctByVendedorIdOrCompradorId(long vendedor_id, long comprador_id);

}
