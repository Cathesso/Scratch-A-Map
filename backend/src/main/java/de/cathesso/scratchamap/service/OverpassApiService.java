package de.cathesso.scratchamap.service;

import de.cathesso.scratchamap.dto.GetMapElementsDTO;
import de.cathesso.scratchamap.model.Node;
import de.cathesso.scratchamap.model.api.OverpassApiElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OverpassApiService {
    private final String overpassApi = "https://overpass-api.de/api/interpreter?data=";
    private final RestTemplate restTemplate;

    @Autowired
    public OverpassApiService(RestTemplate restTemplate) {this.restTemplate = restTemplate;}

    public List<OverpassApiElement> getMapElements(String sWLat, String sWLon, String nELat, String nELon) {

        String requestString = overpassApi + "[out:json][timeout:25];(way[\"highway\"][\"highway\"!=\"motorway\"][\"highway\"!=\"motorway_link\"][\"highway\"!=\"primary\"][\"highway\"!=\"service\"][\"foot\"!=\"no\"][\"access\"!=\"private\"][\"access\"!=\"no\"](" + sWLat + "," + sWLon + "," + nELat + "," + nELon + ");>;);out qt;";
        ResponseEntity<GetMapElementsDTO> response = restTemplate.getForEntity(requestString, GetMapElementsDTO.class);
        if (response.getBody() != null) {
            return response.getBody().getElements();
        }
        return List.of();
    }

    private Node mapOverpassNodesToMarkerModel(OverpassApiElement overpassApiElement){
        return Node.builder()
                .id(overpassApiElement.getId())
                .latitude(overpassApiElement.getLat())
                .longitude(overpassApiElement.getLon())
                .build();
    }

    public List<Node> getMapNodes(String sWLat, String sWLon, String nELat, String nELon){
        return getMapElements(sWLat, sWLon, nELat, nELon).stream().filter(element -> element.getType().equals("node")).map(this::mapOverpassNodesToMarkerModel).collect(Collectors.toList());
    }
}
