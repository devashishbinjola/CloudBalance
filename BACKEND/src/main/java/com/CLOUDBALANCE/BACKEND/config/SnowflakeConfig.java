package com.CLOUDBALANCE.BACKEND.config;


import org.springframework.beans.factory.annotation.Qualifier;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class SnowflakeConfig {
    @Value("${spring.snowflake.url}")
    private String url;

    @Value("${spring.snowflake.username}")
    private String username;

    @Value("${spring.snowflake.password}")
    private String password;

    @Value("${spring.snowflake.driver-class-name}")
    private String driverClassName;

    @Bean(name = "snowflakeDataSource")
    public DataSource snowflakeDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName(driverClassName);
        return dataSource;
    }

    @Bean(name = "snowflakeJdbcTemplate")
    public JdbcTemplate snowflakeJdbcTemplate(
            @Qualifier("snowflakeDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

}