package com.CLOUDBALANCE.BACKEND.dto.snowflake;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CostResponse {
    // The field name we're grouping by (e.g., "Service", "Instance Type", etc.)
    private String groupByField;

    // List of cost summaries grouped by the specified field
    private List<CostSummary> data;

    // Date range used for the query (formatted)
    private String dateRange;

    // Filters that were applied to the data
}
