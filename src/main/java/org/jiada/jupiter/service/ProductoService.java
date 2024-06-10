package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Producto;
import org.jiada.jupiter.entity.Usuario;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.ProductoRepository;
import org.jiada.jupiter.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public ProductoService(ProductoRepository productoRepository, UsuarioRepository usuarioRepository) {
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Producto> findByUser(Long userId) {
        return this.productoRepository.findByUsuarioId(userId);
    }

    public List<Producto> all() {
        return this.productoRepository.findAllByComprado(false);
    }

    public Producto save(Producto producto, Long userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(userId, new Usuario()));
        producto.setUsuario(usuario);
        return this.productoRepository.save(producto);
    }

    public Producto one(Long id) {
        return this.productoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Producto()));
    }

    public Producto replace(Long id, Producto producto) {
        producto.setUsuario(this.usuarioRepository.findByProductosId(producto.getId()));
        return this.productoRepository.findById(id).map(p -> (id.equals(producto.getId()) ?
                        this.productoRepository.save(producto) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Producto()));

    }

    public void delete(Long id) {
        this.productoRepository.findById(id).map(p -> {
                    this.productoRepository.delete(p);
                    return p;
                })
                .orElseThrow(() -> new EntityNotFoundException(id, new Producto()));
    }

    public Optional<Producto> findById(Long idProducto) {
        return this.productoRepository.findById(idProducto);
    }
}
