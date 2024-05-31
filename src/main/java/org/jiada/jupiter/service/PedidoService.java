package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Pedido;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public List<Pedido> all() {
        return this.pedidoRepository.findAll();
    }

    public List<Pedido> findByUsuario(Long idUsuario) {
        this.pedidoRepository.findDistinctByVendedorIdOrCompradorId(idUsuario,idUsuario).forEach(pedido -> System.out.println(pedido.getFecha()));
        return this.pedidoRepository.findDistinctByVendedorIdOrCompradorId(idUsuario,idUsuario);
    }

    public Pedido save(Pedido pedido) {
        pedido.setFecha(new Date());
        return this.pedidoRepository.save(pedido);
    }

    public Pedido one(Long id) {
        return this.pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Pedido()));
    }

    public Pedido replace(Long id, Pedido pedido) {

        return this.pedidoRepository.findById(id).map( p -> (id.equals(pedido.getId())  ?
                                                            this.pedidoRepository.save(pedido) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Pedido()));

    }

    public void delete(Long id) {
        this.pedidoRepository.findById(id).map(p -> {this.pedidoRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new EntityNotFoundException(id, new Pedido()));
    }

}
