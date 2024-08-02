package com.zagomail.generatedvideos.service;

import com.zagomail.generatedvideos.Repository.VideoFinalRepository;
import com.zagomail.generatedvideos.entity.VideoFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VideoFinalService {

    private final VideoFinalRepository videoFinalRepository;

    @Autowired
    public VideoFinalService(VideoFinalRepository videoFinalRepository) {
        this.videoFinalRepository = videoFinalRepository;
    }

    public List<VideoFinal> getAllVideos() {
        return videoFinalRepository.findAll();
    }

    public Optional<VideoFinal> getVideoById(Long id) {
        return videoFinalRepository.findById(id);
    }

    public VideoFinal createVideo(VideoFinal video) {
        return videoFinalRepository.save(video);
    }

    public void deleteVideo(Long id) {
        videoFinalRepository.deleteById(id);
    }
    public List<VideoFinal> getAllVideoFinalByidOriginalVideo(Integer idOriginalVideo){
        return videoFinalRepository.findByIdOriginalVideo(idOriginalVideo);
    }
    // Vous pouvez ajouter d'autres méthodes de service selon les besoins de votre application

}