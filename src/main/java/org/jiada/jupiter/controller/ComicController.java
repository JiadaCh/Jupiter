package org.jiada.jupiter.controller;

import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Comic;
import org.jiada.jupiter.service.ComicService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/comics")
public class ComicController {
    private final ComicService comicService;

    public ComicController(ComicService comicService) {
        this.comicService = comicService;
    }

    @GetMapping({"","/"})
    public List<Comic> all() {
        log.info("Accediendo a todas los comics");
        return this.comicService.all();
    }

    @PostMapping({"","/"})
    public Comic newComic(@RequestBody Comic comic) {
        return this.comicService.save(comic);
    }

    @GetMapping("/{id}")
    public Comic one(@PathVariable("id") Long id) {
        return this.comicService.one(id);
    }

    @PutMapping("/{id}")
    public Comic replaceComic(@PathVariable("id") Long id, @RequestBody Comic comic) {
        return this.comicService.replace(id, comic);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteComic(@PathVariable("id") Long id) {
        this.comicService.delete(id);
    }


}
