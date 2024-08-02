package com.zagomail.generatedvideos.Repository;

import com.zagomail.generatedvideos.entity.VideoFinal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoFinalRepository extends JpaRepository<VideoFinal, Long> {
    List<VideoFinal> findByIdOriginalVideo(Integer idOriginalVideo);

}
