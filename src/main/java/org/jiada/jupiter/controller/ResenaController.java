package org.jiada.jupiter.controller;

import jakarta.validation.Valid;
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
    public Resena newResena(@RequestBody @Valid Resena resena, @RequestParam("idComic") Long idComic, @RequestParam("idLibro") Long idLibro) {
        return this.resenaService.save(resena,idComic,idLibro);
    }

    @GetMapping("/comics")
    public List<Resena> findByComic(@RequestParam("id") long idComic) {
        return this.resenaService.findByComicId(idComic);
    }

    @GetMapping("/libros")
    public List<Resena> findByLibro(@RequestParam("id") Long idLibro) {
        return this.resenaService.findByLibroId(idLibro);
    }

    @GetMapping("/comics/{id}/usuarios")
    public Resena findByComicUsuario(@PathVariable("id") Long idComic,@RequestParam("id") Long idUsuario) {
        return this.resenaService.findByComicIdAndUsuarioId(idComic,idUsuario);
    }

    @GetMapping("/libros/{id}/usuarios")
    public Resena findByLibroUsuario(@PathVariable("id") Long idLibro,@RequestParam("id") Long idUsuario) {
        return this.resenaService.findByLibroIdAndUsuarioId(idLibro,idUsuario);
    }

    @GetMapping("/{id}")
    public Resena one(@PathVariable("id") Long id) {
        return this.resenaService.one(id);
    }

    @PutMapping("/{id}")
    public Resena replaceResena(@PathVariable("id") Long id, @RequestBody @Valid Resena resena) {
        return this.resenaService.replace(id, resena);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteResena(@PathVariable("id") Long id) {
        this.resenaService.delete(id);
    }


}
