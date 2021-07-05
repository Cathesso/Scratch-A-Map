package de.cathesso.scratchamap.model.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OverpassApiElement {
    private String type;
    private String id;
    private String lat;
    private String lon;
    private List<String> nodes;
    private HashMap<String, String> tags;
}
