package com.CLOUDBALANCE.BACKEND.service;

import com.CLOUDBALANCE.BACKEND.dto.snowflake.*;
import java.util.List;
import java.util.Map;

import java.util.Map;

public interface CostExplorerService {
    public List<Map<String, Object>> getData();

    CostResponse getGroupedCosts(Long accountId, CostRequest request);

    FilterResponse getDistinctValues(Long accountId, FilterRequest request);

    Map<String, String> getColumnMappings();
}

