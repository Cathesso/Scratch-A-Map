package de.cathesso.scratchamap.security.repository;

import de.cathesso.scratchamap.security.model.AppUser;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepo extends PagingAndSortingRepository<AppUser, String> {
}
