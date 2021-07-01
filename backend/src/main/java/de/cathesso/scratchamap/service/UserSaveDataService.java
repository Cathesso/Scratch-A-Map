package de.cathesso.scratchamap.service;

import de.cathesso.scratchamap.model.UserSaveData;
import de.cathesso.scratchamap.repos.UserSaveDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
