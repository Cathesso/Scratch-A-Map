package de.cathesso.scratchamap.service;

import de.cathesso.scratchamap.model.Marker;
import de.cathesso.scratchamap.model.api.OverpassApiElement;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class MapDataService {

    private final OverpassApiService apiService;

    @Autowired
    public MapDataService(OverpassApiService apiService){this.apiService = apiService;}

    public List<OverpassApiElement> getMapElements(String sWLat, String sWLon, String nELat, String nELon){
        return apiService.getMapElements(sWLat, sWLon, nELat, nELon);
    }

    public List<Marker> getMarkers(String sWLat, String sWLon, String nELat, String nELon){
        //Explanation: Nodes are all points from Overpass. Markers are all points that are to be shown (Overpass + future own generated points).
        return apiService.getMapNodes(sWLat, sWLon, nELat, nELon);
    }

}
