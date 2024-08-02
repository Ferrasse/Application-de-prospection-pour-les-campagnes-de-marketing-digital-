package com.coldOutreachApp.clientListService.service;

import com.coldOutreachApp.clientListService.entity.ClientList;
import com.coldOutreachApp.clientListService.repository.ClientListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClientListService {

    @Autowired
    private ClientListRepository clientListRepository;

    public ClientList get(Long id) {
         return clientListRepository.findById(id).get();
    }

    public List<ClientList> getAll()  {
        return clientListRepository.findAll();
    }

    public ClientList add(ClientList clientList) {
        ClientList savedClientList = clientListRepository.save(clientList);
        return savedClientList;
    }
    public void addList(List<ClientList> clientLists) {
        for (ClientList clientList : clientLists) {
            this.add(clientList);
        }
    }

    public void delete(Long id)  {
        clientListRepository.deleteById(id);
    }


}
