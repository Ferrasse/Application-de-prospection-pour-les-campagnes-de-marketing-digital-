package com.zagomail.generatedvideos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class VideoFinal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVideo;
    private String date;
    private String path;
    private Integer idOriginalVideo;
    private Integer idCsvFile;
}
