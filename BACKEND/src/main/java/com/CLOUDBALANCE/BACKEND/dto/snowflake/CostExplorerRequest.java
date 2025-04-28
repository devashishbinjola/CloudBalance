package com.CLOUDBALANCE.BACKEND.dto.snowflake;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
public class CostExplorerRequest {
    @NotNull(message = "Group by field must not be null")
    private String groupBy;
    private Map<String, List<String>> filters;

    private LocalDate startDate;
    private LocalDate endDate;
}
