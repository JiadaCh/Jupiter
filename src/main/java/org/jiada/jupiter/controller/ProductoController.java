package org.jiada.jupiter.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Producto;
import org.jiada.jupiter.service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/productos")
public class ProductoController {
    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping(value = {"", "/"}, params = {"!pag", "!top"})
    public List<Producto> all() {
        log.info("Accediendo a todas los productos");
        return this.productoService.all();
    }

    @GetMapping({"", "/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pag", defaultValue = "0") int pag, @RequestParam(value = "top", defaultValue = "10") int top) {
        log.info("Accediendo a todas los productos");
        Map<String, Object> response = this.productoService.all(pag, top);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping({"/usuario"})
    public List<Producto> getProductoByUser(@RequestParam("id") Long userId) {
        return this.productoService.findByUser(userId);
    }

    @PostMapping({"", "/"})
    public Producto newProducto(@RequestParam("id") Long userId, @RequestBody @Valid Producto producto) {
        return this.productoService.save(producto, userId);
    }

    @GetMapping("/{id}")
    public Producto one(@PathVariable("id") Long id) {
        return this.productoService.one(id);
    }

    @PutMapping("/{id}")
    public Producto replaceProducto(@PathVariable("id") Long id, @RequestBody @Valid Producto producto) {
        return this.productoService.replace(id, producto);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable("id") Long id) {
        this.productoService.delete(id);
    }


}
