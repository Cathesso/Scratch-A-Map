package de.cathesso.scratchamap.repos;

import de.cathesso.scratchamap.model.Node;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NodeRepo extends PagingAndSortingRepository<Node, String> {
}
