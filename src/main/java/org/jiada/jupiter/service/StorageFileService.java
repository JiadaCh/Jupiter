package org.jiada.jupiter.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import static java.util.UUID.randomUUID;
import static org.springframework.util.StringUtils.getFilenameExtension;
import static org.springframework.util.StringUtils.hasText;

@Service
public class StorageFileService implements StorageService{

    @Value("${media.location}")
    private String medialocation;

    private Path rootLocation;

    @Override
    @PostConstruct
    public void init() throws IOException {
        rootLocation = Paths.get(medialocation);
        Files.createDirectories(rootLocation);
    }

    @Override
    public String store(MultipartFile file, String subfolder, String newFileName) {
        try {
            if (file.isEmpty()) throw new RuntimeException("Failed to store empty file");

            String originalFileName = file.getOriginalFilename();

            if (newFileName.isBlank()){
                newFileName = originalFileName;
            }

            String fileExtension = originalFileName != null ? getFilenameExtension(originalFileName) : "webp";
            String fileName = hasText(newFileName) ? newFileName : randomUUID().toString();

            Path subfolderPath = rootLocation.resolve(Paths.get(subfolder)).normalize().toAbsolutePath();


            // Create subfolder if it doesn't exist
            Files.createDirectories(subfolderPath);

            Path destination = subfolderPath.resolve(Paths.get(fileName + "." + fileExtension)).normalize().toAbsolutePath();

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream,destination, StandardCopyOption.REPLACE_EXISTING);
            }

            return subfolder + "/" + fileName + "." + fileExtension;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public Resource loadAsResource(String filename) {
        try{
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()){
                return resource;
            }else {
                throw new RuntimeException("Could not read file: " + filename);
            }

        }catch (MalformedURLException e){
            throw new RuntimeException(e);
        }
    }

}
