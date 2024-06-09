package org.jiada.jupiter.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Genero;
import org.jiada.jupiter.service.GeneroService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/generos")
public class GeneroController {
    private final GeneroService generoService;

    public GeneroController(GeneroService generoService) {
        this.generoService = generoService;
    }

    @GetMapping({"","/"})
    public List<Genero> all() {
        log.info("Accediendo a todas los generos");
        return this.generoService.all();
    }

    @PostMapping({"","/"})
    public Genero newGenero(@RequestBody @Valid Genero genero) {
        return this.generoService.save(genero);
    }

    @GetMapping("/{id}")
    public Genero one(@PathVariable("id") Long id) {
        return this.generoService.one(id);
    }

    @PutMapping("/{id}")
    public Genero replaceGenero(@PathVariable("id") Long id, @RequestBody @Valid Genero genero) {
        return this.generoService.replace(id, genero);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteGenero(@PathVariable("id") Long id) {
        this.generoService.delete(id);
    }


}
