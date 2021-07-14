package de.cathesso.scratchamap.service;

import de.cathesso.scratchamap.model.Node;
import de.cathesso.scratchamap.repos.NodeRepo;
import de.cathesso.scratchamap.repos.WayRepo;
import de.cathesso.scratchamap.utils.IdUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class MapDataServiceTest {

    private final OverpassApiService apiService = mock(OverpassApiService.class);
    private final NodeRepo nodeRepo = mock(NodeRepo.class);
    private final WayRepo wayRepo = mock(WayRepo.class);
    private final IdUtils idUtils = mock(IdUtils.class);

    private final MapDataService mapDataService = new MapDataService(apiService,nodeRepo,wayRepo,idUtils);

    @Test
    @DisplayName("Saving an uncollected node should save the node and add the current user")
    public void savingUncollectedNodeShouldSaveNodeAndAddUser() { //Principal principal, List<Node> collectedNodes
        //Given
        String username = "UserWhoCollectedThisNode";
        List<Node> nodesToSave = List.of(
                Node.builder()
                        .id("12345")
                        .latitude(1)
                        .longitude(1)
                        .nodeType("testNode")
                        .collectedByUser(Collections.emptyList())
                        .build()
        );
        //When
        mapDataService.saveCollectedNodes(username, nodesToSave);
        //Then
        verify(nodeRepo).save(
                Node.builder()
                        .id("12345")
                        .latitude(1)
                        .longitude(1)
                        .nodeType("testNode")
                        .collectedByUser(List.of("UserWhoCollectedThisNode"))
                        .build()
        );
    }

    @Test
    @DisplayName("Saving a collected node should get the node from the DB and add the current user")
    public void savingCollectedNodeShouldSaveNodeAndAddUsertoUsers() { //Principal principal, List<Node> collectedNodes
        //Given
        String username = "UserWhoCollectedThisNode";
        List<Node> nodesToSave = List.of(
                Node.builder()
                        .id("12345")
                        .latitude(1)
                        .longitude(1)
                        .nodeType("testNode")
                        .collectedByUser(Collections.emptyList())
                        .build()
        );
        when(nodeRepo.findById("12345")).thenReturn(Optional.of(Node.builder()
                .id("12345")
                .latitude(1)
                .longitude(1)
                .nodeType("testNode")
                .collectedByUser(new ArrayList<>(List.of("UserWhoPreviouslyCollectedThisNode")))
                .build()));
        //When
        mapDataService.saveCollectedNodes(username, nodesToSave);
        //Then
        verify(nodeRepo).save(
                Node.builder()
                        .id("12345")
                        .latitude(1)
                        .longitude(1)
                        .nodeType("testNode")
                        .collectedByUser(List.of("UserWhoPreviouslyCollectedThisNode", "UserWhoCollectedThisNode"))
                        .build()
        );
    }
}