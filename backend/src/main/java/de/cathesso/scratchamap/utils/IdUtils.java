package de.cathesso.scratchamap.utils;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdUtils {
    public String generateUuid(){
        return UUID.randomUUID().toString();
    }
}
