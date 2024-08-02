package com.qrebl.users.service;


import com.qrebl.users.DTO.UserDTO;
import com.qrebl.users.Repository.UserRepository;
import com.qrebl.users.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KeyCloakService keycloakService;

    public User addUser(UserDTO userDTO) {
        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setEmailId(userDTO.getEmailId());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());

        User savedUser = userRepository.save(user);
        keycloakService.addUser(userDTO);  // Add user to Keycloak
        return savedUser;
    }

    public User getUser(String username) {
        return userRepository.findByUserName(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long userId, UserDTO userDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setUserName(userDTO.getUserName());
        user.setEmailId(userDTO.getEmailId());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());

        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
        keycloakService.deleteUser(userId.toString());  // Delete user from Keycloak
    }
}
