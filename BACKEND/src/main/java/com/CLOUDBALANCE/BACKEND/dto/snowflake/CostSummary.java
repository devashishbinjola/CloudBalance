package com.CLOUDBALANCE.BACKEND.dto.snowflake;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CostSummary {
    // The value for whatever we're grouping by (generic approach)
    private String name;

    // Total cost for the period
    private BigDecimal total;

    // Cost for the period (formatted as "startDate to endDate")
    private String period;
}
