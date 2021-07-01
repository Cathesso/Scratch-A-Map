package de.cathesso.scratchamap.repos;

import de.cathesso.scratchamap.model.UserSaveData;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSaveDataRepo  extends PagingAndSortingRepository<UserSaveData, String> {
}