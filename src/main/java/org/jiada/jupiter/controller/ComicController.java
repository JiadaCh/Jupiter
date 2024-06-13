package org.jiada.jupiter.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.jiada.jupiter.entity.Comic;
import org.jiada.jupiter.service.ComicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/comics")
public class ComicController {
    private final ComicService comicService;

    public ComicController(ComicService comicService) {
        this.comicService = comicService;
    }

    @GetMapping(value = {"", "/"},params = {"!pag","!top"})
    public List<Comic> all() {
        log.info("Accediendo a todas los comics");
        return this.comicService.all();
    }

    @GetMapping({"", "/"})
    public ResponseEntity<Map<String,Object>> all(@RequestParam(value = "pag", defaultValue = "0") int pag, @RequestParam(value = "top", defaultValue = "10") int top) {
        log.info("Accediendo a todas los comics");
        Map<String,Object> response = this.comicService.all(pag, top);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping({"", "/"})
    public Comic newComic(@RequestBody @Valid Comic comic) {
        return this.comicService.save(comic);
    }

    @GetMapping("/{id}")
    public Comic one(@PathVariable("id") Long id) {
        return this.comicService.one(id);
    }

    @PutMapping("/{id}")
    public Comic replaceComic(@PathVariable("id") Long id, @RequestBody @Valid Comic comic) {
        return this.comicService.replace(id, comic);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteComic(@PathVariable("id") Long id) {
        this.comicService.delete(id);
    }


}
