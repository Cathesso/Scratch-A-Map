package de.cathesso.scratchamap.controller;

import de.cathesso.scratchamap.dto.UserResponseDTO;
import de.cathesso.scratchamap.model.UserSaveData;
import de.cathesso.scratchamap.service.UserSaveDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class AppUserDetailsController {
    private final UserSaveDataService userSaveDataService;

    @Autowired
    public AppUserDetailsController(UserSaveDataService userSaveDataService) {
        this.userSaveDataService = userSaveDataService;
    }

    @GetMapping("me")
    public UserResponseDTO getLoggedInUser (Principal principal){
        String username = principal.getName();
        UserSaveData userSaveData = userSaveDataService.getUserSaveData(username);

        return new UserResponseDTO(userSaveData.getUsername(), userSaveData.getPoints());
    }

    @GetMapping("stats")
    public List<UserResponseDTO> getPlayersStats(){
        Iterable<UserSaveData> allPlayers = userSaveDataService.getPlayers();
        List<UserResponseDTO> response = new ArrayList<>();
        allPlayers.forEach(player -> {response.add(new UserResponseDTO(player.getUsername(), player.getPoints()));});
        return response;
    }

    @PostMapping("savePoints")
    public void saveUserSaveData (@RequestBody UserResponseDTO data){

        UserSaveData userSaveData = new UserSaveData(data.getUsername(), data.getPoints());
        userSaveDataService.saveUserSaveData(userSaveData);
    }

}
