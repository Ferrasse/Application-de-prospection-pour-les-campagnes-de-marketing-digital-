package com.coldOutreachApp.clientListService.repository;

import com.coldOutreachApp.clientListService.entity.ClientList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientListRepository extends JpaRepository<ClientList, Long> {
    // Vous pouvez ajouter des méthodes de requête personnalisées ici si nécessaire
}
