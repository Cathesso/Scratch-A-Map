package de.cathesso.scratchamap.controller;

import de.cathesso.scratchamap.dto.AuthentificationDataDTO;
import de.cathesso.scratchamap.security.service.AppUserDetailsService;
import de.cathesso.scratchamap.security.service.JwtUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtilsService jwtUtilsService;
    private final AppUserDetailsService appUserDetailsService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtUtilsService jwtUtilsService, AppUserDetailsService appUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtilsService = jwtUtilsService;
        this.appUserDetailsService = appUserDetailsService;
    }

    @PostMapping("login")
    public String login (@RequestBody AuthentificationDataDTO data) {
        try {
            UsernamePasswordAuthenticationToken usernamePasswordData = new UsernamePasswordAuthenticationToken(data.getUsername(), data.getPassword());
            authenticationManager.authenticate(usernamePasswordData);
            return jwtUtilsService.createToken(new HashMap<>(), data.getUsername());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad login data");
        }

    }

    @PostMapping("register")
    public boolean registerNewUser (@RequestBody AuthentificationDataDTO data) {
        return appUserDetailsService.registerNewUser(data);
    }

    @GetMapping("checkUsername")
    public boolean checkUsername (@RequestParam String username) {
        return appUserDetailsService.checkUsername(username);
    }
}
