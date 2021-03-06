package de.cathesso.scratchamap.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection="nodes")
public class Node {
    @Id
    private String id;
    private double latitude;
    private double longitude;
    private String nodeType;
    private List<String> collectedByUser;
}
