package de.cathesso.scratchamap.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;
//import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection="nodes")
public class Node {
    @Id
    private String id;
    private String latitude;
    private String longitude;
    private HashMap<String, String> tags;
    //private Optional<List<String>> collectedByUser;
    private List<String> collectedByUser;
}
