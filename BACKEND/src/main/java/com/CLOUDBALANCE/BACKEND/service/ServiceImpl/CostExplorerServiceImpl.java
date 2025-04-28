package com.CLOUDBALANCE.BACKEND.service.ServiceImpl;
//
//import com.CLOUDBALANCE.BACKEND.dto.snowflake.CostExplorerRequest;
//import com.CLOUDBALANCE.BACKEND.utils.SnowflakeRepository;
//import com.CLOUDBALANCE.BACKEND.utils.SqlQueryGenerator;
//import jakarta.validation.Valid;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//@AllArgsConstructor
//public class CostExplorerServiceImpl {
//
//    private final SnowflakeRepository snowflakeRepository;
//

//
//}
//package com.example.cloudbalance.service.costexplorer;

//import com.CLOUDBALANCE.BACKEND.dto.CostRequest;
//import com.CLOUDBALANCE.BACKEND.dto.CostResponse;
//import com.CLOUDBALANCE.BACKEND.dto.CostSummary;
//import com.CLOUDBALANCE.BACKEND.dto.FilterRequest;
//import com.CLOUDBALANCE.BACKEND.dto.FilterResponse;
//import com.CLOUDBALANCE.BACKEND.snowflakerepository.CostRepository;
import com.CLOUDBALANCE.BACKEND.dto.snowflake.*;
import com.CLOUDBALANCE.BACKEND.service.CostExplorerService;
import com.CLOUDBALANCE.BACKEND.utils.SnowflakeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CostExplorerServiceImpl implements CostExplorerService {

    private final SnowflakeRepository snowflakeRepository;

    public CostExplorerServiceImpl(SnowflakeRepository snowflakeRepository) {
        this.snowflakeRepository = snowflakeRepository;
    }

    public List<Map<String, Object>> getData() {
        return snowflakeRepository.getData();
    }



    @Override
    public CostResponse getGroupedCosts(Long accountId, CostRequest request) {

        String groupBy = request.getGroupBy();
        if (groupBy == null || groupBy.trim().isEmpty()) {
            groupBy = "Service";
        }

        LocalDate startDate = request.getStartDate();
        LocalDate endDate = request.getEndDate();
        if (startDate == null || endDate == null) {
            LocalDate now = LocalDate.now();
            endDate = now;
            startDate = now.minusMonths(1);
        }

        String dateRange = startDate.format(DateTimeFormatter.ofPattern("dd-MM-yyyy")) +
                " to " +
                endDate.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        Map<String, List<String>> validatedFilters = new HashMap<>();
        if (request.getFilters() != null) {
            Map<String, String> columnMappings = snowflakeRepository.getColumnMapping();

            request.getFilters().forEach((key, values) -> {
                if (columnMappings.containsKey(key) && values != null && !values.isEmpty()) {
                    validatedFilters.put(key, values);
                } else {
                    log.warn("Ignoring invalid filter: {} with values: {}", key, values);
                }
            });
        }

        List<CostSummary> summaries;
        try {
            summaries = snowflakeRepository.getGroupedCostsWithFilters(
                    accountId, groupBy, startDate, endDate, validatedFilters);
            log.info("Query returned {} results", summaries.size());
        } catch (Exception e) {
            log.error("Error retrieving cost data: {}", e.getMessage(), e);
            summaries = List.of();
        }

        CostResponse response = new CostResponse();
        response.setGroupByField(groupBy);
        response.setData(summaries);
        response.setDateRange(dateRange);

        return response;
    }

    @Override
    public FilterResponse getDistinctValues(Long accountId, FilterRequest request) {
        log.info("Getting distinct values for column {} in account {}", request.getColumnName(), accountId);

        String columnName = request.getColumnName();
        if (columnName == null || columnName.trim().isEmpty()) {
            columnName = "Service";
        }

        if (!snowflakeRepository.getColumnMapping().containsKey(columnName)) {
            log.warn("Invalid column name requested: {}", columnName);
            return new FilterResponse(columnName, List.of());
        }

        List<String> values = snowflakeRepository.getDistinctValues(accountId, columnName);

        FilterResponse response = new FilterResponse();
        response.setColumnName(columnName);
        response.setValues(values);

        return response;
    }

    @Override
    public Map<String, String> getColumnMappings() {
        log.info("Getting all column mappings for grouping");
        return snowflakeRepository.getColumnMapping();
    }
}

