package org.jiada.jupiter.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.jiada.jupiter.service.StorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/media")
@AllArgsConstructor
public class MediaController {

    private final StorageService storageService;
    private final HttpServletRequest request;

    @PostMapping("/upload")
    public Map<String, String> upload(@RequestParam("file") MultipartFile file, @RequestParam(value = "subfolder", required = false, defaultValue = "") String subfolder, @RequestParam(value = "filename", required = false) String filename) {
        String path = storageService.store(file, subfolder, filename);
        String host = request.getRequestURL().toString().replace(request.getRequestURI(), "");
        String url = ServletUriComponentsBuilder
                .fromHttpUrl(host)
                .path("/media/")
                .path("/")
                .path(path)
                .toUriString();

        return Map.of("url", url);
    }

    @GetMapping("{subfolder}/{filename:.+}")
    public ResponseEntity<Resource> download(@PathVariable String subfolder, @PathVariable String filename) throws IOException {
        String filePath = subfolder + "/" + filename;
        Resource file = storageService.loadAsResource(filePath);
        String contentType = Files.probeContentType(file.getFile().toPath());
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(file);
    }

    @GetMapping("{filename:.+}")
    public ResponseEntity<Resource> download(@PathVariable String filename) throws IOException {
        Resource file = storageService.loadAsResource(filename);
        String contentType = Files.probeContentType(file.getFile().toPath());
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(file);
    }
}
