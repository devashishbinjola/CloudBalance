package com.CLOUDBALANCE.BACKEND.dto.snowflake;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterResponse {
    // The column name queried
    private String columnName;

    // List of distinct values found in that column
    private List<String> values;
}
