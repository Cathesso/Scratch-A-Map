package de.cathesso.scratchamap.security.service;

import de.cathesso.scratchamap.security.repository.AppUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final AppUserRepo appUserRepo;

    @Autowired
    public AppUserDetailsService (AppUserRepo appUserRepo) {
        this.appUserRepo = appUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepo.findById(username)
                .map(appUser -> User
                    .withUsername(username)
                    .password(appUser.getPassword())
                    .authorities("User")
                    .build())
                    .orElseThrow(() -> new UsernameNotFoundException("Username has not been found: " + username));
    }

}

