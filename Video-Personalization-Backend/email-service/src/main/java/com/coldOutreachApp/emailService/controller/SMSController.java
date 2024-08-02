package com.coldOutreachApp.emailService.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sms")
public class SMSController {

    @GetMapping("/{phoneNumber}")
    public void getSMSByPhoneNumber(@PathVariable String phoneNumber) {

    }
}

