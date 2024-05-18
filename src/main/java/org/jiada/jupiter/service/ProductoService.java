package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Producto;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> all() {
        return this.productoRepository.findAll();
    }

    public Producto save(Producto Producto) {
        return this.productoRepository.save(Producto);
    }

    public Producto one(Long id) {
        return this.productoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Producto()));
    }

    public Producto replace(Long id, Producto producto) {

        return this.productoRepository.findById(id).map( p -> (id.equals(producto.getId())  ?
                                                            this.productoRepository.save(producto) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Producto()));

    }

    public void delete(Long id) {
        this.productoRepository.findById(id).map(p -> {this.productoRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new EntityNotFoundException(id, new Producto()));
    }

}
