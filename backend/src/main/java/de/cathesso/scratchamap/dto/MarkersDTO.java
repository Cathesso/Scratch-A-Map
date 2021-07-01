package de.cathesso.scratchamap.dto;


import de.cathesso.scratchamap.model.Node;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MarkersDTO {
    private List<Node> collectedNodes;
}