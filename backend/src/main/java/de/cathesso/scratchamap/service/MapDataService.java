package de.cathesso.scratchamap.service;

import de.cathesso.scratchamap.model.Node;
import de.cathesso.scratchamap.repos.MapDataRepo;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MapDataService {

    private final OverpassApiService apiService;
    private final MapDataRepo mapDataRepo;

    @Autowired
    public MapDataService(OverpassApiService apiService, MapDataRepo mapDataRepo){
        this.apiService = apiService;
        this.mapDataRepo = mapDataRepo;
    }

    public List<Node> getMarkers(String sWLat, String sWLon, String nELat, String nELon){
        //Explanation: Nodes are all points from Overpass. Markers are all points that are to be shown (Overpass + future own generated points).
        //private List<Marker> userMarkers = userRepo.existsById(user.username);
        List<Node> allNodes = apiService.getMapNodes(sWLat, sWLon, nELat, nELon);
        List<Node> uncollectedNodes = new ArrayList<>();
        allNodes.forEach((apiMarker)->{
            Optional<Node> dBMarker = mapDataRepo.findById(apiMarker.getId());
            dBMarker.ifPresentOrElse((savedMarker) ->{}, () -> uncollectedNodes.add(apiMarker));
        });
        return uncollectedNodes;
    }

    public void saveMarker(Principal principal, List<Node> collectedNodes) {
        collectedNodes.forEach(marker -> {
                    Optional<Node> dBMarker = mapDataRepo.findById(marker.getId());
                    dBMarker.ifPresentOrElse((savedMarker) -> {
                        List<String> collectedByUsers = savedMarker.getCollectedByUser();
                        collectedByUsers.add(principal.getName());
                        savedMarker.setCollectedByUser(collectedByUsers);
                        mapDataRepo.save(savedMarker);
                        }, () -> {marker.setCollectedByUser(List.of(principal.getName()));
                    mapDataRepo.save(marker);});
                    });


    }
}
