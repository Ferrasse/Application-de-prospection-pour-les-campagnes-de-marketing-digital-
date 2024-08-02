package com.coldOutreachApp.clientListService.controller;

import com.coldOutreachApp.clientListService.entity.ClientList;
import com.coldOutreachApp.clientListService.service.ClientListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import java.nio.file.Paths;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("api/clients")
@CrossOrigin("http://localhost:4200")
public class ClientListController {

    @Value("${upload.directory}")
    private String uploadDirectory;

    @Autowired
    private ClientListService clientsListService;

    @GetMapping("/allClientsLists")
    public List<ClientList> allClientsLists() throws Exception {
        return clientsListService.getAll();
    }

    @GetMapping("/showclientsList")
    public ClientList getclientsList(Long id) {
        return clientsListService.get(id);
    }

    @PostMapping("/addClientsList")
    public ClientList save(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            // Gérer le cas où aucun fichier n'est envoyé
            return null;
        }

        try {
            // Récupérer le nom original du fichier
            String originalFileName = file.getOriginalFilename();

            // Créer un nom de fichier unique en ajoutant un horodatage
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
            String uniqueFileName = LocalDateTime.now().format(dtf) + "_" + originalFileName;

            // Créer le chemin de destination
            Path uploadPath = Paths.get(uploadDirectory);

            // Vérifier si le répertoire de destination existe, sinon le créer
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Enregistrer le fichier dans le répertoire de destination
            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath);

            // Enregistrer le chemin du fichier dans la base de données
            ClientList clientList = new ClientList();
            clientList.setListUrl(filePath.toString());
            clientList.setAddedDate(LocalDateTime.now().toString());
            ClientList clientListAdded = clientsListService.add(clientList);
            System.out.println("helllooooooo "+clientListAdded.toString());
            return clientListAdded;
        } catch (IOException ex) {
            // Gérer les erreurs lors de l'enregistrement du fichier
            ex.printStackTrace();
            return null;
        }
    }

    @PostMapping("/addClientsLists")
    public void addClientsListList(@RequestBody List<ClientList> clientsListList) {
        clientsListService.addList(clientsListList);
    }


    @DeleteMapping("/deleteclientsList/{idClientsList}")
    public void deleteclientsList(@PathVariable Long idClientsList) {
        clientsListService.delete(idClientsList);
    }


}
