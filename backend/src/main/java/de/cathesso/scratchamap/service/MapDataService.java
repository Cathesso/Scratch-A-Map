package de.cathesso.scratchamap.service;

import de.cathesso.scratchamap.model.Node;
import de.cathesso.scratchamap.model.Way;
import de.cathesso.scratchamap.model.api.OverpassApiElement;
import de.cathesso.scratchamap.repos.NodeRepo;
import de.cathesso.scratchamap.repos.WayRepo;
import de.cathesso.scratchamap.utils.IdUtils;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MapDataService {
    private final OverpassApiService apiService;
    private final NodeRepo nodeRepo;
    private final WayRepo wayRepo;
    private final IdUtils idUtils;

    @Autowired
    public MapDataService(OverpassApiService apiService, NodeRepo nodeRepo, WayRepo wayRepo, IdUtils idUtils){
        this.apiService = apiService;
        this.nodeRepo = nodeRepo;
        this.wayRepo = wayRepo;
        this.idUtils = idUtils;
    }

    public List<Node> getNodes(String username, String sWLat, String sWLon, String nELat, String nELon){
        List<OverpassApiElement> mapElements = apiService.getMapElements(sWLat, sWLon, nELat, nELon);
        List<Node> allNodesFromOverpass = apiService.getMapNodes(mapElements);
        List<Way> nodelessWaysFromOverpass = apiService.getMapWays(mapElements).stream()
                .filter(element -> (element.getNodes().size() == 2))
                .collect(Collectors.toList());

        List<Way> nodelessWaysThatHaveAlreadyBeenProcessed = nodelessWaysFromOverpass.stream()
                .filter(element ->(wayRepo.existsById(element.getId())))
                .collect(Collectors.toList());

        List<Way> nodelessWaysThatHaveNotBeenProcessed = nodelessWaysFromOverpass.stream()
                .filter(element ->(!wayRepo.existsById(element.getId())))
                .collect(Collectors.toList());

        List<Node> alreadySelfCreatedNodes = new ArrayList<>();
        nodelessWaysThatHaveAlreadyBeenProcessed.forEach(way -> {wayRepo.findById(way.getId()).ifPresent((repoWay) -> {repoWay.getNodes().forEach(node -> {nodeRepo.findById(node).ifPresent(alreadySelfCreatedNodes::add);});});});

        nodelessWaysThatHaveNotBeenProcessed.forEach(wayRepo::save);
        List<Node> selfCreatedNodesForWaysWithoutNodes = createNodesForWaysWithoutNodes(nodelessWaysThatHaveNotBeenProcessed, allNodesFromOverpass);
        List<Node> allNodesWithinBoundary = new ArrayList<>();
        List<Node> uncollectedNodes = new ArrayList<>();
        allNodesWithinBoundary.addAll(selfCreatedNodesForWaysWithoutNodes);
        allNodesWithinBoundary.addAll(alreadySelfCreatedNodes);
        allNodesWithinBoundary.addAll(allNodesFromOverpass);
        allNodesWithinBoundary.stream().forEach(node -> {
            Optional<Node> nodeInRepository = nodeRepo.findById(node.getId());
            nodeInRepository.ifPresentOrElse(
                    nodeInRepo -> {
                        if(!(nodeInRepo.getCollectedByUser().contains(username))){uncollectedNodes.add(node);}
                        }, ()->{uncollectedNodes.add(node);});
        });

        return uncollectedNodes;
    }

    public void saveCollectedNodes(String username, List<Node> collectedNodes) {
        collectedNodes.forEach(node -> {
                    Optional<Node> dBMarker = nodeRepo.findById(node.getId());
                    dBMarker.ifPresentOrElse((savedMarker) -> {
                        List<String> collectedByUsers = savedMarker.getCollectedByUser();
                        collectedByUsers.add(username);
                        savedMarker.setCollectedByUser(collectedByUsers);
                        nodeRepo.save(savedMarker);
                        }, () -> {node.setCollectedByUser(List.of(username));
                    nodeRepo.save(node);});
                    });
    }

    public List<Node> createNodesForWaysWithoutNodes(List<Way> nodelessWays, List<Node> allNodes){
        List<Node> selfCreatedNodes = new ArrayList<>();
        List<Way> wayToRepository = new ArrayList<>();
        nodelessWays.stream().forEach(way -> {
            List<String> createdNodesForWay = new ArrayList<>();
            Way wayFromRepository = wayRepo.findById(way.getId()).orElse(null);
            String firstNodeID = way.getNodes().get(0);
            String secondNodeID = way.getNodes().get(1);
            Node firstNode = allNodes.stream().filter((elements) -> elements.getId().equals(firstNodeID)).findFirst().orElse(null);
            Node secondNode = allNodes.stream().filter((elements) -> elements.getId().equals(secondNodeID)).findFirst().orElse(null);
            double firstNodeLat = firstNode.getLatitude();
            double firstNodeLon = firstNode.getLongitude();
            double secondNodeLat = secondNode.getLatitude();
            double secondNodeLon = secondNode.getLongitude();
            double wayLength = distanceBetweenPoints(firstNodeLat, firstNodeLon, secondNodeLat, secondNodeLon);
            if(wayLength <= 50){
                double lat = (firstNodeLat + secondNodeLat) / 2;
                double lon = (firstNodeLon + secondNodeLon) / 2;
                String nodeID = way.getId() +"_"+ idUtils.generateUuid();
                selfCreatedNodes.add(new Node (nodeID, lat, lon, "scratchAMapNode", new ArrayList<>()));
                createdNodesForWay.add(nodeID);
            }
            else{
                int numberOfNodesToCreate = (int) (wayLength / 20);
                double latLength = firstNodeLat - secondNodeLat;
                double lonLength = firstNodeLon - secondNodeLon;
                double latPartLength = latLength / numberOfNodesToCreate;
                double lonPartLength = lonLength / numberOfNodesToCreate;
                for(int i = 1; i <= numberOfNodesToCreate; i++){
                    double lat = firstNodeLat + (i * latPartLength);
                    double lon = firstNodeLon + (i * lonPartLength);
                    String nodeID = way.getId() + idUtils.generateUuid();
                    selfCreatedNodes.add(new Node (nodeID, lat, lon, "scratchAMapNode", new ArrayList<>()));
                    createdNodesForWay.add(nodeID);
                }
            }
            wayFromRepository.setNodes(createdNodesForWay);
            wayToRepository.add(wayFromRepository);
        });
        wayToRepository.forEach(wayRepo::save);
        selfCreatedNodes.forEach(nodeRepo::save);
        return selfCreatedNodes;
    }

    public double distanceBetweenPoints(double lat1, double lon1, double lat2, double lon2){
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            double radlat1 = Math.PI * lat1/180;
            double radlat2 = Math.PI * lat2/180;
            double theta = lon1-lon2;
            double radtheta = Math.PI * theta/180;
            double dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;//kilometres
            dist = dist * 1000;//metres
            return dist;
        }
    }

}
