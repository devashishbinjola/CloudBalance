package com.CLOUDBALANCE.BACKEND.controller;

import com.CLOUDBALANCE.BACKEND.dto.APIResponse;
import com.CLOUDBALANCE.BACKEND.dto.snowflake.CostRequest;
import com.CLOUDBALANCE.BACKEND.dto.snowflake.CostResponse;
import com.CLOUDBALANCE.BACKEND.dto.snowflake.FilterRequest;
import com.CLOUDBALANCE.BACKEND.dto.snowflake.FilterResponse;
import com.CLOUDBALANCE.BACKEND.service.CostExplorerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:5173")
public class CostExplorerController {

    @Autowired
    private CostExplorerService costExplorerService;

    public CostExplorerController(CostExplorerService costExplorerService) {
        this.costExplorerService = costExplorerService;
    }
    @GetMapping("/test")
    public ResponseEntity<APIResponse<?>> getData(){
        return ResponseEntity.ok(new APIResponse<>(200, "Success", costExplorerService.getData()));
    }

    @GetMapping("/group")
    public ResponseEntity<Map<String, Object>> getGroupByColumns() {
        Map<String, String> columnMappings = costExplorerService.getColumnMappings();
        Map<String, Object> response = new HashMap<>();
        response.put("GroupBy", columnMappings.keySet());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/costs/{accountId}")
    public ResponseEntity<CostResponse> getGroupedCosts(
            @PathVariable Long accountId,
            @RequestBody CostRequest request) {
        CostResponse response = costExplorerService.getGroupedCosts(accountId, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/costs/{accountId}/filter")
    public ResponseEntity<FilterResponse> getDistinctValues(
            @PathVariable Long accountId,
            @RequestBody FilterRequest request) {
        FilterResponse response = costExplorerService.getDistinctValues(accountId, request);
        return ResponseEntity.ok(response);
    }
}
