package org.jiada.jupiter.controller;

import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Producto;
import org.jiada.jupiter.service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/productos")
public class ProductoController {
    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping({"","/"})
    public List<Producto> all() {
        log.info("Accediendo a todas los productos");
        return this.productoService.all();
    }

    @GetMapping({"/usuario"})
    public List<Producto> getProductoByUser(@RequestParam("id") Long userId) {
        return this.productoService.findByUser(userId);
    }

    @PostMapping({"","/"})
    public Producto newProducto(@RequestParam("id") Long userId,@RequestBody Producto producto) {
        return this.productoService.save(producto,userId);
    }

    @GetMapping("/{id}")
    public Producto one(@PathVariable("id") Long id) {
        return this.productoService.one(id);
    }

    @PutMapping("/{id}")
    public Producto replaceProducto(@PathVariable("id") Long id, @RequestBody Producto producto) {
        return this.productoService.replace(id, producto);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable("id") Long id) {
        this.productoService.delete(id);
    }


}
