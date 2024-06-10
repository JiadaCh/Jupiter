package org.jiada.jupiter.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Producto;
import org.jiada.jupiter.entity.Usuario;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.service.ProductoService;
import org.jiada.jupiter.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final ProductoService productoService;

    public UsuarioController(UsuarioService usuarioService, ProductoService productoService) {
        this.usuarioService = usuarioService;
        this.productoService = productoService;
    }

    @GetMapping({"", "/"})
    public List<Usuario> all() {
        log.info("Accediendo a todas los usuarios");
        return this.usuarioService.all();
    }

    @GetMapping({"/producto"})
    public Usuario findByProducto(@RequestParam("productoId") Long productoId) {
        Producto producto = productoService.findById(productoId)
                .orElseThrow(() -> new EntityNotFoundException(productoId, new Producto()));
        return producto.getUsuario();
    }

    @PostMapping({"", "/"})
    public Usuario newUsuario(@RequestBody @Valid Usuario usuario) {
        return this.usuarioService.save(usuario);
    }

    @PostMapping({"/register"})
    public ResponseEntity<Usuario> Register(@RequestBody @Valid Usuario usuario) {
        return ResponseEntity.ok(this.usuarioService.save(usuario));
    }

    @GetMapping({"/login"})
    public Usuario Login(@RequestParam("usuario") String usuario, @RequestParam("contrasena") @Valid String contrasena) {
        return this.usuarioService.login(usuario, contrasena);
    }

    @GetMapping("/{id}")
    public Usuario one(@PathVariable("id") Long id) {
        return this.usuarioService.one(id);
    }

    @PutMapping("/{id}")
    public Usuario replaceUsuario(@PathVariable("id") Long id, @RequestBody @Valid Usuario usuario) {
        return this.usuarioService.replace(id, usuario);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable("id") Long id) {
        this.usuarioService.delete(id);
    }
}
