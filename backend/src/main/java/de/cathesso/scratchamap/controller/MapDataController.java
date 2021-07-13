package de.cathesso.scratchamap.controller;

import de.cathesso.scratchamap.dto.NodesDTO;
import de.cathesso.scratchamap.model.Node;
import de.cathesso.scratchamap.service.MapDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/mapData")
public class MapDataController {

    private final MapDataService mapDataService;

    @Autowired
    public MapDataController(MapDataService mapDataService){this.mapDataService = mapDataService;}

    @GetMapping("getNodes")
    public List<Node> getNodes(Principal principal, @RequestParam String sWLat, String sWLon, String nELat, String nELon){
        String username = principal.getName();
        return mapDataService.getNodes(username, sWLat,sWLon,nELat,nELon);
    }

    @PostMapping("saveNodes")
    public void saveCollectedNodes(Principal principal, @RequestBody NodesDTO collectedNodes) {
        String username = principal.getName();
        mapDataService.saveCollectedNodes(username, collectedNodes.getCollectedNodes());
    }

}
