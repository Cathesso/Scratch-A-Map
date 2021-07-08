package de.cathesso.scratchamap.service;

import de.cathesso.scratchamap.dto.UserResponseDTO;
import de.cathesso.scratchamap.model.UserSaveData;
import de.cathesso.scratchamap.repos.UserSaveDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserSaveDataService {
    private UserSaveDataRepo userSaveDataRepo;

    @Autowired
    public UserSaveDataService(UserSaveDataRepo userSaveDataRepo) {
        this.userSaveDataRepo = userSaveDataRepo;
    }

    public UserSaveData getUserSaveData(String username){
        return userSaveDataRepo.findById(username).orElse(new UserSaveData(username, 0));
    }

    public void saveUserSaveData(UserSaveData userSaveData){
        userSaveDataRepo.save(userSaveData);
    }

    public Iterable<UserSaveData> getPlayers() {
        return userSaveDataRepo.findAll(Sort.by("points").descending());
    }
}
