package org.jiada.jupiter.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Editorial;
import org.jiada.jupiter.service.EditorialService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/editoriales")
public class EditorialController {
    private final EditorialService editorialService;

    public EditorialController(EditorialService editorialService) {
        this.editorialService = editorialService;
    }

    @GetMapping({"","/"})
    public List<Editorial> all() {
        log.info("Accediendo a todas los editoriales");
        return this.editorialService.all();
    }

    @PostMapping({"","/"})
    public Editorial newEditorial(@RequestBody @Valid Editorial editorial) {
        return this.editorialService.save(editorial);
    }

    @GetMapping("/{id}")
    public Editorial one(@PathVariable("id") Long id) {
        return this.editorialService.one(id);
    }

    @PutMapping("/{id}")
    public Editorial replaceEditorial(@PathVariable("id") Long id, @RequestBody @Valid Editorial editorial) {
        return this.editorialService.replace(id, editorial);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteEditorial(@PathVariable("id") Long id) {
        this.editorialService.delete(id);
    }


}
