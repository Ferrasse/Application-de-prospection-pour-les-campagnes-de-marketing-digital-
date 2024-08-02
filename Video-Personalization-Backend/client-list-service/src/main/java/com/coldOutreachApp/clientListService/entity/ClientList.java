package com.coldOutreachApp.clientListService.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Table
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ClientList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String addedDate;

    private String listUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(String addedDate) {
        this.addedDate = addedDate;
    }

    public String getListUrl() {
        return listUrl;
    }

    public void setListUrl(String listUrl) {
        this.listUrl = listUrl;
    }
}
