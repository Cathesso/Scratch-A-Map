package de.cathesso.scratchamap.repos;

import de.cathesso.scratchamap.model.Node;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapDataRepo extends PagingAndSortingRepository<Node, String> {
}
