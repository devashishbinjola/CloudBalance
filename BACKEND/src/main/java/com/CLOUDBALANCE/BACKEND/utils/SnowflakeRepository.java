package com.CLOUDBALANCE.BACKEND.utils;

import com.CLOUDBALANCE.BACKEND.dto.snowflake.CostSummary;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
public class SnowflakeRepository {

    private final JdbcTemplate snowflakeJdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final SqlQueryGenerator sqlQueryGenerator;
    private final Map<String, String> columnMapping;

    public SnowflakeRepository(@Qualifier("snowflakeJdbcTemplate") JdbcTemplate snowflakeJdbcTemplate) {
        this.snowflakeJdbcTemplate = snowflakeJdbcTemplate;
        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(snowflakeJdbcTemplate);
        this.columnMapping = initColumnMapping();
        this.sqlQueryGenerator = new SqlQueryGenerator(this.columnMapping);
    }

    public List<Map<String, Object>> getData() {
        String sql = "SELECT * FROM cost_explorer LIMIT 1000";
        log.info("Executing getData query: {}", sql);
        return snowflakeJdbcTemplate.queryForList(sql);
    }

    private Map<String, String> initColumnMapping() {
        Map<String, String> map = new HashMap<>();
        map.put("Service", "PRODUCT_PRODUCTNAME");
        map.put("Instance Type", "MYCLOUD_INSTANCETYPE");
        map.put("Account Id", "LINKEDACCOUNTID");
        map.put("Usage Type", "MYCLOUD_COST_EXPLORER_USAGE_GROUP_TYPE");
        map.put("Platform", "MYCLOUD_OPERATINGSYSTEM");
        map.put("Region", "MYCLOUD_REGIONNAME");
        map.put("Usage Type Group", "LINEITEM_USAGETYPE");
        map.put("Charge Type", "CHARGE_TYPE");
        map.put("Operation Type", "LINEITEM_OPERATION");
        map.put("Purchase Option", "MYCLOUD_PRICINGTYPE");
        map.put("Database Engine", "PRODUCT_DATABASEENGINE");
        map.put("Availability Zone", "AVAILABILITYZONE");
        map.put("Tenancy", "TENANCY");
        map.put("API Operation", "LINEITEM_OPERATION");
        return map;
    }

    public List<CostSummary> getGroupedCostsWithFilters(Long accountId, String groupBy,
                                                        LocalDate startDate, LocalDate endDate,
                                                        Map<String, List<String>> filters) {

        if (startDate == null || endDate == null) {
            LocalDate now = LocalDate.now();
            endDate = now;
            startDate = now.minusMonths(1);
        }

        String periodStr = startDate.format(DateTimeFormatter.ofPattern("dd-MM-yyyy")) +
                " to " + endDate.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        String sql = sqlQueryGenerator.generateGroupedCostQuery(groupBy, filters);
        var params = sqlQueryGenerator.generateParameters(accountId, startDate, endDate, filters);

        log.debug("Executing grouped cost query");
        log.debug("With parameters ");

        return namedParameterJdbcTemplate.query(sql, params, (rs, rowNum) -> {
            CostSummary summary = new CostSummary();
            summary.setName(rs.getString("GROUP_KEY"));
            summary.setTotal(rs.getBigDecimal("TOTAL_USAGE"));
            summary.setPeriod(periodStr);
            return summary;
        });
    }

    public List<String> getDistinctValues(Long accountId, String columnName) {
        String sql = sqlQueryGenerator.generateDistinctValuesQuery(columnName);
        var params = new org.springframework.jdbc.core.namedparam.MapSqlParameterSource();
        params.addValue("accountId", accountId.toString());

        return namedParameterJdbcTemplate.query(sql, params, (rs, rowNum) ->
                rs.getString("DISTINCT_VALUE")
        );
    }

    public Map<String, String> getColumnMapping() {
        return Collections.unmodifiableMap(columnMapping);
    }
}
