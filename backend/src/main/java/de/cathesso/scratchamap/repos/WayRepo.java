package de.cathesso.scratchamap.repos;

import de.cathesso.scratchamap.model.Way;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WayRepo extends PagingAndSortingRepository<Way, String>  {
}



