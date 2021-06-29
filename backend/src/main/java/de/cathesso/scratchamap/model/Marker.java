package de.cathesso.scratchamap.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection="markers")
public class Marker {
    @Id
    private String id;
    private String latitude;
    private String longitude;
    private HashMap<String, String> tags;
}
