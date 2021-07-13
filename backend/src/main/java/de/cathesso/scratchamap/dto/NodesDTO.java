package de.cathesso.scratchamap.dto;


import de.cathesso.scratchamap.model.Node;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NodesDTO {
    private List<Node> collectedNodes;
}