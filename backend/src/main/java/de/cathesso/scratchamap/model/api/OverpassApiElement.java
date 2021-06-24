package de.cathesso.scratchamap.model.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OverpassApiElement {
    private String type;
    private String id;
    private String lat;
    private String lon;
    private String[] nodes;
    private HashMap<String, String> tags;
}
