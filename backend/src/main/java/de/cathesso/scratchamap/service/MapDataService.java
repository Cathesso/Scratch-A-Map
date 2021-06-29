package de.cathesso.scratchamap.service;

import de.cathesso.scratchamap.model.Marker;
import de.cathesso.scratchamap.model.api.OverpassApiElement;
import de.cathesso.scratchamap.security.repository.AppUserRepo;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class MapDataService {

    private final OverpassApiService apiService;
    private final AppUserRepo appUserRepo;
    //private final ;

    @Autowired
    public MapDataService(OverpassApiService apiService, AppUserRepo appUserRepo){
        this.apiService = apiService;
        this.appUserRepo = appUserRepo;
    }

    public List<OverpassApiElement> getMapElements(String sWLat, String sWLon, String nELat, String nELon){
        return apiService.getMapElements(sWLat, sWLon, nELat, nELon);
    }

    public List<Marker> getMarkers(String sWLat, String sWLon, String nELat, String nELon){
        //Explanation: Nodes are all points from Overpass. Markers are all points that are to be shown (Overpass + future own generated points).
        //private List<Marker> userMarkers = userRepo.existsById(user.username);
        return apiService.getMapNodes(sWLat, sWLon, nELat, nELon);
    }

}
