package com.CLOUDBALANCE.BACKEND.utils;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;


public class SqlQueryGenerator {

    private final Map<String, String> columnMapping;

    public SqlQueryGenerator(Map<String, String> columnMapping) {
        this.columnMapping = columnMapping;
    }

    public String generateGroupedCostQuery(String groupBy, Map<String, List<String>> filters) {
        String dbColumnName = columnMapping.getOrDefault(groupBy, "PRODUCT_PRODUCTNAME");

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT p.").append(dbColumnName).append(" as GROUP_KEY, ");
        sql.append("SUM(p.LINEITEM_USAGEAMOUNT) as TOTAL_USAGE ");
        sql.append("FROM \"AWS\".\"COST\".\"COST_EXPLORER\" p ");
        sql.append("WHERE p.LINKEDACCOUNTID = :accountId ");
        sql.append("AND p.USAGESTARTDATE BETWEEN :startDate AND :endDate ");

        if (filters != null && !filters.isEmpty()) {
            for (Map.Entry<String, List<String>> entry : filters.entrySet()) {
                String columnKey = entry.getKey();
                List<String> values = entry.getValue();

                if (values != null && !values.isEmpty() && columnMapping.containsKey(columnKey)) {
                    String filterDbColumnName = columnMapping.get(columnKey);
                    sql.append("AND (");

                    for (int i = 0; i < values.size(); i++) {
                        if (i > 0) {
                            sql.append(" OR ");
                        }
                        sql.append("UPPER(p.").append(filterDbColumnName)
                                .append(") = UPPER(:").append(columnKey.replaceAll("\\s+", "_")).append("_").append(i).append(")");
                    }
                    sql.append(") ");
                }
            }
        }

        sql.append("GROUP BY p.").append(dbColumnName).append(" ");
        sql.append("HAVING TOTAL_USAGE > 0 ");
        sql.append("ORDER BY TOTAL_USAGE DESC");

        return sql.toString();
    }

    public String generateDistinctValuesQuery(String columnName) {
        String dbColumnName = columnMapping.getOrDefault(columnName, "PRODUCT_PRODUCTNAME");

        return "SELECT DISTINCT p." + dbColumnName + " as DISTINCT_VALUE " +
                "FROM \"AWS\".\"COST\".\"COST_EXPLORER\" p " +
                "WHERE p.LINKEDACCOUNTID = :accountId " +
                "AND p." + dbColumnName + " IS NOT NULL " +
                "ORDER BY p." + dbColumnName;
    }

    public MapSqlParameterSource generateParameters(Long accountId, LocalDate startDate, LocalDate endDate, Map<String, List<String>> filters) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("accountId", accountId.toString());
        params.addValue("startDate", Timestamp.valueOf(startDate.atStartOfDay()));
        params.addValue("endDate", Timestamp.valueOf(endDate.plusDays(1).atStartOfDay()));

        if (filters != null && !filters.isEmpty()) {
            for (Map.Entry<String, List<String>> entry : filters.entrySet()) {
                String columnKey = entry.getKey();
                List<String> values = entry.getValue();

                if (values != null && !values.isEmpty() && columnMapping.containsKey(columnKey)) {
                    String paramPrefix = columnKey.replaceAll("\\s+", "_");
                    for (int i = 0; i < values.size(); i++) {
                        params.addValue(paramPrefix + "_" + i, values.get(i));
                    }
                }
            }
        }

        return params;
    }


}
