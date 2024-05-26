package org.jiada.jupiter.controller;

import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Autor;
import org.jiada.jupiter.service.AutorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/autores")
public class AutorController {

    private final AutorService autorService;

    public AutorController(AutorService autorService) {
        this.autorService = autorService;
    }

    @GetMapping({"","/"})
    public List<Autor> all() {
        System.out.println("ASd");
        log.info("Accediendo a todas los autores");
        return this.autorService.all();
    }

    @PostMapping({"","/"})
    public Autor newAutor(@RequestBody Autor autor) {
        return this.autorService.save(autor);
    }

    @GetMapping("/{id}")
    public Autor one(@PathVariable("id") Long id) {
        return this.autorService.one(id);
    }

    @PutMapping("/{id}")
    public Autor replaceAutor(@PathVariable("id") Long id, @RequestBody Autor autor) {
        return this.autorService.replace(id, autor);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteAutor(@PathVariable("id") Long id) {
        this.autorService.delete(id);
    }


}
