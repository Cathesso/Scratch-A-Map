package de.cathesso.scratchamap.controller;

import de.cathesso.scratchamap.model.Marker;
import de.cathesso.scratchamap.model.api.OverpassApiElement;
import de.cathesso.scratchamap.service.MapDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/mapdata")
public class MapDataController {

    private final MapDataService mapDataService;

    @Autowired
    public MapDataController(MapDataService mapDataService){this.mapDataService = mapDataService;}

    @GetMapping("getmarkers")
    public List<Marker> getMarkers(@RequestParam String sWLat, String sWLon, String nELat, String nELon){
        System.out.println("DINGDINGDING");
        return mapDataService.getMarkers(sWLat,sWLon,nELat,nELon);
    }

}
