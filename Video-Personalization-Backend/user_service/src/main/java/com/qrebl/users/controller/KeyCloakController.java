//package com.qrebl.users.controller;
//
//import com.qrebl.users.DTO.UserDTO;
//import com.qrebl.users.service.KeyCloakService;
//import org.keycloak.representations.idm.UserRepresentation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//
//@RequestMapping(path = "api/user")
//public class KeyCloakController {
//
//    @Autowired
//    KeyCloakService service;
//
//    @PostMapping
//    public String addUser(@RequestBody UserDTO userDTO){
//        service.addUser(userDTO);
//        return "User Added Successfully.";
//    }
//
//    @GetMapping(path = "/{userName}")
//    public List<UserRepresentation> getUser(@PathVariable("userName") String userName){
//        List<UserRepresentation> user = service.getUser(userName);
//        return user;
//    }
//
//    @PutMapping(path = "/update/{userId}")
//    public String updateUser(@PathVariable("userId") String userId, @RequestBody UserDTO userDTO){
//        service.updateUser(userId, userDTO);
//        return "User Details Updated Successfully.";
//    }
//
//    @DeleteMapping(path = "/delete/{userId}")
//    public String deleteUser(@PathVariable("userId") String userId){
//        service.deleteUser(userId);
//        return "User Deleted Successfully.";
//    }
//
//    @GetMapping(path = "/verification-link/{userId}")
//    public String sendVerificationLink(@PathVariable("userId") String userId){
//        service.sendVerificationLink(userId);
//        return "Verification Link Send to Registered E-mail Id.";
//    }
//
//    @GetMapping(path = "/reset-password/{userId}")
//    public String sendResetPassword(@PathVariable("userId") String userId){
//        service.sendResetPassword(userId);
//        return "Reset Password Link Send Successfully to Registered E-mail Id.";
//    }
//}
package com.qrebl.users.controller;

import com.qrebl.users.DTO.UserDTO;
import com.qrebl.users.entity.User;
import com.qrebl.users.service.KeyCloakService;
import com.qrebl.users.service.UserService;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/user")
public class KeyCloakController {

    @Autowired
    UserService userService;
    @Autowired
    private KeyCloakService keycloakService;
    @PostMapping(path = "/adduser", consumes = "application/json")
    public ResponseEntity<Object> addUser(@RequestBody UserDTO userDTO) {
        userService.addUser(userDTO);
        Map<String, String> response = new HashMap<>();
        response.put("text", "User Added Successfully.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping(path = "/{userName}")
    public User getUser(@PathVariable("userName") String userName) {
        return userService.getUser(userName);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping(path = "/update/{userId}")
    public String updateUser(@PathVariable("userId") Long userId, @RequestBody UserDTO userDTO) {
        userService.updateUser(userId, userDTO);
        return "User Details Updated Successfully.";
    }

    @DeleteMapping(path = "/delete/{userId}")
    public String deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
        return "User Deleted Successfully.";
    }

    @GetMapping(path = "/verification-link/{userId}")
    public String sendVerificationLink(@PathVariable("userId") String userId) {
        keycloakService.sendVerificationLink(userId);
        return "Verification Link Sent to Registered E-mail Id.";
    }

    @GetMapping(path = "/reset-password/{userId}")
    public String sendResetPassword(@PathVariable("userId") String userId) {
        keycloakService.sendResetPassword(userId);
        return "Reset Password Link Sent Successfully to Registered E-mail Id.";
    }
}
