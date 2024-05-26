package org.jiada.jupiter.service;

import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;

import java.io.IOException;

public interface StorageService {

    void init() throws IOException;


    String store(MultipartFile file, String subfolder, String newFileName);

    Resource loadAsResource(String filename);
}
