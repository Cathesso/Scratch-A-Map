package de.cathesso.scratchamap.dto;

import de.cathesso.scratchamap.model.api.OverpassApiElement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetMapElementsDTO {
    private List<OverpassApiElement> elements;
}
