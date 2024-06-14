package org.jiada.jupiter.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Libro;
import org.jiada.jupiter.exception.ConstraintViolationException;
import org.jiada.jupiter.service.LibroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/libros")
public class LibroController {
    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @GetMapping(value = {"", "/"}, params = {"!pag", "!top"})
    public List<Libro> all() {
        log.info("Accediendo a todas los libros");
        return this.libroService.all();
    }

    @GetMapping({"", "/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pag", defaultValue = "0") int pag, @RequestParam(value = "top", defaultValue = "10") int top) {
        log.info("Accediendo a todas los libros");
        Map<String, Object> response = this.libroService.all(pag, top);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping({"", "/"})
    public Libro newLibro(@RequestBody @Valid Libro libro) {
        if (libroService.existsByIsbn(libro.getISBN())) {
            throw new ConstraintViolationException("ISBN existente");
        }
        return this.libroService.save(libro);
    }

    @GetMapping("/{id}")
    public Libro one(@PathVariable("id") Long id) {
        return this.libroService.one(id);
    }

    @PutMapping("/{id}")
    public Libro replaceLibro(@PathVariable("id") Long id, @RequestBody @Valid Libro libro) {
        return this.libroService.replace(id, libro);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteLibro(@PathVariable("id") Long id) {
        this.libroService.delete(id);
    }


}
