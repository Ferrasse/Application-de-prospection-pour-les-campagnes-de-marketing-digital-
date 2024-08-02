package com.zagomail.generatedvideos.controller;

import com.zagomail.generatedvideos.entity.VideoFinal;
import com.zagomail.generatedvideos.service.VideoFinalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/videos")
public class VideoFinalController {

    private final VideoFinalService videoFinalService;

    @Autowired
    public VideoFinalController(VideoFinalService videoFinalService) {
        this.videoFinalService = videoFinalService;
    }

    @GetMapping
    public ResponseEntity<List<VideoFinal>> getAllVideos() {
        List<VideoFinal> videos = videoFinalService.getAllVideos();
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoFinal> getVideoById(@PathVariable("id") Long id) {
        Optional<VideoFinal> video = videoFinalService.getVideoById(id);
        return video.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<VideoFinal> createVideo(@RequestBody VideoFinal video) {
        VideoFinal createdVideo = videoFinalService.createVideo(video);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVideo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable("id") Long id) {
        videoFinalService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/byVideoOrigine/{idOriginalVideo}")
    public List<VideoFinal> getAllVideoFinalByidOriginalVideo(@PathVariable Integer idOriginalVideo) {
        return videoFinalService.getAllVideoFinalByidOriginalVideo(idOriginalVideo);
    }

    @PostMapping("/receive-data")
    @CrossOrigin(origins = "http://localhost:5000")
    public ResponseEntity<?> receiveDataFromFlask(@RequestBody Map<String, Object> data) {
        try {
            // Traitez les données reçues
            List<String> videoPaths = (List<String>) data.get("videoPath");
            List<String> firstNames = (List<String>) data.get("first_names");
            List<String> lastNames = (List<String>) data.get("last_names");
            List<String> telephones = (List<String>) data.get("telephones");
            List<String> emails = (List<String>) data.get("emails");

            // Exemple : Imprimez les données reçues pour débogage
            System.out.println("Video Path: " + videoPaths);
            System.out.println("First Names: " + firstNames);
            System.out.println("Last Names: " + lastNames);
            System.out.println("Telephones: " + telephones);
            System.out.println("Emails: " + emails);

            // Construisez un objet JSON avec les données à renvoyer
            Map<String, Object> responseData = Map.of(
                    "videoPath", videoPaths,
                    "firstNames", firstNames,
                    "lastNames", lastNames,
                    "telephones", telephones,
                    "emails", emails
            );

            // Renvoyez les données au format JSON avec un statut HTTP 200 OK
            return ResponseEntity.ok(responseData);
        } catch (Exception e) {
            // En cas d'erreur, renvoyer une réponse d'erreur avec un statut HTTP 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        }
    }

}
