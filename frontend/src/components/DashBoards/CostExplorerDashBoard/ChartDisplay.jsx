import React, { useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import { BarChart, LineChart } from "lucide-react";
import "../CostExplorerDashBoard/css/ChartDisplay.css";

// Resolve chart dependencies
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

// Helper function to extract month-year from period
const parsePeriod = (period) => {
  if (!period) return "";
  const [startDate] = period.split(" to ");
  const [day, month, year] = startDate.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleString("default", { month: "short", year: "numeric" }); // e.g., "Apr 2025"
};

const ChartDisplay = ({ data, loading, groupBy }) => {
  const [chartType, setChartType] = useState("column");

  // Process data: Get top 5 services and aggregate others
  const months = [...new Set(data.map((item) => parsePeriod(item.period)))].sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Aggregate totals by service across all months to determine top 5
  const serviceTotals = data.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + item.total;
    return acc;
  }, {});

  // Sort services by total and select top 5
  const sortedServices = Object.entries(serviceTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name]) => name);

  // Prepare categories: Top 5 services + "Others"
  const categories = [
    {
      category: months.map((month) => ({
        label: month,
      })),
    },
  ];
  
  // Dataset: One series per service
  const allServices = [...new Set(data.map((item) => item.name))];
  
  const dataset = [...sortedServices, "Others"].map((serviceName, index) => {
    const seriesData = months.map((month) => {
      if (serviceName === "Others") {
        // Sum totals of non-top services for this month
        const totalOthers = data
          .filter(
            (d) =>
              !sortedServices.includes(d.name) &&
              parsePeriod(d.period) === month
          )
          .reduce((sum, item) => sum + item.total, 0);
        return { value: totalOthers };
      } else {
        const item = data.find(
          (d) => d.name === serviceName && parsePeriod(d.period) === month
        );
        return { value: item ? item.total : 0 };
      }
    });
  
    // Define color palette
    const paletteColors = ["#0088FE", "#55C5B5", "#FFD166", "#FF9064", "#7A77FF", "#FF6B6B"];
  
    return chartType === "line"
      ? {
          seriesname: serviceName,
          data: seriesData,
          color: paletteColors[index % paletteColors.length],
          anchorBgColor: paletteColors[index % paletteColors.length],
          anchorBorderColor: paletteColors[index % paletteColors.length],
          anchorRadius: "5",
          anchorBorderThickness: "1",
          anchorAlpha: "100",
          anchorBgAlpha: "100",
          drawAnchors: "1",
        }
      : {
          seriesname: serviceName,
          data: seriesData,
          color: paletteColors[index % paletteColors.length],
        };
  });
  
  // Chart data source
  const chartDataSource = {
    chart: {
      caption: `${groupBy} Cost Analysis (Month-wise)`,
      subCaption: months.length > 0 ? `${months[0]} to ${months[months.length - 1]}` : "",
      xAxisName: groupBy,
      yAxisName: "Cost ($)",
      theme: "fusion",
      showValues: "0",
      showSum: "0",
      formatNumberScale: "1",
      defaultNumberScale: "K",
      numberScaleUnit: "K,M,B",
      numberScaleValue: "1000,1000,1000",
      paletteColors: "#0088FE,#55C5B5,#FFD166,#FF9064,#7A77FF,#FF6B6B",
      showPlotBorder: chartType === "column" ? "0" : undefined,
      plotSpacePercent: chartType === "column" && months.length > 6 ? "60" : "40",
      showLabels: "1",
      showYAxisValues: "1",
      usePlotGradientColor: "0",
      divLineColor: "#CCCCCC",
      divLineAlpha: chartType === "column" ? "40" : "30",
      divLineThickness: "1",
      valueFontSize: "11",
      showLegend: "1",
      legendPosition: "bottom",
      legendIconScale: "1.2",
      legendNumColumns: "0",
      legendItemFontSize: "12",
      legendItemFontColor: "#666666",
      legendBorderAlpha: "0",
      legendShadow: "0",
      legendCaptionAlignment: "center",
      drawCrossLine: "1",
      crossLineColor: "#CCCCCC",
      crossLineAlpha: "40",
      showHoverEffect: "1",
      plotBorderAlpha: "0",
      exportEnabled: "1",
      exportFileName: "MonthlyCosts",
      exportMode: "client",
      showCanvasBorder: "1",
      canvasBgColor: "#ffffff",
      chartLeftMargin: "40",
      chartRightMargin: "40",
      chartBottomMargin: "80",
      chartTopMargin: "40",
      labelDisplay: "auto",
      rotateValues: "0",
      placeValuesInside: "0",
      showToolTip: "1",
      toolTipBorderColor: "#666666",
      toolTipBgColor: "#ffffff",
      toolTipBgAlpha: "80",
      // Line chart specific settings
      lineThickness: chartType === "line" ? "3" : undefined,
      drawAnchors: chartType === "line" ? "1" : undefined,
      showShadow: chartType === "line" ? "0" : undefined,
      canvasBorderAlpha: chartType === "line" ? "30" : undefined,
      canvasBorderColor: chartType === "line" ? "#cccccc" : undefined,
      canvasBgAlpha: chartType === "line" ? "100" : undefined,
      lineAlpha: chartType === "line" ? "85" : undefined,
      legendBgColor: chartType === "line" ? "#ffffff" : undefined,
      legendBorderColor: chartType === "line" ? "#eeeeee" : undefined,
      legendItemSpacing: chartType === "line" ? "10" : undefined,
      legendPadding: chartType === "line" ? "10" : undefined,
      alignLegendWithCanvas: chartType === "line" ? "0" : undefined,
    },
    categories,
    dataset,
  };

  // Chart configuration
  const chartConfig = {
    type: chartType === "column" ? "mscolumn2d" : "msline",
    width: "100%",
    height: "600", // Match BarChart/LineChart
    dataFormat: "json",
    dataSource: chartDataSource,
  };

  return (
    <div className="chart-container">
      <div className="chart-toggle">
        <button
          className={`toggle-button ${chartType === "column" ? "active" : ""}`}
          onClick={() => setChartType("column")}
        >
          <BarChart size={20} />
          Bar Chart
        </button>
        <button
          className={`toggle-button ${chartType === "line" ? "active" : ""}`}
          onClick={() => setChartType("line")}
        >
          <LineChart size={20} />
          Line Chart
        </button>
      </div>
      {loading ? (
        <div className="loading">Loading chart data...</div>
      ) : data.length > 0 ? (
        <ReactFC {...chartConfig} />
      ) : (
        <div className="no-data">No data available for the selected criteria</div>
      )}
    </div>
  );
};

export default ChartDisplay;