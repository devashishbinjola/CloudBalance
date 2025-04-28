package com.CLOUDBALANCE.BACKEND.dto.snowflake;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class CostRequest {

    // Group By field - what column to group by
    private String groupBy;

    // Date range
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate startDate;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate endDate;

    // Multi-column filters - Map of column name to list of values to include
    private Map<String, List<String>> filters = new HashMap<>();

}
