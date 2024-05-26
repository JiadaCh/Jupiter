package org.jiada.jupiter.controller;

import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Resena;
import org.jiada.jupiter.service.ResenaService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/resenas")
public class ResenaController {
    private final ResenaService resenaService;

    public ResenaController(ResenaService resenaService) {
        this.resenaService = resenaService;
    }

    @GetMapping({"","/"})
    public List<Resena> all() {
        log.info("Accediendo a todas los resenas");
        return this.resenaService.all();
    }

    @PostMapping({"","/"})
    public Resena newResena(@RequestBody Resena resena) {
        return this.resenaService.save(resena);
    }

    @GetMapping("/{id}")
    public Resena one(@PathVariable("id") Long id) {
        return this.resenaService.one(id);
    }

    @PutMapping("/{id}")
    public Resena replaceResena(@PathVariable("id") Long id, @RequestBody Resena resena) {
        return this.resenaService.replace(id, resena);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteResena(@PathVariable("id") Long id) {
        this.resenaService.delete(id);
    }


}
